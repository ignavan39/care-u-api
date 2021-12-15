import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsOptional()
  pictureUrl: string;
}
