import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { ReviewService } from './review.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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

describe('ReviewService', () => {
  let service: ReviewService;
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
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    reviewRepository = module.get<MockRepository<Review>>(
      getRepositoryToken(Review),
    );
  });

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

  describe('create()', () => {
    it('should successfully insert a review', () => {
      const oneReview = {
        time_gmt: new Date('2021/12/03 2:10:00'),
        phone: 12562342181,
        organization: "zaxby's chicken fingers & buffalo wings",
        olf: '',
        rating: 3,
        numberreview: 13,
        category: 'delivery',
        country: 'usa',
        countrycode: 'us',
        state: 'al',
        city: 'alexander city',
        street: '4497 highway',
        building: '4497',
      };
      expect.assertions(1);
      service
        .create(oneReview)
        .then((data) => expect(data).toEqual(reviewArray[0]));
    });
  });

  describe('findAll()', () => {
    it('Should call findAll and return data with pagination', async () => {
      const result = await service.findAll(pagingOptions, reviewOptions);

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
  });

  describe('findOne()', () => {
    it('should successfully findOne review', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(reviewArray[0]);
      expect(reviewRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should successfully update review', async () => {
      const result = await service.update(1, updateReview);
      expect(result).toEqual(reviewArray[0]);
      expect(reviewRepository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('delete()', () => {
    it('should successfully findOne review', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(true);
      expect(reviewRepository.delete).toHaveBeenCalled();
    });
  });
});
