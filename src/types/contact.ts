export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

export interface ContactResponse {
  status: string;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    message: string;
    createdAt: string;
  };
}
