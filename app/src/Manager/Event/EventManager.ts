import { Event } from '@Entity/Event/Event';
import { EventContent } from '@Entity/Event/EventContent';

export class EventManager {
  public async init(code: string): Promise<Event> {
    const event = new Event();
    event.code = code;

    const content = new EventContent();
    event.eventContent = content;
    await EventContent.save(content);

    return event;
  }
}
