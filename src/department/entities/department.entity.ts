import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Department {
  @PrimaryColumn()
  id: number;

  @Column({ length: 100 })
  department: string;
}
