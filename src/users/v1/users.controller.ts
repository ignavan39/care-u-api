import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/sign.dto';
import { UsersService } from './services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/sign-in')
  signIn(@Body() body: SignInDto) {
    return this.usersService.signIn(body);
  }

  @Post('/sign-up')
  signUp(@Body() body: SignInDto) {
    return this.usersService.signUp(body);
  }
}
