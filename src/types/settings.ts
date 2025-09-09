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
