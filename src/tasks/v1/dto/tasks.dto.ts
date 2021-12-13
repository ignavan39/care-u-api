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

export class GetTasksByDateDto {
  @IsISO8601()
  date: string;
}
