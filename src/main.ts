import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Podemos agregar un prefijo para que los demas modulos accedan a traves de ese prefijo
  // api/person
  // api/planets
  app.setGlobalPrefix('api');
  
  //Agregar validador global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  await app.listen(3000);
}
bootstrap();
