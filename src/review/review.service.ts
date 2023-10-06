import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto, PageDto, PageOptionsDto } from '../commom/dtos';
import { QueryReviewDto } from './dto/query-review.dto';
import reviewWhereMapper from './mapper/review.mapper';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly _reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    return await this._reviewRepository.save(createReviewDto);
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    reviewOptionsDto: QueryReviewDto,
  ): Promise<PageDto<CreateReviewDto>> {
    const queryBuilder = this._reviewRepository.createQueryBuilder('review');

    const whereReview = await reviewWhereMapper(reviewOptionsDto);

    queryBuilder
      .where(whereReview)
      .useIndex('IDX_TIME_GMT')
      .orderBy('review.id', pageOptionsDto.order)
      .offset(pageOptionsDto.offsetStart)
      .limit(pageOptionsDto.limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<Review> {
    return await this._reviewRepository.findOneBy({ id });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    await this._reviewRepository.update(id, updateReviewDto);
    return await this._reviewRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<boolean> {
    return await this._reviewRepository.delete(id).then(() => true);
  }
}
