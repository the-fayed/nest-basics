import { readFile, writeFile } from 'fs/promises';
import { IMessage } from './interfaces/messages.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesRepository {
  async create(content: CreateMessageDto): Promise<IMessage> {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };
    await writeFile('messages.json', JSON.stringify(messages));
    const message = messages[id] as IMessage;
    return message;
  }

  async getAll(): Promise<IMessage[]> {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents) as IMessage[];
    return messages;
  }

  async getOne(id: string): Promise<IMessage> {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    const message = messages[id] as IMessage;
    return message;
  }

  async update(id: string, updateDto: UpdateMessageDto): Promise<IMessage> {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    const message = messages[id];
    message.content = updateDto.content;
    await writeFile('messages.json', JSON.stringify(messages));
    return message as IMessage;
  }

  async delete(id: string): Promise<void> {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    if (!messages[id])
      throw new NotFoundException(`No message with the id ${id} is found`);
    delete messages[id];
  }
}
