import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Department } from './department/entities/department.entity';
import { DepartmentModule } from './department/department.module';
import { Employee } from './employee/entities/employee.entity';
import { EmployeeModule } from './employee/employee.module';
import { Job } from './job/entities/job.entity';
import { JobModule } from './job/job.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB.HOST'),
        port: configService.get<number>('DB.PORT'),
        username: configService.get<string>('DB.USERNAME'),
        password: configService.get<string>('DB.PASSWORD'),
        database: configService.get<string>('DB.NAME'),
        entities: [Employee, Job, Department],
        synchronize: true,
        logging: true,
        ssl: {
          rejectUnauthorized: false,
        },
        extra: {
          sslmode: 'require',
        },
      }),
    }),
    EmployeeModule,
    JobModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
