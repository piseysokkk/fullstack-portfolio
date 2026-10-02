import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage) private readonly repo: Repository<ContactMessage>,
  ) {}

  async create(dto: CreateContactDto) {
    // Bot filled the honeypot: pretend it worked, but save nothing
    if (dto.website) return { sent: true };

    const { website, ...data } = dto;
    await this.repo.save(this.repo.create(data));
    return { sent: true };
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async markRead(id: string) {
    const msg = await this.repo.findOneBy({ id });
    if (!msg) throw new NotFoundException('Message not found');
    msg.isRead = true;
    return this.repo.save(msg);
  }

  async remove(id: string) {
    const msg = await this.repo.findOneBy({ id });
    if (!msg) throw new NotFoundException('Message not found');
    await this.repo.remove(msg);
    return { deleted: true };
  }
}