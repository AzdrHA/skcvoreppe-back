import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { User } from '@Entity/User/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InitUsersCommand {
  public users = [
    {
      firstname: 'Baptiste',
      lastname: 'Brand',
      email: 'azdracito@gmail.com',
    },
    {
      firstname: 'Etienne',
      lastname: 'César',
      email: 'etienne.cesar@laposte.net',
    },
    {
      firstname: 'Michel',
      lastname: 'Vanvolsem',
      email: 'michelvanvolsem@hotmail.com',
    },
    {
      firstname: 'Ilan',
      lastname: 'El yandouzi',
      email: 'elyandouzi.ilan@gmail.com',
    },
    {
      firstname: 'Emmanuel',
      lastname: 'Raoelina',
      email: 'emmanuel.raoelina.karate@gmail.com',
    },
  ];

  @Command({ command: 'init:users:create' })
  public async execute() {
    for (const { email, firstname, lastname } of this.users) {
      const salt = await bcrypt.genSalt();
      let user = await User.findOneBy({ email });
      if (!user) user = new User();
      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;
      user.password = await bcrypt.hash('Azeqsd38', salt);
      user.salt = salt;
      user.lastLoginAt = new Date();
      user.createdAt = new Date();
      user.updateAt = new Date();
      await User.save(user);
      console.log(`${firstname} ${lastname} created!`);
    }
  }
}
