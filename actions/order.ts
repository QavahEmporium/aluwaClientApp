"use server";
import { redirect } from "next/navigation";
import { checkoutFormSchema } from "@/validations/address";
import { createOrder } from "@/services/order"; // your DB logic
import crypto from "crypto";
import { getSessionUser } from "@/data/user";

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
  let url = "";
  try {
    if (!cart || cart.length === 0) {
      return {
        errors: { global: ["Your cart is empty"] },
      };
    }

    // 🔹 create order
    /* const order = await createOrder(
      { name, email, address, city, postalCode, country },
      cart
    ); */
    /* if (order)  */
    url = await createPaymentUrl(1000.34, "Aluwa HairCare Product");
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      errors: { global: ["Something went wrong while placing the order."] },
    };
  }

  // ✅ redirect to order success page
  console.log({ url });
  redirect(url);
}

export async function createPaymentUrl(amount: number, product_name: string) {
  const user = await getSessionUser();
  // ✅ Validate input with zod schema
  const pfHost =
    process.env.PAYFAST_MODE === "sandbox"
      ? process.env.PAYFAST_SANDBOX_URL!
      : process.env.PAYFAST_LIVE_URL!;

  const data: Record<string, string> = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID!,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
    return_url: `${process.env.SITE_URL!}/${process.env.PAYFAST_RETURN_URL!}`,
    cancel_url: `${process.env.SITE_URL!}/${process.env.PAYFAST_CANCEL_URL!}`,
    notify_url: `${process.env.SITE_URL!}/${process.env.PAYFAST_NOTIFY_URL!}`,
    amount: amount.toFixed(2),
    item_name: product_name,
    email_address: user?.email,
  };

  // Build query string
  let queryString = Object.entries(data)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");

  // Generate signature if passphrase exists
  if (process.env.PAYFAST_PASSPHRASE) {
    queryString += `&passphrase=${encodeURIComponent(
      process.env.PAYFAST_PASSPHRASE
    )}`;
  }

  const signature = crypto.createHash("md5").update(queryString).digest("hex");
  return `${pfHost}/eng/process?${queryString}&signature=${signature}`;
}
