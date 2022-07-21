import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '@Entity/Product/Product';
import { User } from '@Entity/User/User';
import { Promotion } from '@Entity/Promotion/Promotion';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'integer' })
  public amount: number;

  @Column({ type: 'varchar' })
  public status: string;

  @Column({ type: 'varchar', nullable: true })
  public paymentStatus?: string;

  @Column({ type: 'varchar', nullable: true })
  public extern_payment_intent_id?: string;

  @Column({ type: 'varchar' })
  public extern_id: string;

  @CreateDateColumn({ type: 'datetime' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  public updateAt: Date;

  @ManyToOne(() => Product, (product) => product.orders, { nullable: true })
  public product?: Product;

  @ManyToOne(() => User, (order) => order.orders, { nullable: true })
  public owner?: User;

  @ManyToOne(() => Promotion, (promotion) => promotion.orders, {
    nullable: true,
  })
  public promotion?: Promotion;

  public calculatePrice() {
    console.log(this.product.productPrice.unit_price);
    this.amount = this.product.productPrice.unit_price;
  }
}
