import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { OrderService } from '@Service/Order/OrderService';
import { Order } from '@Entity/Order/Order';
import { ProductRepository } from '@Repository/Product/ProductRepository';
import { UserRepository } from '@Repository/User/UserRepository';
import { OrderRepository } from '@Repository/Order/OrderRepository';

@Injectable()
export class TestStripPaymentIntents {
  private orderService: OrderService;
  private productRepository: ProductRepository;
  private userRepository: UserRepository;
  private orderRepository: OrderRepository;

  constructor(
    orderService: OrderService,
    productRepository: ProductRepository,
    userRepository: UserRepository,
    orderRepository: OrderRepository,
  ) {
    this.orderService = orderService;
    this.productRepository = productRepository;
    this.userRepository = userRepository;
    this.orderRepository = orderRepository;
  }

  @Command({ command: 'test:strip:payment:intent' })
  public async execute() {
    /*const product = await this.productRepository.findOne({
      where: {
        code: 'VAUDOUPANAME',
      },
      relations: ['productPrice'],
    });
    const user = await this.userRepository.findOneBy({
      email: 'azdracito@gmail.com',
    });
    const order = new Order();
    order.product = product;
    order.owner = user;
    order.calculatePrice();*/
    const order = await this.orderRepository.findOne({
      where: {
        id: 1,
      },
      relations: ['product', 'owner', 'promotion', 'product.productPrice'],
    });
    await this.orderService.createOrUpdate(
      order,
      order.id ? 'update' : 'create',
    );
  }
}
