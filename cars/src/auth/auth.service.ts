import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // if email is in use
    const user = await this.usersService.findOne({ email });
    if (user) throw new BadRequestException('Email in use');
    const hash = await this.setHash(password);

    const result = await this.usersService.create(email, hash);
    return result;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findOne({ email });
    if (!user) throw new NotFoundException('User not found');

    const flag = await this.isValidPassword(password, user.password);
    if (!flag) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async setHash(password: string, _salt?: string) {
    const salt = _salt || this.setSalt();
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return `${salt}.${hash.toString('hex')}`;
  }

  async isValidPassword(password: string, userPassword: string) {
    try {
      const [salt] = userPassword.split('.');
      const currentHash = await this.setHash(password, salt);
      return currentHash === userPassword;
    } catch (err) {
      console.log('isValidPassword:', err.message);
      return false;
    }
  }

  setSalt() {
    return randomBytes(8).toString('hex');
  }
}
