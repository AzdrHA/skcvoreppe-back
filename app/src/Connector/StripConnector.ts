import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Injectable()
export class StripConnector {
  private readonly apiKey = '';
  private readonly stripe: Stripe;

  constructor(configService: ConfigService) {
    this.apiKey = configService.get('stripApiKey');
    this.stripe = new Stripe(configService.get('stripApiKey'), {
      apiVersion: '2020-08-27',
    });
  }

  public getStrip(): Stripe {
    return this.stripe;
  }

  public getProduct(): Stripe.ProductsResource {
    return this.getStrip().products;
  }

  public getPrice(): Stripe.PricesResource {
    return this.getStrip().prices;
  }

  public getPaymentLinks(): Stripe.PaymentLinksResource {
    return this.getStrip().paymentLinks;
  }

  public getPaymentIntent(): Stripe.PaymentIntentsResource {
    return this.stripe.paymentIntents;
  }

  public getCustomers(): Stripe.CustomersResource {
    return this.stripe.customers;
  }

  public getOrders() {
    return this.stripe.orders;
  }
}
