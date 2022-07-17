import { Injectable } from '@nestjs/common';
import { UtilObject } from '../Util/UtilObject';
import { User } from '@Entity/User/User';
import { StripService } from '@Service/StripService';
import { UserRepository } from '@Repository/User/UserRepository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private stripService: StripService;
  private userRepository: UserRepository;
  constructor(stripService: StripService, userRepository: UserRepository) {
    this.stripService = stripService;
    this.userRepository = userRepository;
  }

  public async encryptPassword(user: User, plainPassword: string) {
    const salt = await bcrypt.genSalt();
    user.salt = salt;
    user.password = await bcrypt.hash(plainPassword, salt);
  }

  public async createOrUpdateCustomer(user: User) {
    const customer = await this.stripService.createOrUpdateCustomer(user);
    user.extern_id = customer.id;
    // TODO ADD USER REPOSITORY UPDATE
    await this.userRepository.create(user);
    await this.encryptPassword(user, user.password);
    await this.userRepository.save(user);
    return user;
  }

  public serializeUser = (user: User): { [key: string]: string } => {
    return UtilObject.getNested<User>(user, [
      'id',
      'firstName',
      'lastName',
      'email',
      'role',
      'lastLoginAt',
      'createdAt',
      'updateAt',
    ]);
  };
}
