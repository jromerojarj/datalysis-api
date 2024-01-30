import { IsISO8601, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsISO8601()
  @IsNotEmpty()
  datetime: string;

  @IsInt()
  @IsNotEmpty()
  department_id: number;

  @IsInt()
  @IsNotEmpty()
  job_id: number;
}
