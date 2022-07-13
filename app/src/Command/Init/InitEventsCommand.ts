import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { Event } from '@Entity/Event/Event';
import { EventManager } from '../../Manager/Event/EventManager';
import { EventRepository } from '@Repository/Event/EventRepository';

@Injectable()
export class InitEventsCommand {
  private eventManager: EventManager;
  private eventRepository: EventRepository;
  constructor(eventManager: EventManager, eventRepository: EventRepository) {
    this.eventManager = eventManager;
    this.eventRepository = eventRepository;
  }

  public events = [
    { code: Event.USER_FORGOT_PASSWORD, name: 'Mot de passe oublié' },
  ];

  @Command({ command: 'init:events:create' })
  public async execute() {
    for (const event of this.events) {
      let eventDb = await this.eventRepository.findOneBy({ code: event.code });
      if (!eventDb) eventDb = await this.eventManager.init(event.code);
      eventDb.name = event.name;
      await this.eventRepository.save(eventDb);
    }
  }
}
