import { Department } from '../department/entities/department.entity';
import { Employee } from './entities/employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Job } from '../job/entities/job.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Job, Department])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
