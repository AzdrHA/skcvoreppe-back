import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UserGender } from '@Entity/User/UserGender';
import { UserGenderServiceCommand } from '@ServiceCommand/User/UserGenderServiceCommand';
import { InitDataUserGender } from '@Command/initData/InitDataUserGender';

@Injectable()
export class InitUserGenderCommand {
  private userGenderServiceCommand: UserGenderServiceCommand;
  constructor(userGenderServiceCommand: UserGenderServiceCommand) {
    this.userGenderServiceCommand = userGenderServiceCommand;
  }

  @Command({ command: 'init:user_gender:create' })
  public async execute() {
    for (const { code, description } of InitDataUserGender) {
      let nGender = await this.userGenderServiceCommand
        .getRepository()
        .findOneBy({ code });

      if (!nGender) nGender = new UserGender();
      nGender.code = code;
      nGender.description = description;
      await this.userGenderServiceCommand.save(nGender);
      console.log(`Gender ${code} - ${description} created!`);
    }
  }
}
