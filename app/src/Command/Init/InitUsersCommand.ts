import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { User, UserRoles } from '@Entity/User/User';
import { UserServiceCommand } from '@ServiceCommand/User/UserServiceCommand';
import { UserGenderServiceCommand } from '@ServiceCommand/User/UserGenderServiceCommand';
import { AuthService } from '@Service/AuthService';

@Injectable()
export class InitUsersCommand {
  private userServiceCommand: UserServiceCommand;
  private userGenderServiceCommand: UserGenderServiceCommand;
  private authService: AuthService;

  constructor(
    userServiceCommand: UserServiceCommand,
    userGenderServiceCommand: UserGenderServiceCommand,
    authService: AuthService,
  ) {
    this.userServiceCommand = userServiceCommand;
    this.userGenderServiceCommand = userGenderServiceCommand;
    this.authService = authService;
  }

  public users: {
    firstname: string;
    lastname: string;
    email: string;
    role: UserRoles;
    dateOfBirth: string;
    gender: string;
  }[] = [
    {
      firstname: 'Baptiste',
      lastname: 'Brand',
      email: 'azdracito@gmail.com',
      role: UserRoles.ROLE_SYSADMIN,
      dateOfBirth: '2002-04-28',
      gender: 'male',
    },
    {
      firstname: 'Etienne',
      lastname: 'César',
      email: 'etienne.cesar@laposte.net',
      role: UserRoles.ROLE_ADMIN,
      dateOfBirth: '2002-04-28',
      gender: 'male',
    },
    {
      firstname: 'Michel',
      lastname: 'Vanvolsem',
      email: 'michelvanvolsem@hotmail.com',
      role: UserRoles.ROLE_ADMIN,
      dateOfBirth: '2002-04-28',
      gender: 'male',
    },
    {
      firstname: 'Ilan',
      lastname: 'El yandouzi',
      email: 'elyandouzi.ilan@gmail.com',
      role: UserRoles.ROLE_ADMIN,
      dateOfBirth: '2002-04-28',
      gender: 'male',
    },
    {
      firstname: 'Emmanuel',
      lastname: 'Raoelina',
      email: 'emmanuel.raoelina.karate@gmail.com',
      role: UserRoles.ROLE_ADMIN,
      dateOfBirth: '2002-04-28',
      gender: 'male',
    },
  ];

  @Command({ command: 'init:users:create' })
  public async execute() {
    for (const user of this.users) {
      const gender = await this.userGenderServiceCommand
        .getRepository()
        .findOneBy({
          code: user.gender,
        });

      let nUser = await this.userServiceCommand
        .getRepository()
        .findOneBy({ email: user.email });
      if (!nUser) nUser = new User();
      nUser.firstname = user.firstname;
      nUser.lastname = user.lastname;
      nUser.email = user.email;
      nUser.role = user.role;
      await this.authService.encryptPassword(nUser, 'Azeqsd38');
      nUser.dateOfBirth = new Date(user.dateOfBirth);
      nUser.lastLoginAt = new Date();
      nUser.createdAt = new Date();
      nUser.updateAt = new Date();
      nUser.gender = gender;
      await this.userServiceCommand.save(nUser);
      console.log(`${user.firstname} ${user.lastname} created!`);
    }
  }
}
