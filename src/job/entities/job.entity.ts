import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryColumn()
  id: number;

  @Column({ length: 100 })
  job: string;
}
