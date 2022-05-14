import { Controller, Get, Param, Post, Body, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  async listMessages() {
    const result = await this.messagesService.findAll();

    return result;
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const result = await this.messagesService.findOne(id);
    if (!result) throw new NotFoundException(`Message not found ${id}`);

    return result;
  }
}
