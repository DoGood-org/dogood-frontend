export interface SettingsFormData {
  name?: string;
  bio?: string;
  avatar?: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
  gender?: string;
  birthDate?: string;
  phoneNumber?: string;
  paymentOptionIds?: number[];
}

export interface SettingsResponse {
  status: string;
  message: string;
  data: {
    name?: string;
    bio?: string;
    avatar?: string;
    location?: {
      country?: string;
      region?: string;
      city?: string;
    };
    gender?: string;
    birthDate?: string;
    phoneNumber?: string;
    paymentOptionIds?: number[];
  };
}

export interface SettingsOrgFormData {
  name?: string;
  avatar?: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
  phoneNumber?: string;
  paymentOptionIds?: number[];
  description?: string;
  moreInfo?: string;
}

export interface SettingsOrgResponse {
  status: string;
  message: string;
  data: {
    name?: string;
    avatar?: string;
    location?: {
      country?: string;
      region?: string;
      city?: string;
    };
    phoneNumber?: string;
    paymentOptionIds?: number[];
    description?: string;
    moreInfo?: string;
  };
}
