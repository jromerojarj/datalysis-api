import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.createJob(createJobDto);
  }

  @Post('batch')
  createMany(@Body() createJobDto: CreateJobDto[]) {
    return this.jobService.createManyJobs(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobService.findAllJob();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }
}
