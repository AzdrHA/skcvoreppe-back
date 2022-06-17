import * as SibApiV3Sdk from 'sib-api-v3-typescript';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendInBlueConnector {
  private apiKey = '';
  private delivery_address = '';

  public constructor() {
    this.apiKey = '10';
    this.delivery_address = 'b.brand@ascan.io';
  }

  public prepareSend() {
    // const apiInstance = new SibApiV3Sdk.SMTPApi();
    // apiInstance.authentications['apiKey'].apiKey = this.apiKey;
    // return apiInstance;
  }
}
