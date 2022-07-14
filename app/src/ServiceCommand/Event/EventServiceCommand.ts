import { Injectable } from '@nestjs/common';
import { DefaultServiceCommand } from '@ServiceCommand/DefaultServiceCommand';
import { EventRepository } from '@Repository/Event/EventRepository';
import { EventManager } from '../../Manager/Event/EventManager';

@Injectable()
export class EventServiceCommand extends DefaultServiceCommand<EventRepository> {
  private readonly eventManager: EventManager;
  constructor(eventRepository: EventRepository, eventManager: EventManager) {
    super(eventRepository);

    this.eventManager = eventManager;
  }

  public getManager(): EventManager {
    return this.eventManager;
  }

  public init(code: string) {
    return this.eventManager.init(code);
  }
}
