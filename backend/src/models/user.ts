import { Exclude } from 'class-transformer';
import { Users } from '@prisma/client';

export class UserEntity implements Users {
  user_id: number;
  role_id: number;
  name: string;
  surname: string;
  email: string;
  created_on: Date;

  @Exclude()
  password: string;

  constructor(partial: Users) {
    this.user_id = partial.user_id;
    this.role_id = partial.role_id;
    this.name = partial.name;
    this.surname = partial.surname;
    this.email = partial.email;
    this.password = partial.password;
    this.created_on = partial.created_on;
  }
}