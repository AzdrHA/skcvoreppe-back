import { Injectable } from '@nestjs/common';
import { ApiException } from '../Exception/ApiException';
import { NotifiableEntityInterface } from '../Type/NotifiableEntityInterface';
import { EmailParams, EmailService } from '@Service/EmailService';
import { EmailContext } from '@Connector/SendInBlueConnector';
import { EventRepository } from '@Repository/Event/EventRepository';

@Injectable()
export class NotifEventDispatcher {
  private emailService: EmailService;
  private eventRepository: EventRepository;
  constructor(emailService: EmailService, eventRepository: EventRepository) {
    this.emailService = emailService;
    this.eventRepository = eventRepository;
  }

  /**
   * @param {string} code EventCode
   * @param {NotifiableEntityInterface} object
   */
  public async dispatchMessage(
    code: string,
    object: NotifiableEntityInterface,
  ) {
    const event = await this.eventRepository.findOne({
      where: {
        code,
      },
      relations: ['eventContent'],
    });
    if (!event) throw new ApiException(`Event dont exist : ${code}`);

    const content = event.eventContent;
    const params: EmailParams = {
      [object.constructor.name.toLowerCase()]:
        object.transformObjectToEventData(),
      title: content.title,
    };

    const context: EmailContext = {
      body: '',
      subject: content.title,
      htmlContent: content.content,
    };

    return this.emailService.sendEmail(params, context);
  }
}
