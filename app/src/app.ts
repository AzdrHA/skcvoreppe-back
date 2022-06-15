import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './Module/App/AppModule';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
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
