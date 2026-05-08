export type FormLocation = {
  country?: string;
  region?: string;
  city?: string;
};

export interface ProfileFormData {
  name?: string;
  bio?: string;
  avatar?: string;
  location?: FormLocation;
  gender?: string;
  birthDate?: string;
  phoneNumber?: string;
  paymentOptionIds?: number[];
}
export interface ProfileOrgFormData {
  organizationName?: string;
  description?: string;
  avatar?: string;
  location?: FormLocation;
  phoneNumber?: string;
  email?: string;
  paymentOptionIds?: number[];
  moreInfo?: string;
}

export interface DeleteOrgResponse {
  code: string;
  message: string;
}
