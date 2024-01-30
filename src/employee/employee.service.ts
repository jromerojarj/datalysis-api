import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Injectable } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../job/entities/job.entity';
import { Department } from '../department/entities/department.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const employee = new Employee();
    employee.id = createEmployeeDto.id;
    employee.name = createEmployeeDto.name;
    employee.datetime = new Date(createEmployeeDto.datetime);

    try {
      const job = await this.jobRepository.findOne({
        where: { id: createEmployeeDto.job_id },
      });
      const department = await this.departmentRepository.findOne({
        where: { id: createEmployeeDto.department_id },
      });

      if (!job || !department) {
        throw new Error('Job o Department no encontrado.');
      }

      employee.job_id = job;
      employee.department_id = department;

      return await this.employeeRepository.save(employee);
    } catch (error) {
      throw error;
    }
  }

  async createManyEmployees(
    createEmployeeDtos: CreateEmployeeDto[],
  ): Promise<Employee[]> {
    const jobs = await this.jobRepository.find({
      where: { id: In(createEmployeeDtos.map((dto) => dto.job_id)) },
    });
    const departments = await this.departmentRepository.find({
      where: { id: In(createEmployeeDtos.map((dto) => dto.department_id)) },
    });

    const employees = createEmployeeDtos.map((dto) => {
      const employee = new Employee();
      employee.id = dto.id;
      employee.name = dto.name;
      employee.datetime = new Date(dto.datetime);
      employee.job_id = jobs.find((job) => job.id === dto.job_id);
      employee.department_id = departments.find(
        (department) => department.id === dto.department_id,
      );

      if (!employee.job_id || !employee.department_id) {
        throw new Error(
          'Job o Department no encontrado para uno de los empleados.',
        );
      }

      return employee;
    });

    return this.employeeRepository.save(employees);
  }

  findAllEmployee(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  viewEmployee(id: number): Promise<Employee> {
    return this.employeeRepository.findOneBy({ id });
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }
}
