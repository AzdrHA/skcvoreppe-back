import { Module } from '@nestjs/common';
import { AppController } from '@Controller/App/AppController';
import { AppService } from '../../Service/App/AppService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
