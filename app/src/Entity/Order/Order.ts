import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@Entity/Product/Product';
import { User } from '@Entity/User/User';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'integer' })
  public amount: number;

  @Column({ type: 'varchar' })
  public status: string;

  @Column({ type: 'varchar' })
  public paymentStatus: string;

  @Column({ type: 'varchar', nullable: true })
  public payment_id?: string;

  @ManyToOne(() => Product, (product) => product.orders, { nullable: true })
  public product?: Product;

  @ManyToOne(() => User, (order) => order.orders, { nullable: true })
  public owner?: User;
}
