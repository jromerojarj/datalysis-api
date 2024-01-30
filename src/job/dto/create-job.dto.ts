import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateJobDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  job: string;
}
