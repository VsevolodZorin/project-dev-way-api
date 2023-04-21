import { UserType } from 'src/resources/user/types/user.types';

export interface IUserResponse {
  user: UserType;
  accessToken: string;
}
