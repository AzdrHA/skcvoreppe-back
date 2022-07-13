import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { User, UserRoles } from '@Entity/User/User';
import * as bcrypt from 'bcrypt';
import { UserGender } from '@Entity/User/UserGender';
import { UserRepository } from '@Repository/User/UserRepository';
import { UserGenderRepository } from '@Repository/User/UserGenderRepository';

@Injectable()
export class InitUsersCommand {
  private userRepository: UserRepository;
  private userGenderRepository: UserGenderRepository;

  constructor(
    useRepository: UserRepository,
    userGenderRepository: UserGenderRepository,
  ) {
    this.userRepository = useRepository;
    this.userGenderRepository = userGenderRepository;
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
      const gender = await this.userGenderRepository.findOneBy({
        code: user.gender,
      });

      const salt = await bcrypt.genSalt();
      let nUser = await this.userRepository.findOneBy({ email: user.email });
      if (!nUser) nUser = new User();
      nUser.firstname = user.firstname;
      nUser.lastname = user.lastname;
      nUser.email = user.email;
      nUser.role = user.role;
      nUser.password = await bcrypt.hash('Azeqsd38', salt);
      nUser.salt = salt;
      nUser.dateOfBirth = new Date(user.dateOfBirth);
      nUser.lastLoginAt = new Date();
      nUser.createdAt = new Date();
      nUser.updateAt = new Date();
      nUser.gender = gender;
      await this.userRepository.save(nUser);
      console.log(`${user.firstname} ${user.lastname} created!`);
    }
  }
}
