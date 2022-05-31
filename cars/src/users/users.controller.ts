import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from '../auth/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.id = user.id;
    return user;
  }

  @Post('/login')
  async loginUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.id = user.id;
    return user;
  }

  @Post('/logout')
  async logoutUser(@Session() session: any) {
    session.id = null;
  }

  @Get('/user')
  @UseGuards(AuthGuard)
  async getCurrentUser(@CurrentUser() user: UserEntity) {
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const result = await this.usersService.findOne({ id: parseInt(id) });
    if (!result) throw new NotFoundException('User not found');
    return result;
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAllUsers(@Query('email') email: string) {
    const result = await this.usersService.find({ email });
    return result;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const result = await this.usersService.update(parseInt(id), body);
    return result;
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const result = await this.usersService.remove(parseInt(id));
    return result;
  }
}
