import { CreateReviewDto } from '../../review/dto/create-review.dto';
import { UtilsHelper } from '../../commom/helpers/utils';

const utilsHelper = new UtilsHelper();

const reviewFactory = async (value: any): Promise<CreateReviewDto> => {
  const reviewData = new CreateReviewDto();
  reviewData.time_gmt = await utilsHelper.formatDateReview(value?.Time_GMT);
  reviewData.phone = value?.Phone ? parseInt(value.Phone) : 0;
  reviewData.organization = value?.Organization || '';
  reviewData.olf = value?.OLF || '';
  reviewData.rating = value?.Rating ? parseInt(value.Rating) : 0;
  reviewData.numberreview = value?.NumberReview
    ? parseInt(value.NumberReview)
    : 0;
  reviewData.category = value?.Category || '';
  reviewData.country = value?.Country || '';
  reviewData.countrycode = value?.CountryCode || '';
  reviewData.state = value?.State || '';
  reviewData.city = value?.City || '';
  reviewData.street = value?.Street || '';
  reviewData.building = value?.Building || '';
  return reviewData;
};

export default reviewFactory;
