import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { Repository } from './repository.interface';

@Injectable()
export class MessagesRepository implements Repository {
  async findOne(id: string) {
    const contents = await readFile('./data/messages.json', 'utf8');
    const messages = JSON.parse(contents);
    const result = messages.find((item) => item.id === id);

    console.log(result);
    return result;
  }

  async findAll() {
    const contents = await readFile('./data/messages.json', 'utf8');
    const messages = JSON.parse(contents);

    console.log(messages);
    return messages;
  }

  async create(content: string) {
    const contents = await readFile('./data/messages.json', 'utf8');
    const messages = JSON.parse(contents);
    const id = `${Math.floor(Math.random() * 1e3)}`;

    messages.push({ id, content });
    await writeFile('./data/messages.json', JSON.stringify(messages));

    console.log(messages[id]);
  }
}
