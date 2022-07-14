import { CustomRepository } from '../../typeorm-ex.decorator';
import { Event } from '@Entity/Event/Event';
import { DefaultRepository } from '@Repository/DefaultRepository';

@CustomRepository(Event)
export class EventRepository extends DefaultRepository<Event> {}
