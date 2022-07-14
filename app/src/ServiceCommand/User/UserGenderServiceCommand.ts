import { Injectable } from '@nestjs/common';
import { DefaultServiceCommand } from '@ServiceCommand/DefaultServiceCommand';
import { UserGenderRepository } from '@Repository/User/UserGenderRepository';

@Injectable()
export class UserGenderServiceCommand extends DefaultServiceCommand<UserGenderRepository> {}
