import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes
  app.useGlobalPipes(new ValidationPipe());
  const { PORT } = process.env;

  // Swagger
  const config = new DocumentBuilder().addBearerAuth()
    .setTitle('Pokemon Api')
    .setDescription('The Pokemon API description')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('User')
    .addTag('Pokemon')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
