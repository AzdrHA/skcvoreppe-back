import { User } from '@Entity/User/User';
import * as bcrypt from 'bcrypt';
import { ApiException } from '../Exception/ApiException';
import { UserService } from '@Service/UserService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<{ [key: string]: string }> {
    const user = await User.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      user.lastLoginAt = new Date();
      await User.save(user);

      return this.userService.serializeUser(user);
    }

    throw new ApiException('Email or password are incorrect');
  }
}
