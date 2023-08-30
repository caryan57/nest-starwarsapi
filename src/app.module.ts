import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PersonModule } from './person/person.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: 
  [
    //Configuracion de conexion de mongo db
    MongooseModule.forRoot('mongodb://localhost:27017/nest-starwarsdex'),
    //Importamos SerceStaticModule de la dependencia serve-static para servir contenido estatico
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public')
    }), 
    PersonModule, CommonModule
  ]
})
export class AppModule {}
