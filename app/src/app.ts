import 'reflect-metadata';
import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@Module/AppModule';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix(app.get(ConfigService).get('basePath'));
  app.enableCors();
  await app.listen(process.env.APP_PORT);
};

(async () => {
  try {
    await bootstrap();
    NestLogger.log('App loaded');
  } catch (error) {
    NestLogger.error(error, 'Loading error');
  }
})();
