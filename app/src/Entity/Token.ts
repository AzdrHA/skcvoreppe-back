import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@Entity/User/User';
import { NotifiableEntityInterface } from '../Type/NotifiableEntityInterface';
import * as crypto from 'crypto';

export enum TokenFormat {
  FORGOT_PASSWORD = 'forgot_password',
}

@Entity('token')
export class Token extends BaseEntity implements NotifiableEntityInterface {
  public REQUEST_VALIDATION = 60 * 1000 * 10;

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public token: string = crypto.randomBytes(32).toString('hex');

  @CreateDateColumn({ type: 'datetime', name: 'requestAt' })
  private _requestAt: Date = new Date();

  @Column({ type: 'datetime', name: 'expiresAt' })
  private _expiresAt: Date = new Date(Date.now() + this.REQUEST_VALIDATION);

  @Column({
    type: 'enum',
    enum: TokenFormat,
  })
  public type: TokenFormat;

  @ManyToOne(() => User, (user) => user.tokens)
  public user: User;

  get requestAt(): Date {
    return this._requestAt;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }
}
