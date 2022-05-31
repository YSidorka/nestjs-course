import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let fakeUsersService: Partial<UsersService>;

  const EMAIL = 'test@test.com';
  const PASSWORD = '11111';

  beforeEach(async () => {
    const users: UserEntity[] = [];

    // create fake copy
    fakeUsersService = {
      create(email: string, password: string) {
        const user = <UserEntity>{ id: Date.now(), email, password };
        users.push(user);
        return Promise.resolve(user);
      },

      async find({ id, email }) {
        let result;
        if (id) result = users.filter((user) => user.id === id);
        if (email) result = users.filter((user) => user.email === email);

        return Promise.resolve(result);
      },

      async findOne({ id, email }) {
        let result;
        if (id) result = users.filter((user) => user.id === id);
        if (email) result = users.filter((user) => user.email === email);
        return Promise.resolve(result[0] as UserEntity);
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        }
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', async () => {
    expect(authService).toBeDefined();
  });

  it('should has methods', () => {
    expect(typeof authService.signup).toBe('function');
    expect(typeof authService.signin).toBe('function');
    expect(typeof authService.setHash).toBe('function');
    expect(typeof authService.isValidPassword).toBe('function');
    expect(typeof authService.setSalt).toBe('function');
  });

  it('signup testing', async () => {
    const user = await authService.signup(EMAIL, PASSWORD);
    expect(user).toBeDefined();
    expect(user.password).not.toEqual(EMAIL);
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws error if user signs up with email in use', async () => {
    await authService.signup(EMAIL, PASSWORD);
    await expect(() => authService.signup(EMAIL, PASSWORD)).rejects.toThrow(
      new BadRequestException('Email in use')
    );
  });

  it('throws error: signin with unknown email', async () => {
    await expect(() => authService.signin(EMAIL, PASSWORD)).rejects.toThrow(
      new NotFoundException('User not found')
    );
  });

  it('throws error: signin with invalid password', async () => {
    await authService.signup(EMAIL, PASSWORD);
    await expect(() => authService.signin(EMAIL, '')).rejects.toThrow(
      new UnauthorizedException('Invalid password')
    );
  });

  it('signin returns user if correct credentials', async () => {
    await authService.signup(EMAIL, PASSWORD);
    const user = await authService.signin(EMAIL, PASSWORD);
    expect(user).toBeDefined();
  });
});
