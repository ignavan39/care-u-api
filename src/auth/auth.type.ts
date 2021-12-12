import { User } from 'src/users/user.entity';

export type AuthUser = {
  user: User;
  token: string;
};

export interface JwtPayload {
  id: string;
  expiration: Date;
}
