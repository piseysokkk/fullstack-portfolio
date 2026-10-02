import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: string;

  @Column()
  company: string;

  @Column({ type: 'varchar', nullable: true })
  location: string | null;

  @Column({ type: 'date' })
  startDate: string; // "2025-01-15"

  @Column({ type: 'date', nullable: true })
  endDate: string | null; // null = "Present"

  @Column({ type: 'text' })
  description: string;

  @Column('text', { array: true, default: [] })
  techStack: string[];
}