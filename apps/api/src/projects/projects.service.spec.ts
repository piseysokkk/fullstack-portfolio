import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  const repo = {
    findOneBy: jest.fn(),
    create: jest.fn((dto) => dto),
    save: jest.fn((entity) => Promise.resolve({ id: 'p1', ...entity })),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: getRepositoryToken(Project), useValue: repo },
      ],
    }).compile();
    service = moduleRef.get(ProjectsService);
  });

  const dto = { title: 'Test', slug: 'test', summary: 'A test project', techStack: ['NestJS'] };

  it('creates a project when the slug is free', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.create(dto)).resolves.toMatchObject({ id: 'p1', slug: 'test' });
  });

  it('throws ConflictException when the slug is taken', async () => {
    repo.findOneBy.mockResolvedValue({ id: 'existing', slug: 'test' });
    await expect(service.create(dto)).rejects.toThrow(ConflictException);
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('throws NotFoundException for a missing project', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.findOne('missing-id')).rejects.toThrow(NotFoundException);
  });
});