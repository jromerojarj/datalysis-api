import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Department } from '../../department/entities/department.entity';
import { Job } from '../../job/entities/job.entity';

@Entity()
export class Employee {
  @PrimaryColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('timestamp with time zone')
  datetime: Date;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department_id: Department;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job_id: Job;
}
