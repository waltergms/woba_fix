import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '../interfaces';

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly offset: number;

  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.limit = pageOptionsDto.limit;
    this.total = itemCount;
    this.count = Math.ceil(this.total / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.count;
  }
}
