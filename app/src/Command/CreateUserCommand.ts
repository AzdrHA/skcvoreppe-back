import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { User } from '@Entity/User/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserCommand {
  @Command({ command: 'user:create' })
  public async create() {
    const salt = await bcrypt.genSalt();
    const user = new User();
    user.firstname = 'Baptiste';
    user.lastname = 'Brand';
    user.password = await bcrypt.hash('Azeqsd38', salt);
    user.salt = salt;
    user.email = 'azdracito@gmail.com';
    user.lastLoginAt = new Date();
    user.createdAt = new Date();
    user.updateAt = new Date();
    await User.save(user);
  }
}
