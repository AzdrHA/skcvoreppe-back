import { User } from '@Entity/User/User';
import * as bcrypt from 'bcrypt';
import { ApiException } from '../Exception/ApiException';
import { UserService } from '@Service/UserService';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@Repository/User/UserRepository';

@Injectable()
export class AuthService {
  private userService: UserService;
  private userRepository: UserRepository;

  public constructor(userService: UserService, useRepository: UserRepository) {
    this.userService = userService;
    this.userRepository = useRepository;
  }

  public async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<{ [key: string]: string }> {
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      user.lastLoginAt = new Date();
      await this.userRepository.save(user);

      return this.userService.serializeUser(user);
    }

    throw new ApiException('Email or password are incorrect');
  }

  public async encryptPassword(user: User, plainPassword: string) {
    const salt = await bcrypt.genSalt();
    user.salt = salt;
    user.password = await bcrypt.hash(plainPassword, salt);
  }
}
