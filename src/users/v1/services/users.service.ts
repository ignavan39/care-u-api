import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { User } from 'src/users/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { SignInDto } from '../dto/sign.dto';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly repository: UsersRepository,
  ) {}

  async signUp(args: SignInDto): Promise<{ user: User; token: string }> {
    try {
      const user = await this.repository.save(
        this.repository.create({
          ...args,
        }),
      );
      const token = await this.authService.createJwtToken(user.id);
      return {
        user,
        token,
      };
    } catch {
      throw new BadRequestException(
        `user with email : ${args.email} already exsist`,
      );
    }
  }

  async signIn(args: SignInDto): Promise<{ user: User; token: string }> {
    const password = crypto.createHmac('sha256', args.password).digest('hex');
    const user = await this.repository.findOne({
      where: {
        password,
        email: args.email,
      },
    });
    if (!user) {
      throw new NotFoundException('user doesnt not exsist');
    }
    const token = await this.authService.createJwtToken(user.id);
    return {
      user,
      token,
    };
  }
}
