import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { isDevelopment } from './utils/node-env';

function swagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API Document')
    .setDescription('REST API document')
    .setVersion('1.0')
    .addTag('REST')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const SERVICE_PORT = config.get<number>('SERVICE_PORT', 3000);

  if (isDevelopment()) {
    swagger(app);

    Logger.log(
      `Swagger is running on http://localhost:${SERVICE_PORT}/document`,
    );
  }

  await app.listen(SERVICE_PORT);

  Logger.log(`Server is running on http://localhost:${SERVICE_PORT}`);
}
bootstrap();
