import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  readonly offset?: number;

  @IsOptional()
  @IsPositive()
  readonly limit?: number;
}
