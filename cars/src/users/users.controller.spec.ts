import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './user.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeAuthService = {
      async signup(email: string, password: string) {
        return Promise.resolve(<UserEntity>{ id: 1, email, password });
      },

      async signin(email: string, password: string) {
        return Promise.resolve(<UserEntity>{ id: 1, email, password });
      }
    };

    fakeUsersService = {
      async find({ id, email }) {
        if (id)
          return Promise.resolve([
            <UserEntity>{ id, email: 'test@test@com', password: '11111' }
          ]);
        if (email)
          return Promise.resolve([
            <UserEntity>{ id: Date.now(), email, password: '11111' }
          ]);
      },

      async findOne({ id, email }) {
        if (id)
          return Promise.resolve(<UserEntity>{
            id,
            email: 'test@test@com',
            password: '11111'
          });
        if (email)
          return Promise.resolve(<UserEntity>{
            id: Date.now(),
            email,
            password: '11111'
          });
        return Promise.resolve(<UserEntity>{ id, email });
      },

      async update(id: number, options: Partial<UserEntity>) {
        return Promise.resolve(null);
      },

      async remove(id: number) {
        return Promise.resolve(null);
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: UsersService, useValue: fakeUsersService }
      ]
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should has methods', () => {
    expect(typeof usersController.createUser).toBe('function');
    expect(typeof usersController.loginUser).toBe('function');
    expect(typeof usersController.logoutUser).toBe('function');
    expect(typeof usersController.getCurrentUser).toBe('function');
    expect(typeof usersController.findUserById).toBe('function');
    expect(typeof usersController.findAllUsers).toBe('function');
    expect(typeof usersController.updateUser).toBe('function');
    expect(typeof usersController.removeUser).toBe('function');
  });

  it('GET all users by email', async () => {
    const users = await usersController.findAllUsers('test@test.tt');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test@test.tt');
  });

  it('GET user by id', async () => {
    const user = await usersController.findUserById('111');
    expect(user).toBeDefined();
    expect(user.id).toEqual(111);
  });

  it('signIn', async () => {
    const session = { id: null };
    const user = await usersController.loginUser(
      { email: '', password: '' },
      session
    );
    expect(user).toBeDefined();
    expect(session.id).toEqual(user.id);
  });
});
