import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiProperty({
    description: 'The Id of the review',
    example: 1,
    type: Number,
  })
  id: number;
}
