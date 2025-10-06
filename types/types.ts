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
  countryCode?: string; // Código de país para el teléfono (ej: ES, FR, etc.)
  password: string;
  acceptTOS: boolean;
  subscribeNewsletter?: boolean;
}

export interface AddressBase {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface StoredAddress extends AddressBase {
  id: string;
  isDefault: boolean;
  type: "billing" | "shipping";
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  deliveryPhone?: string;
  deliveryRecipientName?: string;
  deliveryRecipientSurname?: string;
}

export type Address = StoredAddress;

export interface CustomerContact {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface DeliveryContact {
  recipientName: string;
  recipientSurname: string;
  phone: string;
}

export interface DeliveryAddress extends AddressBase {
  id?: string;
  isDefault?: boolean;
  contact: DeliveryContact;
}

export interface BillingAddress extends AddressBase {
  id?: string;
  isDefault?: boolean;
}

export interface CheckoutMeta {
  deliveryDate: string;
  deliveryTime: string;
  cardNote?: string;
  shippingCost?: number;
  language?: string;
  orderId?: string;
}

export interface CheckoutPayload {
  customer: CustomerContact;
  delivery: DeliveryAddress;
  billing?: BillingAddress | null;
  meta: CheckoutMeta;
}

export interface CheckoutDraft extends CheckoutPayload {
  items: any[];
  userType: "registered" | "guest";
  total: number;
}

export interface CheckoutOrderPayload extends CheckoutPayload {
  items: any[];
}
