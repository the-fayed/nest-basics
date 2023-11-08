import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';

describe('Messages', () => {
  let provider: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesService],
    }).compile();

    provider = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
