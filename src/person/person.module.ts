import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './entities/person.entity';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
  imports: [
    //Importar el entity que funcionara como modelo de Mongo. Mandamos a usar MongdooseModule y definimos el name y schema
    MongooseModule.forFeature([
      {
        name: Person.name,
        schema: PersonSchema
      }
    ])
  ]
})
export class PersonModule {}
