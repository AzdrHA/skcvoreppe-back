import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Request } from 'express';
import { DefaultController } from '@Controller/DefaultController';
import { OrderServiceApi } from '@ServiceApi/Order/OrderServiceApi';

@Controller('/order')
export class OrderController extends DefaultController {
  private readonly orderServiceApi: OrderServiceApi;

  constructor(orderServiceApi: OrderServiceApi) {
    super();
    this.orderServiceApi = orderServiceApi;
  }

  public createOrUpdate(request: Request) {
    return this.handleRequest(request, {
      service: this.orderServiceApi,
      function: 'createOrUpdate',
    });
  }

  @Post('/:id/checkout')
  public checkout(request: Request, @Param('id', ParseIntPipe) id: number) {
    return this.handleRequest(request, {
      service: this.orderServiceApi,
      function: 'checkout',
      args: [id],
    });
  }

  @Post('/:id/complete')
  public complete(request: Request, @Param('id', ParseIntPipe) id: number) {
    return this.handleRequest(request, {
      service: this.orderServiceApi,
      function: 'complete',
      args: [id],
    });
  }
}
