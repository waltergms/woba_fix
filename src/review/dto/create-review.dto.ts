import { ApiProperty } from '@nestjs/swagger';
export class CreateReviewDto {
  @ApiProperty({
    description: 'The date/time that the review was created',
    example: '2023-10-04 20:00:00',
    type: Date,
  })
  time_gmt: Date;

  @ApiProperty({
    description: 'The phone of the reviewer',
    example: 12566758004,
    type: Number,
  })
  phone: number;

  @ApiProperty({
    description: 'The organization reviewed',
    example: 'Pizza Hut',
    type: String,
  })
  organization: string;

  @ApiProperty({
    description: 'The OLF company type',
    example: 'INC',
    type: String,
  })
  olf: string;

  @ApiProperty({
    description: 'The rating of the review from 0 to 5',
    example: 5,
    type: Number,
  })
  rating: number;

  @ApiProperty({
    description: 'The quantity of review from that company',
    example: 153,
    type: Number,
  })
  numberreview: number;

  @ApiProperty({
    description: 'The category of the company reviewed',
    example: 'Plumbing',
    type: String,
  })
  category: string;

  @ApiProperty({
    description: 'The rating of the review from 0 to 5',
    example: 5,
    type: Number,
  })
  country: string;

  @ApiProperty({
    description: 'The code of the country where review was made',
    example: 'US',
    type: String,
  })
  countrycode: string;

  @ApiProperty({
    description: 'The state where review was made',
    example: 'AL',
    type: String,
  })
  state: string;

  @ApiProperty({
    description: 'The city where review was made',
    example: 'Oxford',
    type: String,
  })
  city: string;

  @ApiProperty({
    description: 'The street address where review was made',
    example: '1203 Dr Martin Luther King Jr',
    type: String,
  })
  street: string;

  @ApiProperty({
    description: 'The building where review was made',
    example: '1203 A',
    type: String,
  })
  building: string;
}
