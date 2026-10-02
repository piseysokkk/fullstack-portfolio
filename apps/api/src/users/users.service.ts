import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  // Runs once when the app starts: creates the admin if it doesn't exist yet
  async onApplicationBootstrap() {
    const email = this.config.get<string>('ADMIN_EMAIL')?.toLowerCase();
    const password = this.config.get<string>('ADMIN_PASSWORD');
    if (!email || !password) {
      this.logger.warn('ADMIN_EMAIL or ADMIN_PASSWORD not set — skipping admin seed');
      return;
    }

    const exists = await this.repo.findOneBy({ email });
    if (exists) return;

    const passwordHash = await bcrypt.hash(password, 12);
    await this.repo.save(this.repo.create({ email, passwordHash }));
    this.logger.log(`Admin user created: ${email}`);
  }

  findByEmailWithPassword(email: string) {
    return this.repo.findOne({
      where: { email: email.toLowerCase() },
      select: { id: true, email: true, passwordHash: true },
    });
  }

  findById(id: string) {
    return this.repo.findOneBy({ id });
  }
}