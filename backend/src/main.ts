import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS engedélyezése minden originnek
  app.enableCors();

  // Validáció aktiválása az egész programban.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Csak azt az adatot engedjük be amit a DTO-ban várunk.
      forbidNonWhitelisted: true, // Hibát dob, ha olyan mező jön ami nem szerepel a DTO-ban
      transform: true, // Automatikusan konvertálja az adatokat a várt típusra
    }),
  );

  // Globális kivételszűrő aktiválása
  app.useGlobalFilters(new GlobalExceptionFilter());

  // SWAGGER BEÁLLÍTÁSA
  const config = new DocumentBuilder()
    .setTitle('Vehicle ERP API')
    .setDescription(
      'A Vehicle EPR rendszer backend végpontjainak dokumentációja',
    )
    .setVersion('1.0')
    .addTag('vehicles')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  // SZERVER INDÍTÁSA
  await app.listen(3000);
}
bootstrap();
