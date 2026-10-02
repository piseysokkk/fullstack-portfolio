import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './entities/experience.entity';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience) private readonly repo: Repository<Experience>,
  ) {}

  create(dto: CreateExperienceDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find({ order: { startDate: 'DESC' } });
  }

  async findOne(id: string) {
    const exp = await this.repo.findOneBy({ id });
    if (!exp) throw new NotFoundException('Experience not found');
    return exp;
  }

  async update(id: string, dto: UpdateExperienceDto) {
    const exp = await this.repo.preload({ id, ...dto });
    if (!exp) throw new NotFoundException('Experience not found');
    return this.repo.save(exp);
  }

  async remove(id: string) {
    await this.repo.remove(await this.findOne(id));
    return { deleted: true };
  }
}