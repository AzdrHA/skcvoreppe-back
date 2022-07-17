import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { StripService } from '@Service/StripService';

@Injectable()
export class TestStripPaymentIntents {
  private stripService: StripService;

  constructor(stripService: StripService) {
    this.stripService = stripService;
  }

  @Command({ command: 'test:strip:payment:intent' })
  public async execute() {
    await this.stripService.createPaymentIntent();
  }
}
