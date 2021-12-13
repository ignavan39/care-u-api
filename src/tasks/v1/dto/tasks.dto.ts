import {
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsISO8601()
  date: string;

  @IsISO8601()
  @IsOptional()
  dateEnd: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;
}

export class GetManyTasksDto {
  @IsNotEmpty()
  @IsISO8601()
  from: string;

  @IsOptional()
  @IsISO8601()
  to?: string;
}
