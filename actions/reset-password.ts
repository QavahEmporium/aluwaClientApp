"use server";

import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/user";
import { redirect } from "next/navigation";
import {
  ResetPasswordState,
  resetPasswordFormSchema,
} from "@/validations/user";

export async function resetPassword(
  token: string,
  prevState: ResetPasswordState | undefined,
  formData: FormData
) {
  const validatedFields = resetPasswordFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the highlighted fields.",
    };
  }

  const { password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) {
    return {
      errors: { confirmPassword: ["Passwords do not match"] },
    };
  }

  await dbConnect();

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return { errors: { password: ["Reset link is invalid or expired."] } };
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  redirect("/login");
}
