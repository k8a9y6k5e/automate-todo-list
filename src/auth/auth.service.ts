import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(informations: IPayload) {
    return this.jwtService.sign(informations);
  }
}
