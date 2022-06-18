import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from '@Entity/Event/Event';

@Entity('event_content')
export class EventContent extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', default: null, nullable: true })
  public title: string | null = null;

  @Column({ type: 'text', default: null, nullable: true })
  public content: string | null = null;

  @OneToOne(() => Event, (event) => event.eventContent)
  @JoinColumn()
  public event: Event;
}
