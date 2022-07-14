import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventContent } from '@Entity/Event/EventContent';

@Entity('event')
export class Event {
  public static readonly USER_FORGOT_PASSWORD = 'user:password:forgot-request';
  public static readonly USER_REGISTER = 'user:register';

  public static readonly EVENT_LIST = [
    Event.USER_FORGOT_PASSWORD,
    Event.USER_REGISTER,
  ];

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public code: string;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar' })
  public description: string;

  @OneToOne(() => EventContent, (eventContent) => eventContent.event)
  public eventContent: EventContent;
}
