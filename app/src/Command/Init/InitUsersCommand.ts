import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { User, UserRoles } from '@Entity/User/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InitUsersCommand {
  public users: {
    firstname: string;
    lastname: string;
    email: string;
    role: UserRoles;
  }[] = [
    {
      firstname: 'Baptiste',
      lastname: 'Brand',
      email: 'azdracito@gmail.com',
      role: UserRoles.ROLE_SYSADMIN,
    },
    {
      firstname: 'Etienne',
      lastname: 'César',
      email: 'etienne.cesar@laposte.net',
      role: UserRoles.ROLE_ADMIN,
    },
    {
      firstname: 'Michel',
      lastname: 'Vanvolsem',
      email: 'michelvanvolsem@hotmail.com',
      role: UserRoles.ROLE_ADMIN,
    },
    {
      firstname: 'Ilan',
      lastname: 'El yandouzi',
      email: 'elyandouzi.ilan@gmail.com',
      role: UserRoles.ROLE_ADMIN,
    },
    {
      firstname: 'Emmanuel',
      lastname: 'Raoelina',
      email: 'emmanuel.raoelina.karate@gmail.com',
      role: UserRoles.ROLE_ADMIN,
    },
  ];

  @Command({ command: 'init:users:create' })
  public async execute() {
    for (const user of this.users) {
      const salt = await bcrypt.genSalt();
      let nUser = await User.findOneBy({ email: user.email });
      if (!nUser) nUser = new User();
      nUser.firstname = user.firstname;
      nUser.lastname = user.lastname;
      nUser.email = user.email;
      nUser.role = user.role;
      nUser.password = await bcrypt.hash('Azeqsd38', salt);
      nUser.salt = salt;
      nUser.lastLoginAt = new Date();
      nUser.createdAt = new Date();
      nUser.updateAt = new Date();
      await User.save(nUser);
      console.log(`${user.firstname} ${user.lastname} created!`);
    }
  }
}
