import { Injectable } from '@nestjs/common';
import { StripConnector } from '@Connector/StripConnector';
import { Stripe } from 'stripe';
import { User } from '@Entity/User/User';

export type ProductParams = Stripe.ProductCreateParams & { unit_price: number };

@Injectable()
export class StripService {
  private stripConnector: StripConnector;

  constructor(stripConnector: StripConnector) {
    this.stripConnector = stripConnector;
  }

  /**
   * @param {ProductParams} params
   * @return {Promise<string>}
   */
  public async createProduct(params: ProductParams) {
    return this.stripConnector.getProduct().create(params);
  }

  public async setProductPrice(
    unit_amount: number,
    product: string,
  ): Promise<Stripe.Response<Stripe.Price>> {
    return this.stripConnector.getPrice().create({
      unit_amount: unit_amount,
      billing_scheme: 'per_unit',
      currency: 'eur',
      product: product,
    });
  }

  public async setProductPaymentLink(
    price: string,
  ): Promise<Stripe.Response<Stripe.PaymentLink>> {
    return this.stripConnector.getPaymentLinks().create({
      line_items: [{ price, quantity: 1 }],
      allow_promotion_codes: true,
    });
  }

  public async createPaymentIntent() {
    return this.stripConnector.getPaymentIntent().create({
      amount: 2000,
      currency: 'eur',
      payment_method_types: ['card'],
    });
  }

  public async createOrUpdateCustomer(
    user: User,
  ): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
    if (!user.extern_id) {
      return await this.stripConnector.getCustomers().create({
        name: user.displayName(),
        email: user.email,
      });
    }
    try {
      return await this.stripConnector.getCustomers().update(user.extern_id, {
        name: user.displayName(),
        email: user.email,
      });
    } catch (e) {
      return await this.stripConnector.getCustomers().create({
        name: user.displayName(),
        email: user.email,
      });
    }
  }
}
