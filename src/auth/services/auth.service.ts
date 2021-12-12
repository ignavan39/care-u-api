import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { JwtPayload } from '../auth.type';

@Injectable()
export class AuthService {
  private tokenExpiresIn: number;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    readonly configService: ConfigService,
  ) {
    this.tokenExpiresIn = this.configService.get<number>('jwt.expiresIn');
  }

  async createJwtToken(id: string): Promise<string> {
    const expiration = new Date();
    expiration.setTime(this.tokenExpiresIn * 1000 + expiration.getTime());

    const payload = { id, expiration } as JwtPayload;

    return this.jwtService.sign(payload);
  }

  async verifyTokenAsync(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token);
  }
  async validate(payload: JwtPayload): Promise<User> {
    return this.usersRepository.findOne(payload.id);
  }
}
