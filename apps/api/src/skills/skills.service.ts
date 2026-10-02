import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(@InjectRepository(Skill) private readonly repo: Repository<Skill>) {}

  create(dto: CreateSkillDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find({ order: { category: 'ASC', sortOrder: 'ASC' } });
  }

  async findOne(id: string) {
    const skill = await this.repo.findOneBy({ id });
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  async update(id: string, dto: UpdateSkillDto) {
    const skill = await this.repo.preload({ id, ...dto });
    if (!skill) throw new NotFoundException('Skill not found');
    return this.repo.save(skill);
  }

  async remove(id: string) {
    await this.repo.remove(await this.findOne(id));
    return { deleted: true };
  }
}