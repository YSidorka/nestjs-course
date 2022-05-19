import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    let result = await this.usersService.create(body.email, body.password);
    console.log(result);
    return result;
  }

  @Post('')
  finduser() {}

  @Get()
  findAllUsers() {}
}
