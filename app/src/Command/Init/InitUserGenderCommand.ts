import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UserGender } from '@Entity/User/UserGender';
import { UserGenderServiceCommand } from '@ServiceCommand/User/UserGenderServiceCommand';

@Injectable()
export class InitUserGenderCommand {
  private userGenderServiceCommand: UserGenderServiceCommand;
  constructor(userGenderServiceCommand: UserGenderServiceCommand) {
    this.userGenderServiceCommand = userGenderServiceCommand;
  }

  public genders: { code: string; description: string }[] = [
    { code: 'female', description: 'Femme' },
    { code: 'male', description: 'Homme' },
    { code: 'non_binary', description: 'Non-binaire' },
    { code: 'transgender', description: 'Transgenres' },
    { code: 'intersex', description: 'Intersexe' },
    { code: 'let_me_type', description: 'Laissez-moi taper' },
    { code: 'not_saying', description: 'Je ne préfère pas le dire' },
  ];

  @Command({ command: 'init:user_gender:create' })
  public async execute() {
    for (const { code, description } of this.genders) {
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
