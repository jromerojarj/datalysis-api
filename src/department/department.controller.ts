import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Post('batch')
  createMany(@Body() createDepartmentDto: CreateDepartmentDto[]) {
    return this.departmentService.createManyDepartments(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentService.findAllDepartment();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }
}
