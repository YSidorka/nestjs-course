import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>
  ) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findOne(options) {
    try {
      const user = await this.repo.findOne(options);
      return user;
    } catch (err) {
      return null;
    }
  }

  async find(options) {
    try {
      const users = await this.repo.find(options);
      return users;
    } catch (err) {
      return [];
    }
  }

  async update(id: number, options: Partial<UserEntity>) {
    const user = await this.findOne({ id });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, options);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne({ id });
    if (!user) throw new NotFoundException('User not found');
    return this.repo.remove(user);
  }
}
