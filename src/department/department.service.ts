import { CreateDepartmentDto } from './dto/create-department.dto';
import { Injectable } from '@nestjs/common';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}
  createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    const department: Department = new Department();
    department.id = createDepartmentDto.id;
    department.department = createDepartmentDto.department;

    return this.departmentRepository.save(department);
  }

  createManyDepartments(
    createDepartmentDtos: CreateDepartmentDto[],
  ): Promise<Department[]> {
    const departments = createDepartmentDtos.map((dto) =>
      this.departmentRepository.create(dto),
    );
    return this.departmentRepository.save(departments);
  }

  findAllDepartment(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  viewDepartment(id: number): Promise<Department> {
    return this.departmentRepository.findOneBy({ id });
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }
}
