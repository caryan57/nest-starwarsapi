import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//Para que este entity sea un modelo de Mongo, entonces extiende de Document. Y se le agrega el decorador Schema() de @nestjs/mongoose
@Schema()
export class Person extends Document {
  //id - No se especifica porque se inserta de forma automatica en Mongo

  //Podemos agregar el decorador Prop para definir propiedades especiales, por ej. que sea un campo unico o que tenga indice para busquedas
  @Prop({
    unique: true,
    index: true
  })
  name: string;

  @Prop({
    unique: true,
    index: true
  })
  no: number; //Adicional al uuid de mongo, agregamos a cada elemento un numero unico para facilitar las busquedas
}

//Exportar el schema con SchemaFactory
export const PersonSchema = SchemaFactory.createForClass(Person);