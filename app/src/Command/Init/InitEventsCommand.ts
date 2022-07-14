import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { Event } from '@Entity/Event/Event';
import { EventServiceCommand } from '@ServiceCommand/Event/EventServiceCommand';

@Injectable()
export class InitEventsCommand {
  private eventServiceCommand: EventServiceCommand;

  constructor(eventServiceCommand: EventServiceCommand) {
    this.eventServiceCommand = eventServiceCommand;
  }

  public events = [
    {
      code: Event.USER_FORGOT_PASSWORD,
      name: 'Mot de passe oublié',
      description: 'Quand un utilisateur oublie son mot de passe',
    },
    {
      code: Event.USER_REGISTER,
      name: 'Message de bienvenue',
      description: "Quand un nouveau adhérent s'inscrit",
    },
  ];

  @Command({ command: 'init:events:create' })
  public async execute() {
    for (const event of this.events) {
      let eventDb = await this.eventServiceCommand
        .getRepository()
        .findOneBy({ code: event.code });

      if (!eventDb) eventDb = await this.eventServiceCommand.init(event.code);
      eventDb.name = event.name;
      eventDb.description = event.description;

      await this.eventServiceCommand.save(eventDb);
      console.log(`${event.code} created!`);
    }
  }
}
