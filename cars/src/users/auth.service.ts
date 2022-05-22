import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(body) {
    const result = await this.usersService.create(body.email, body.password);
    return result;
  }

  async signin() {
    // TODO
    return null;
  }
}
