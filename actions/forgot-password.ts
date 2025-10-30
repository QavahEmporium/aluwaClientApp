"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { sendResetEmail } from "@/lib/email";
import dbConnect from "@/lib/db";
import User from "@/models/user";
import { forgotPasswordSchema, ForgotPasswordState } from "@/validations/user";

export async function forgotPassword(
  pathname: string,
  prevState: ForgotPasswordState | undefined,
  formData: FormData
) {
  const validatedFields = forgotPasswordSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, there’s a problem with your input.",
    };
  }

  const { email } = validatedFields.data;

  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    return {
      errors: { email: ["No account found with that email address."] },
    };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 15);

  user.resetToken = resetToken;
  user.resetTokenExpiry = resetTokenExpiry;
  await user.save();

  const resetLink = `${process.env.SITE_URL}/reset-password?token=${resetToken}`;
  await sendResetEmail(email, resetLink);

  redirect(pathname);
}
