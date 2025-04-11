export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  stock: number;
  type: string;
  sizes: string;
  images: string[];
  description: string;
  shortDescription: string;
  colors: string[];
  tags: string[];
  moments: string[];
  flowers: string[];
  occasions: string[];
}

export interface RegisterForm {
  name: string;
  surname: string;
  email: string;
  tlf?: string;
  password: string;
  acceptTOS: boolean;
  subscribeNewsletter: boolean;
}
