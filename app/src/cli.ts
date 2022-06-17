import { NestFactory } from '@nestjs/core';
import { AppModule } from './Module/App/AppModule';
import { CommandModule, CommandService } from 'nestjs-command';
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit();
  }
};

(async () => {
  try {
    await bootstrap();
    NestLogger.log('Command loaded');
  } catch (error) {
    NestLogger.error(error, 'Loading error');
  }
})();
