// src/definitions/IPayment.ts
export type IPayment = {
  orderId: string;
  paymentMethod: "card" | "cod" | "bank_transfer" | "wallet";
  paymentStatus: "pending" | "authorized" | "paid" | "failed" | "refunded";
  transactionId?: string;
  amount: number;
  provider?: string; // Stripe, Paystack, etc.
};
