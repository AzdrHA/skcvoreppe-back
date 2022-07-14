import { Event } from '@Entity/Event/Event';
import { EventContent } from '@Entity/Event/EventContent';
import { EventContentRepository } from '@Repository/Event/EventContentRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventManager {
  private eventContentRepository: EventContentRepository;
  constructor(eventContentRepository: EventContentRepository) {
    this.eventContentRepository = eventContentRepository;
  }

  public async init(code: string): Promise<Event> {
    const event = new Event();
    event.code = code;

    const content = new EventContent();
    event.eventContent = content;
    await this.eventContentRepository.save(content);

    return event;
  }
}
