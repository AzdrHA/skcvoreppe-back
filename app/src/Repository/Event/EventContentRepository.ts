import { Repository } from 'typeorm';
import { CustomRepository } from '../../typeorm-ex.decorator';
import { EventContent } from '@Entity/Event/EventContent';

@CustomRepository(EventContent)
export class EventContentRepository extends Repository<EventContent> {}
