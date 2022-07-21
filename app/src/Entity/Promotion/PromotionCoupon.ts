import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Promotion } from '@Entity/Promotion/Promotion';

@Entity('promotion_coupon')
export class PromotionCoupon {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'boolean' })
  public enabled: boolean;

  @ManyToOne(() => Promotion, (promotion) => promotion.coupons, {
    nullable: true,
  })
  public promotion?: Promotion;
}
