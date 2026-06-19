import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. SWAGGER BEÁLLÍTÁSA
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

  // CORS engedélyezése minden originnek (vagy finomhangolva)
  app.enableCors();

  // 2. SZERVER INDÍTÁSA
  await app.listen(3000);
}
bootstrap();
