import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../user.entity';
import { SignInDto } from './dto/sign.dto';
import { UsersService } from './services/users.service';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'sign in' })
  @ApiBody({ type: SignInDto })
  @Post('/sign-in')
  signIn(@Body() body: SignInDto): Promise<{
    user: User;
    token: string;
  }> {
    return this.usersService.signIn(body);
  }

  @ApiOperation({ summary: 'sign up' })
  @ApiBody({ type: SignInDto })
  @Post('/sign-up')
  signUp(@Body() body: SignInDto): Promise<{
    user: User;
    token: string;
  }> {
    return this.usersService.signUp(body);
  }
}
