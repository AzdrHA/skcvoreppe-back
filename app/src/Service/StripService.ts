import { Injectable } from '@nestjs/common';
import { StripConnector } from '@Connector/StripConnector';
import { Stripe } from 'stripe';
import { User } from '@Entity/User/User';
import { Order } from '@Entity/Order/Order';

export type ProductParams = Stripe.ProductCreateParams & { unit_price: number };

@Injectable()
export class StripService {
  private stripConnector: StripConnector;
  public static apiOrderVersion = '2020-08-27;orders_beta=v4';

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

  private static dataParams(
    order: Order,
    action: 'create' | 'update',
  ): Stripe.OrderCreateParams {
    return <Stripe.OrderCreateParams>Object.assign(
      {
        currency: 'eur',
      },
      action === 'create'
        ? {
            line_items: [
              {
                product: order.product.extern_id,
                quantity: 1,
                price: order.product.productPrice.extern_id,
              },
            ],
            customer: order.owner.extern_id,
          }
        : {},
    );
  }

  public async sendOrder(id: string, amount: number) {
    return this.stripConnector.getOrders().submit(
      id,
      {
        expected_total: amount,
      },
      { apiVersion: StripService.apiOrderVersion },
    );
  }

  public async createOrUpdateOrder(order: Order, action: 'create' | 'update') {
    if (!order.extern_id) {
      return this.stripConnector
        .getOrders()
        .create(StripService.dataParams(order, action), {
          apiVersion: StripService.apiOrderVersion,
        });
    }
    try {
      return this.stripConnector
        .getOrders()
        .update(order.extern_id, StripService.dataParams(order, action), {
          apiVersion: StripService.apiOrderVersion,
        });
    } catch (e) {
      return this.stripConnector
        .getOrders()
        .create(StripService.dataParams(order, action), {
          apiVersion: StripService.apiOrderVersion,
        });
    }
  }

  public async getOrder(id: string) {
    return this.stripConnector.getOrders().retrieve(id, {
      apiVersion: StripService.apiOrderVersion,
    });
  }
}
