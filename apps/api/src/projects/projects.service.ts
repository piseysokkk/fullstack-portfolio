import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private readonly repo: Repository<Project>,
  ) {}

  async create(dto: CreateProjectDto) {
    const exists = await this.repo.findOneBy({ slug: dto.slug });
    if (exists) throw new ConflictException('Slug already in use');
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find({ order: { sortOrder: 'ASC', createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const project = await this.repo.findOneBy({ id });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async findBySlug(slug: string) {
    const project = await this.repo.findOneBy({ slug });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(id: string, dto: UpdateProjectDto) {
    if (dto.slug) {
      const existing = await this.repo.findOneBy({ slug: dto.slug });
      if (existing && existing.id !== id) {
        throw new ConflictException('Slug already in use');
      }
    }

    const project = await this.repo.preload({ id, ...dto });
    if (!project) throw new NotFoundException('Project not found');
    return this.repo.save(project);
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    await this.repo.remove(project);
    return { deleted: true };
  }
}