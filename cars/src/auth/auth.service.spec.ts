import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    // create fake copy
    const fakeUsersService: Partial<UsersService> = {
      create(email: string, password: string) {
        return Promise.resolve(<UserEntity>{ id: 1, email, password });
      },

      async find(options) {
        return Promise.resolve([]);
      },

      async findOne(options) {
        return Promise.resolve(undefined);

        const result = Object.assign(
          { id: 1, email: 'test@test.test', password: '' },
          options
        );
        return Promise.resolve(result as UserEntity);
      },

      async remove(id: number) {
        return Promise.resolve({} as UserEntity);
      },

      async update(id: number, options: Partial<UserEntity>) {
        const result = Object.assign(
          { id, email: 'test@test.test', password: '' },
          options
        );
        return Promise.resolve(result as UserEntity);
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should has methods', () => {
    expect(typeof service.signup).toBe('function');
    expect(typeof service.signin).toBe('function');
    expect(typeof service.setHash).toBe('function');
    expect(typeof service.isValidPassword).toBe('function');
    expect(typeof service.setSalt).toBe('function');
  });

  it('signup testing', async () => {
    const user = await service.signup('test@test.tt', '11111');

    expect(user).toBeDefined();
    expect(user.password).not.toEqual('11111');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
});
