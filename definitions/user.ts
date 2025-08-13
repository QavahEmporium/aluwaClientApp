// src/definitions/IUser.ts
export type IUser = {
  name: string;
  email: string;
  passwordHash: string;
  role: "customer" | "admin";
  avatarUrl?: string;
};
