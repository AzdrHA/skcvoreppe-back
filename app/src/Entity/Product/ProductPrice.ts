import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '@Entity/Product/Product';
import { PaymentLink } from '@Entity/PaymentLink/PaymentLink';

@Entity('product_price')
export class ProductPrice {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'integer' })
  public unit_price: number;

  @Column({ type: 'varchar' })
  public extern_id: string;

  @OneToOne(() => Product, (product) => product.productPrice)
  @JoinColumn()
  public product: Product;

  @OneToOne(() => PaymentLink, (paymentLink) => paymentLink.productPrice)
  @JoinColumn()
  public paymentLink: PaymentLink;

  @CreateDateColumn({ type: 'datetime' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  public updateAt: Date;
}
