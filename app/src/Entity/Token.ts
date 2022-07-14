import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@Entity/User/User';
import { NotifiableEntityInterface } from '../Type/NotifiableEntityInterface';

export enum TokenFormat {
  FORGOT_PASSWORD = 'forgot_password',
  EMAIL_VERIFICATION = 'email_verification',
}

@Entity('token')
export class Token implements NotifiableEntityInterface {
  public static REQUEST_VALIDATION = 60 * 1000 * 10;

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public token: string;

  @CreateDateColumn({ type: 'datetime' })
  public requestAt: Date;

  @Column({ type: 'datetime' })
  public expiredAt: Date;

  @Column({
    type: 'enum',
    enum: TokenFormat,
  })
  public type: TokenFormat;

  @ManyToOne(() => User, (user) => user.tokens)
  public user: User;

  transformObjectToEventData(): { [key: string]: any } {
    return {
      token: this.token,
      type: this.type,
      user: this.user.transformObjectToEventData(),
    };
  }
}
