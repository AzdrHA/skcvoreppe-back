import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductPrice } from '@Entity/Product/ProductPrice';

@Entity('payment_link')
export class PaymentLink {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public link: string;

  @Column({ type: 'varchar' })
  public extern_id: string;

  @OneToOne(() => ProductPrice, (productPrice) => productPrice.paymentLink)
  public productPrice: ProductPrice;

  @CreateDateColumn({ type: 'datetime' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  public updateAt: Date;
}
