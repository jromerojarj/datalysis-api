import { CreateJobDto } from './dto/create-job.dto';
import { Injectable } from '@nestjs/common';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}
  createJob(createJobDto: CreateJobDto): Promise<Job> {
    const job: Job = new Job();
    job.id = createJobDto.id;
    job.job = createJobDto.job;

    return this.jobRepository.save(job);
  }

  createManyJobs(createJobDtos: CreateJobDto[]): Promise<Job[]> {
    const jobs = createJobDtos.map((dto) => this.jobRepository.create(dto));
    return this.jobRepository.save(jobs);
  }

  findAllJob(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  viewJob(id: number): Promise<Job> {
    return this.jobRepository.findOneBy({ id });
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }
}
