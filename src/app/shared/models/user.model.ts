import { AuthoritiesTypes } from '../types/user-authorities.types';

export class UserModel {
  authorities: AuthoritiesTypes[] = [];
  given_name: string = '';
  groups: string[] = [];
  name: string = '';
  preferred_username: string = '';
  scope: string = '';
}
