import { QueryReviewDto } from '../dto/query-review.dto';
import { Between, Not, IsNull } from 'typeorm';
import { UtilsHelper } from '../../commom/helpers/utils';

const reviewWhereMapper = async (review: QueryReviewDto): Promise<any> => {
  const whereObj: any = {};
  const utilsHelper = new UtilsHelper();
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  whereObj.id = Not(IsNull());
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  if (review.start_date) {
    const { startDate, endDate } = utilsHelper.formatDateForBetween(
      review.start_date,
      review.end_date,
    );
    whereObj.time_gmt = Between(startDate, endDate);
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  if (review.rating_min != 999) {
    whereObj.rating = Between(review.rating_min, review.rating_max);
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  if (review.organization) {
    whereObj.organization = review.organization;
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  if (review.category) {
    whereObj.category = review.category;
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  if (review.state) {
    whereObj.state = review.state;
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  if (review.city) {
    whereObj.city = review.city;
  }
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  if (review.street) {
    whereObj.street = review.street;
  }
  return whereObj;
};

export default reviewWhereMapper;
