import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('api/v1/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createDto: CreateMessageDto) {
    return this.messagesService.create(createDto);
  }

  @Get()
  async getAll() {
    return this.messagesService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.messagesService.getOne(id);
  }

  @Put('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateDto: UpdateMessageDto,
  ) {
    return this.messagesService.updateOne(id, updateDto);
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string) {
    return this.messagesService.deleteOne(id);
  }
}
