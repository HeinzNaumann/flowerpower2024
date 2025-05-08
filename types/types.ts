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
  confirmEmail: string;
  phone: string;
  password: string;
  acceptTOS: boolean;
  subscribeNewsletter?: boolean;
}

export type Address = {
  id: string;
  isDefault: boolean;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  type: "billing" | "shipping";
};
