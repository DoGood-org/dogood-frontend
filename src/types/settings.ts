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

export interface ProfileResponse {
  status: string;
  message: string;
  data: {
    name?: string;
    bio?: string;
    avatar?: string;
    location?: FormLocation;
    gender?: string;
    birthDate?: string;
    phoneNumber?: string;
    paymentOptionIds?: number[];
  };
}

export interface ProfileOrgFormData {
  name?: string;
  avatar?: string;
  location?: FormLocation;
  phoneNumber?: string;
  paymentOptionIds?: number[];
  description?: string;
  moreInfo?: string;
}

export interface ProfileOrgResponse {
  status: string;
  message: string;
  data: {
    name?: string;
    avatar?: string;
    location?: FormLocation;
    phoneNumber?: string;
    paymentOptionIds?: number[];
    description?: string;
    moreInfo?: string;
  };
}
