export class UtilsHelper {
  formatDateReview(dateOrigin: string): Date {
    const dateReview = dateOrigin.split(' ')[0].split('/');
    const hourReview = dateOrigin.split(' ')[1].split(':');
    const formatedDate = new Date(
      parseInt(dateReview[2]),
      parseInt(dateReview[1]) - 1,
      parseInt(dateReview[0]),
      parseInt(hourReview[0]),
      parseInt(hourReview[1]),
    );
    return formatedDate;
  }

  formatDateForBetween(dateStart: string, dateEnd: string): any {
    const intYearStart = parseInt(dateStart.split('/')[2]);
    const intMonthStart = parseInt(dateStart.split('/')[1]) - 1;
    const intDayStart = parseInt(dateStart.split('/')[0]);

    const intYearEnd = parseInt(dateEnd.split('/')[2]);
    const intMonthEnd = parseInt(dateEnd.split('/')[1]) - 1;
    const intDayEnd = parseInt(dateEnd.split('/')[0]);

    const startDate = new Date(
      intYearStart,
      intMonthStart,
      intDayStart,
      0,
      0,
      0,
    );
    const endDate = new Date(
      intYearEnd,
      intMonthEnd,
      intDayEnd,
      23,
      59,
      59,
      59,
    );

    return { startDate, endDate };
  }
}
