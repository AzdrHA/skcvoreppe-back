import { Command } from 'nestjs-command';
import { ProductService } from '@Service/Product/ProductService';
import { Injectable } from '@nestjs/common';
import { InitDataProducts } from '@Command/initData/InitDataProducts';

@Injectable()
export class InitProductCommand {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  @Command({ command: 'init:product:create' })
  public async execute() {
    for (const product of InitDataProducts) {
      await this.productService.createProduct(product);
    }
  }
}
