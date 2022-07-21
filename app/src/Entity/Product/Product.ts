import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductPrice } from '@Entity/Product/ProductPrice';
import { Order } from '@Entity/Order/Order';
import { UtilStr } from '../../Util/UtilStr';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  public code: string;

  @Column({ type: 'varchar', nullable: true })
  public description?: string;

  @OneToOne(() => ProductPrice, (productPrice) => productPrice.product)
  public productPrice: ProductPrice;

  @Column({ type: 'varchar' })
  public extern_id: string;

  @CreateDateColumn({ type: 'datetime' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  public updateAt: Date;

  @OneToMany(() => Order, (order) => order.product)
  public orders: Order[];

  @BeforeInsert()
  @BeforeUpdate()
  private BeforeInsertAndBeforeUpdate() {
    return (this.code = UtilStr.slugify(this.name).toUpperCase());
  }
}
