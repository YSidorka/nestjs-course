import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { Repository } from './repository.interface';

@Injectable()
export class MessagesService {
  messagesRepo: Repository;

  constructor(private repo: MessagesRepository) {
    this.messagesRepo = repo;
  }

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
