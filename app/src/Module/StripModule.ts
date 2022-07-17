import { Module } from '@nestjs/common';
import { StripConnector } from '@Connector/StripConnector';
import { StripService } from '@Service/StripService';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { ProductRepository } from '@Repository/Product/ProductRepository';
import { ConfigService } from '@nestjs/config';
import { ProductService } from '@Service/Product/ProductService';
import { ProductPriceRepository } from '@Repository/Product/ProductPriceRepository';
import { PaymentLinkRepository } from '@Repository/PaymentLink/PaymentLinkRepository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      ProductRepository,
      ProductPriceRepository,
      PaymentLinkRepository,
    ]),
  ],
  providers: [StripConnector, StripService, ConfigService, ProductService],
  exports: [StripConnector, StripService, ConfigService, ProductService],
})
export class StripModule {}
