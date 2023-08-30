import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Person } from './entities/person.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PersonService {
  
  //Inyectar un modelo de Mongo
  constructor(
    @InjectModel(Person.name)
    private readonly personModel: Model<Person>
    ) {}

  async create(createPersonDto: CreatePersonDto) {
    //Usamos el modelo inyectado para crear en la base de datos

    //Para validar, usamos un try catch
    try {
      const person = await this.personModel.create(createPersonDto);
      return person;
    } catch (error) {
      this.handleExceptions(error, `Person already exists in database. ${JSON.stringify(error.keyValue)}`)
    }
  }

  findAll() {
    return `This action returns all person`;
  }

  async findOne(query: string) {
    let person: Person;

    //If query is a number, find by no
    if(!isNaN(+query)) person = await this.personModel.findOne({ no: query });

    //Find by mongo id
    if(isValidObjectId(query)) person = await this.personModel.findById(query)
    
    //Find by name
    if(!person) person = await this.personModel.findOne({ name: query.trim() });

    if(!person) throw new NotFoundException('Person not found');
    
    return person;
  }

  async update(query: string, updatePersonDto: UpdatePersonDto) {
    try {
      const person = await this.findOne(query);

      //Actualizar en Mongo con updateOne
      const updatedPerson = await person.updateOne(updatePersonDto, { new: true });
      return updatedPerson;

    } catch (error) {
      this.handleExceptions(error, `Duplicated data. Please try with different. ${JSON.stringify(error.keyValue)}`)
    }
  }

 async  remove(id: string) {
  //Eliminar una persona con el mongo id que coincida, usando deleteOne
    const { deletedCount, acknowledged } = await this.personModel.deleteOne({_id: id});
    
    if(deletedCount > 0) {
      return { message: 'Person deleted successfully', acknowledged }
    } else {
      throw new NotFoundException('Can not delete a person with that id');
    }
  }

  private handleExceptions(error: any, message: string) {
    if(error.code === 11000) throw new BadRequestException(`${message}`);
    
    console.log(error);
    throw new InternalServerErrorException('There is an internal error. Check server logs.');

  }
}
