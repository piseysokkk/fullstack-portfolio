import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum SkillCategory {
  FRONTEND = 'frontend',
  MOBILE = 'mobile',
  BACKEND = 'backend',
  TOOLS = 'tools',
}

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: SkillCategory })
  category: SkillCategory;

  @Column({ type: 'varchar', nullable: true })
  icon: string | null; // e.g. "react", used by the frontend to pick an icon

  @Column({ default: 0 })
  sortOrder: number;
}