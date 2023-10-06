import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { UpdateReviewDto } from './dto/update-review.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const reviewArray: Review[] = [
  {
    id: 1,
    time_gmt: new Date('2021/12/03 2:10:00'),
    phone: 12562343500,
    organization: 'the stations best',
    olf: '',
    rating: 4,
    numberreview: 4,
    category: 'delivery',
    country: 'usa',
    countrycode: 'us',
    state: 'al',
    city: 'alexander city',
    street: 'jefferson',
    building: '977',
  },
  {
    id: 2,
    time_gmt: new Date('2021/12/03 2:10:00'),
    phone: 12566758004,
    organization: 'pizza hut',
    olf: '',
    rating: 3,
    numberreview: 6,
    category: 'delivery',
    country: 'usa',
    countrycode: 'us',
    state: 'al',
    city: 'alexander city',
    street: '4581 hwy',
    building: '4581',
  },
];

const updateReview: UpdateReviewDto = {
  id: 1,
  time_gmt: new Date('2021/12/03 2:10:00'),
  phone: 12562343500,
  organization: 'the stations best',
  olf: '',
  rating: 4,
  numberreview: 4,
  category: 'delivery',
  country: 'usa',
  countrycode: 'us',
  state: 'al',
  city: 'alexander city',
  street: 'jefferson',
  building: '977',
};

const pagingOptions = {
  page: 1,
  limit: 10,
  offset: 0,
  skip: 0,
  offsetStart: 0,
};

const reviewOptions = {
  start_date: new Date('2021/12/01 00:00:00').toString(),
  end_date: new Date('2021/12/31 23:59:59').toString(),
};

describe('ReviewController', () => {
  let controller: ReviewController;
  let reviewRepository: MockRepository<Review>;

  beforeEach(async () => {
    const mockRepository = () => ({
      createQueryBuilder: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnThis(),
        useIndex: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        getRawAndEntities: jest
          .fn()
          .mockResolvedValue({ entities: reviewArray }),
        getCount: jest.fn().mockResolvedValue(2),
      }),
      findOneBy: jest.fn().mockResolvedValue(reviewArray[0]),
      update: jest.fn().mockResolvedValue(reviewArray[0]),
      delete: jest.fn().mockResolvedValue(true),
      save: jest.fn().mockResolvedValue(reviewArray[0]),
    });
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    reviewRepository = module.get<MockRepository<Review>>(
      getRepositoryToken(Review),
    );
  });

  describe('create()', () => {
    it('should create one review', async () => {
      const result = await controller.create(reviewArray[0]);
      expect(result).toEqual(reviewArray[0]);
    });
  });

  describe('Get', () => {
    it('should findAll by query parameters', async () => {
      const result = await controller.findAll(pagingOptions, reviewOptions);
      expect(reviewRepository.createQueryBuilder().getCount).toHaveBeenCalled();
      expect(
        reviewRepository.createQueryBuilder().getRawAndEntities,
      ).toHaveBeenCalled();
      expect(result.meta.count).toBe(1);
      expect(result.meta.limit).toBe(10);
      expect(result.meta.page).toBe(1);
      expect(result.meta.total).toBe(2);
      expect(result.data).toEqual(reviewArray);
    });

    it('should get one review by id "1"', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(reviewArray[0]);
    });
  });

  describe('update()', () => {
    it('should successfully update review', async () => {
      const result = await controller.update(1, updateReview);
      expect(result).toEqual(reviewArray[0]);
      expect(reviewRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('delete()', () => {
    it('should successfully delete review', async () => {
      const result = await controller.remove(1);
      expect(result).toEqual(true);
      expect(reviewRepository.delete).toHaveBeenCalled();
    });
  });
});
