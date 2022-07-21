import { Injectable } from '@nestjs/common';
import { StripService } from '@Service/StripService';
import { Request } from 'express';
import { OrderRepository } from '@Repository/Order/OrderRepository';

@Injectable()
export class OrderServiceApi {
  private stripService: StripService;
  private orderRepository: OrderRepository;

  constructor(stripService: StripService, orderRepository: OrderRepository) {
    this.stripService = stripService;
    this.orderRepository = orderRepository;
  }

  public createOrUpdate() {
    return { cc: 'cc' };
  }

  public async checkout(request: Request, id: number) {
    const order = await this.orderRepository.findOneBy({ id: id });
    return this.stripService.getOrder(order.extern_id);
  }

  public async complete(request: Request, id: number) {
    console.log('complete');
    console.log(id);
  }
}
