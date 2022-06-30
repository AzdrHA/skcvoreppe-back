export abstract class UtilDate {
  public static getCurrentSeason = (): string => {
    const currentDate = new Date('2022-10-12');
    const startDate = new Date(`${currentDate.getFullYear() - 1}-09-01`);
    const endDate = new Date(`${currentDate.getFullYear()}-08-31`);

    if (startDate <= currentDate && currentDate <= endDate)
      return `${startDate.getFullYear()}-${endDate.getFullYear()}`;

    return `${endDate.getFullYear()}-${endDate.getFullYear() + 1}`;
  };
}
