import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly offcet: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly limit: number;
}
