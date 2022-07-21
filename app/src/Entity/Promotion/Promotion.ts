import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '@Entity/Order/Order';
import { PromotionCoupon } from '@Entity/Promotion/PromotionCoupon';

@Entity('promotion')
export class Promotion {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public code: string;

  @Column({ type: 'boolean' })
  public enabled: boolean;

  @Column({ type: 'varchar' })
  public extern_id: string;

  @OneToMany(() => Order, (order) => order.promotion, { nullable: true })
  public orders: Order[];

  @OneToMany(() => PromotionCoupon, (coupon) => coupon.promotion)
  public coupons: PromotionCoupon[];
}
