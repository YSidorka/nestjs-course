import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const result = await this.usersService.create(body.email, body.password);
    return result;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const result = await this.usersService.findOne({ id: parseInt(id) });
    if (!result) throw new NotFoundException('User not found');
    return result;
  }

  @Get()
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
