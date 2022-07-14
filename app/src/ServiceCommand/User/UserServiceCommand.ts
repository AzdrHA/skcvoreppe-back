import { Injectable } from '@nestjs/common';
import { DefaultServiceCommand } from '@ServiceCommand/DefaultServiceCommand';
import { UserRepository } from '@Repository/User/UserRepository';

@Injectable()
export class UserServiceCommand extends DefaultServiceCommand<UserRepository> {}
