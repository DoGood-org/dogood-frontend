export const enum TaskCategoryEnum {
  Nature = 'nature',
  Animal = 'animal',
  Food = 'food',
  Medicine = 'medicine',
  Donation = 'donation',
}

export type UploadResultInfo = {
  secure_url?: string;
  public_id?: string;
};
