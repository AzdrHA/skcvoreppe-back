import { CustomRepository } from '../../typeorm-ex.decorator';
import { EventContent } from '@Entity/Event/EventContent';
import { DefaultRepository } from '@Repository/DefaultRepository';

@CustomRepository(EventContent)
export class EventContentRepository extends DefaultRepository<EventContent> {}
