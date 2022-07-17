import { Injectable } from '@nestjs/common';
import { ProductParams, StripService } from '@Service/StripService';
import { ProductRepository } from '@Repository/Product/ProductRepository';
import { ProductPriceRepository } from '@Repository/Product/ProductPriceRepository';
import { PaymentLinkRepository } from '@Repository/PaymentLink/PaymentLinkRepository';

@Injectable()
export class ProductService {
  private stripService: StripService;
  private productRepository: ProductRepository;
  private productPriceRepository: ProductPriceRepository;
  private paymentLinkRepository: PaymentLinkRepository;

  constructor(
    stripService: StripService,
    productRepository: ProductRepository,
    productPriceRepository: ProductPriceRepository,
    paymentLinkRepository: PaymentLinkRepository,
  ) {
    this.stripService = stripService;
    this.productRepository = productRepository;
    this.productPriceRepository = productPriceRepository;
    this.paymentLinkRepository = paymentLinkRepository;
  }

  public async createProduct(params: ProductParams) {
    const price = params.unit_price;
    delete params.unit_price;

    const product = await this.stripService.createProduct(params);
    const newProduct = this.productRepository.create({
      name: params.name,
      description: params.description,
      extern_id: product.id,
    });
    await this.productRepository.save(newProduct);

    const productPrice = await this.stripService.setProductPrice(
      price,
      product.id,
    );
    const newProductPrice = this.productPriceRepository.create({
      unit_price: price,
      extern_id: productPrice.id,
      product: newProduct,
    });
    await this.productPriceRepository.save(newProductPrice);

    const paymentLink = await this.stripService.setProductPaymentLink(
      productPrice.id,
    );
    const newPaymentLink = this.paymentLinkRepository.create({
      link: paymentLink.url,
      extern_id: paymentLink.id,
      productPrice: newProductPrice,
    });
    await this.paymentLinkRepository.save(newPaymentLink);
  }
}
