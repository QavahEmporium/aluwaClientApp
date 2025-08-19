"use server";
import { redirect } from "next/navigation";
import { checkoutFormSchema } from "@/validations/address";
import { createOrder } from "@/services/order"; // your DB logic

export type CheckoutState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createOrderAction(
  pathname: string,
  cart: any[],
  prevState: CheckoutState | undefined,
  formData: FormData
) {
  // ✅ Validate input with zod schema
  const validatedFields = checkoutFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: CheckoutState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, please check your shipping details.",
    };
    return state;
  }

  const { name, email, address, city, postalCode, country } =
    validatedFields.data;

  try {
    if (!cart || cart.length === 0) {
      return {
        errors: { global: ["Your cart is empty"] },
      };
    }

    // 🔹 create order
    await createOrder(
      { name, email, address, city, postalCode, country },
      cart
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      errors: { global: ["Something went wrong while placing the order."] },
    };
  }

  // ✅ redirect to order success page
  redirect(pathname);
}
