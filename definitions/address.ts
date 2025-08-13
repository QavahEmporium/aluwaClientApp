// src/definitions/IAddress.ts
export type IAddress = {
  userId: string; // ObjectId as string
  fullName: string;
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  isDefault?: boolean;
  type?: "shipping" | "billing";
};
