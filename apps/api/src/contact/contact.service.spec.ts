import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ContactMessage } from './entities/contact.entity';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  const repo = {
    create: jest.fn((dto) => dto),
    save: jest.fn((entity) => Promise.resolve(entity)),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        ContactService,
        { provide: getRepositoryToken(ContactMessage), useValue: repo },
      ],
    }).compile();
    service = moduleRef.get(ContactService);
  });

  const message = { name: 'Visitor', email: 'v@test.com', message: 'Hello from a test!' };

  it('saves a real message', async () => {
    await expect(service.create(message)).resolves.toEqual({ sent: true });
    expect(repo.save).toHaveBeenCalled();
  });

  it('silently ignores bots that fill the honeypot', async () => {
    await expect(service.create({ ...message, website: 'spam.com' })).resolves.toEqual({ sent: true });
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('does not store the honeypot field', async () => {
    await service.create({ ...message, website: '' });
    expect(repo.create).toHaveBeenCalledWith(message);
  });
});