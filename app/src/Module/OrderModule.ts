import { Module } from '@nestjs/common';
import { OrderController } from '@Controller/OrderController';
import { OrderService } from '@Service/Order/OrderService';
import { OrderServiceApi } from '@ServiceApi/Order/OrderServiceApi';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { OrderRepository } from '@Repository/Order/OrderRepository';
import { StripModule } from '@Module/StripModule';

@Module({
  imports: [
    StripModule,
    TypeOrmExModule.forCustomRepository([OrderRepository]),
  ],
  providers: [OrderService, OrderServiceApi],
  controllers: [OrderController],
})
export class OrderModule {}
