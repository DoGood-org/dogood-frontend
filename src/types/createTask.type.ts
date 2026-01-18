export type BasicInfoFormValues = {
  title: string;
  location: string;
  startDate: Date;
  finishDate: Date;
  time: string;
  picture: string;
};

export type UploadResultInfo = {
  secure_url?: string;
  public_id?: string;
};
