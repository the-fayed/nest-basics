import { BadRequestException, Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { IMessage } from './interfaces/messages.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepo: MessagesRepository) {}

  async create(content: CreateMessageDto): Promise<IMessage> {
    const message = await this.messagesRepo.create(content);
    if (!message)
      throw new BadRequestException('Error while creating a new message');
    return message;
  }

  async getAll(): Promise<Array<IMessage>> {
    const messages = await this.messagesRepo.getAll();
    if (!messages)
      throw new BadRequestException('Error while fetching messages');
    return messages;
  }
  async getOne(id: string): Promise<IMessage> {
    const message = await this.messagesRepo.getOne(id);
    if (!message) throw new BadRequestException('Error while fetching message');
    return message;
  }

  async updateOne(id: string, updateDto: UpdateMessageDto): Promise<IMessage> {
    const message = await this.messagesRepo.update(id, updateDto);
    if (!message)
      throw new BadRequestException('Error while updating the message');
    return message;
  }

  async deleteOne(id: string) {
    return this.messagesRepo.delete(id);
  }
}
