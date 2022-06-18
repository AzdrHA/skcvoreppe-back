import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Token } from '@Entity/Token';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public firstname: string;

  @Column({ type: 'varchar' })
  public lastname: string;

  @Column({ type: 'varchar' })
  public password: string;

  @Column({ type: 'varchar' })
  public salt: string;

  @Column({ type: 'varchar' })
  public email: string;

  @Column({ type: 'varchar' })
  public lastLoginAt: Date;

  @CreateDateColumn({ type: 'datetime' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  public updateAt: Date;

  @OneToMany(() => Token, (token) => token.user)
  public tokens: Token[];
}
