import { Injectable } from '@nestjs/common';
import { DefaultServiceCommand } from '@ServiceCommand/DefaultServiceCommand';
import { EventRepository } from '@Repository/Event/EventRepository';
import { EventManager } from '../../Manager/Event/EventManager';

@Injectable()
export class EventServiceCommand extends DefaultServiceCommand<EventRepository> {
  private readonly eventManager: EventManager;
  constructor(repository: EventRepository, eventManager: EventManager) {
    super(repository);

    this.eventManager = eventManager;
  }

  public init(code: string) {
    return this.eventManager.init(code);
  }
}
