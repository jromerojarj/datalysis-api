import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
  const configService = app.get(ConfigService);
  const port = configService.get<number>('API.PORT');
  app.setGlobalPrefix(configService.get<string>('API.PATH'));
  app.enableCors();
  await app.listen(port);
}
bootstrap();
