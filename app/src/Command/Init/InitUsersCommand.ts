import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { User } from '@Entity/User/User';
import { UserServiceCommand } from '@ServiceCommand/User/UserServiceCommand';
import { UserGenderServiceCommand } from '@ServiceCommand/User/UserGenderServiceCommand';
import { InitDataUser } from '@Command/initData/InitDataUser';
import { UserService } from '@Service/UserService';

@Injectable()
export class InitUsersCommand {
  private userServiceCommand: UserServiceCommand;
  private userGenderServiceCommand: UserGenderServiceCommand;
  private userService: UserService;

  constructor(
    userServiceCommand: UserServiceCommand,
    userGenderServiceCommand: UserGenderServiceCommand,
    userService: UserService,
  ) {
    this.userServiceCommand = userServiceCommand;
    this.userGenderServiceCommand = userGenderServiceCommand;
    this.userService = userService;
  }

  @Command({ command: 'init:users:create' })
  public async execute() {
    for (const user of InitDataUser) {
      const gender = await this.userGenderServiceCommand
        .getRepository()
        .findOneBy({
          code: user.gender,
        });

      let nUser = await this.userServiceCommand
        .getRepository()
        .findOneBy({ email: user.email });

      if (!nUser) nUser = new User();
      nUser.firstName = user.firstname;
      nUser.lastName = user.lastname;
      nUser.email = user.email;
      nUser.role = user.role;
      nUser.password = 'Azeqsd38';
      nUser.dateOfBirth = new Date(user.dateOfBirth);
      nUser.lastLoginAt = new Date();
      nUser.createdAt = new Date();
      nUser.updateAt = new Date();
      nUser.gender = gender;
      // await this.userServiceCommand.save(nUser);
      await this.userService.createOrUpdateCustomer(nUser);
      console.log(`${user.firstname} ${user.lastname} created!`);
    }
  }
}
