import { User } from 'src/users/users.entity';

export type AuthUser = {
  user: User;
  token: string;
};

export interface JwtPayload {
  id: string;
  expiration: Date;
}
