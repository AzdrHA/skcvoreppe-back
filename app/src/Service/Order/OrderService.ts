import { Injectable } from '@nestjs/common';
import { StripService } from '@Service/StripService';
import { OrderRepository } from '@Repository/Order/OrderRepository';
import { Order } from '@Entity/Order/Order';

@Injectable()
export class OrderService {
  private stripService: StripService;
  private orderRepository: OrderRepository;

  constructor(stripService: StripService, orderRepository: OrderRepository) {
    this.stripService = stripService;
    this.orderRepository = orderRepository;
  }

  public async createOrUpdate(order: Order, action: 'create' | 'update') {
    const sOrder = await this.stripService.createOrUpdateOrder(order, action);
    if (action === 'create') {
      const submitOrder = await this.stripService.sendOrder(
        sOrder.id,
        sOrder.amount_total,
      );
      order.extern_payment_intent_id = submitOrder.payment
        .payment_intent as string;
    }
    order.extern_id = sOrder.id;
    order.amount = sOrder.amount_total;
    order.status = sOrder.status;
    order.paymentStatus = sOrder.payment.status;
    if (order.id) await this.orderRepository.update({ id: order.id }, order);
    else await this.orderRepository.create(order);
    await this.orderRepository.save(order);
    return sOrder;
  }
}
