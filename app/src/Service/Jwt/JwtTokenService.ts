import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';

@Injectable()
export class JwtTokenService {
  private jwtService: JwtService;

  public constructor(jwtService: JwtService) {
    this.jwtService = jwtService;
  }

  public sign(payload: { email: string }, options?: JwtSignOptions) {
    return this.jwtService.sign(payload, options);
  }
}
