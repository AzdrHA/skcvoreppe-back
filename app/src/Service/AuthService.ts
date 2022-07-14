import { User } from '@Entity/User/User';
import * as bcrypt from 'bcrypt';
import { ApiException } from '../Exception/ApiException';
import { UserService } from '@Service/UserService';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@Repository/User/UserRepository';
import { TranslatorService } from 'nestjs-translator';

@Injectable()
export class AuthService {
  private userService: UserService;
  private userRepository: UserRepository;
  private translator: TranslatorService;

  public constructor(
    userService: UserService,
    useRepository: UserRepository,
    translator: TranslatorService,
  ) {
    this.userService = userService;
    this.userRepository = useRepository;
    this.translator = translator;
  }

  public async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<{ [key: string]: string }> {
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.enabled)
        throw new ApiException(
          this.translator.translate('ACCOUNT_NOT_ENABLED'),
        );

      user.lastLoginAt = new Date();
      await this.userRepository.save(user);

      return this.userService.serializeUser(user);
    }

    throw new ApiException(
      this.translator.translate('EMAIL_OR_PASSWORD_INCORRECT'),
    );
  }

  public async encryptPassword(user: User, plainPassword: string) {
    const salt = await bcrypt.genSalt();
    user.salt = salt;
    user.password = await bcrypt.hash(plainPassword, salt);
  }
}
