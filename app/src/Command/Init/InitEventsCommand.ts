import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { EventServiceCommand } from '@ServiceCommand/Event/EventServiceCommand';
import { initDataEvents } from '@Command/initData/InitDataEvents';

@Injectable()
export class InitEventsCommand {
  private eventServiceCommand: EventServiceCommand;

  constructor(eventServiceCommand: EventServiceCommand) {
    this.eventServiceCommand = eventServiceCommand;
  }

  @Command({ command: 'init:events:create' })
  public async execute() {
    for (const event of initDataEvents) {
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
