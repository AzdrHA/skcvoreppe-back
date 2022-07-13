import { Repository } from 'typeorm';
import { CustomRepository } from '../../typeorm-ex.decorator';
import { Event } from '@Entity/Event/Event';

@CustomRepository(Event)
export class EventRepository extends Repository<Event> {}
