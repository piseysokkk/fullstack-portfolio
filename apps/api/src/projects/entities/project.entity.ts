import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  summary: string;

  @Column({ type: 'text', nullable: true })
  content: string | null;

  @Column('text', { array: true, default: [] })
  techStack: string[];

  @Column({ type: 'varchar', nullable: true })
  liveUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  githubUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string | null;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}