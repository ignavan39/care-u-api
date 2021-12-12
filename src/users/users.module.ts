import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersRepository } from './users.repository';
import { UsersService } from './v1/services/users.service';
import { UsersController } from './v1/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
