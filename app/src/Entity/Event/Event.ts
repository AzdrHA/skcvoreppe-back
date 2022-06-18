import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventContent } from '@Entity/Event/EventContent';

@Entity('event')
export class Event extends BaseEntity {
  public static readonly USER_FORGOT_PASSWORD = 'user:password:forgot-request';

  public static readonly EVENT_LIST = [Event.USER_FORGOT_PASSWORD];

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'enum', enum: [Event.EVENT_LIST], nullable: true })
  public code: string | null = null;

  @Column({ type: 'varchar', default: null, nullable: true })
  public name: string | null = null;

  @Column({ type: 'varchar', default: null, nullable: true })
  public description: string | null = null;

  @OneToOne(() => EventContent, (eventContent) => eventContent.event)
  public eventContent: EventContent;
}
