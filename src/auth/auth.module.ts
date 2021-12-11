import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/users.repository';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './services/auth.service';
import { JWTConfigService } from './services/jwt-config.service';

PassportModule.register({ session: true });

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useClass: JWTConfigService,
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [PassportModule, JwtStrategy, AuthService],
})
export class AuthModule {}
