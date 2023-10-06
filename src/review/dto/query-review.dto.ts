import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ValidateIf,
  IsInt,
  IsOptional,
  MinLength,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class QueryReviewDto {
  @ApiProperty({
    type: String,
    example: '01/01/2022',
  })
  @Type(() => String)
  @IsString()
  @IsNotEmpty({
    message: 'O campo start_date deve ser informado no padrão dd/mm/yyyy',
  })
  readonly start_date?: string = '';

  @ApiProperty({
    type: String,
    example: '31/01/2022',
    description:
      'Se o start_date for preenchido o end_date deve ser preenchido também.',
  })
  @IsNotEmpty({
    message: 'O campo end_date deve ser informado no padrão dd/mm/yyyy',
  })
  @ValidateIf((o) => o.start_date != '')
  @Type(() => String)
  readonly end_date?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly organization?: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly rating_min?: number = 999;

  @ApiPropertyOptional({
    type: Number,
    description:
      'Se o rating_min for preenchido o rating_max deve ser preenchido também.',
  })
  @ValidateIf((o) => o.rating_min != 999)
  @IsNotEmpty({
    message: 'O campo rating_max deve ser informado.',
  })
  @Type(() => Number)
  readonly rating_max?: number;

  @ApiPropertyOptional()
  @IsOptional()
  readonly category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly state?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly city?: string;

  @ApiPropertyOptional()
  @MinLength(1)
  @IsOptional()
  readonly street?: string;
}
