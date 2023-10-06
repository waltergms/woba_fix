import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PageDto, PageOptionsDto } from '../commom/dtos';
import { QueryReviewDto } from './dto/query-review.dto';

@ApiTags('Reviews')
@Controller('review')
@UseInterceptors(ClassSerializerInterceptor)
export class ReviewController {
  constructor(private readonly _reviewService: ReviewService) {}

  @Post()
  @ApiBody({ type: [CreateReviewDto] })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this._reviewService.create(createReviewDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() reviewOptionsDto: QueryReviewDto,
  ): Promise<PageDto<CreateReviewDto>> {
    return this._reviewService.findAll(pageOptionsDto, reviewOptionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this._reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this._reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this._reviewService.remove(+id);
  }
}
