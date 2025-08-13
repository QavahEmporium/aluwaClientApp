"use server";
import { registerUserformSchema, RegisterUserState } from "@/validations/user";
import { redirect } from "next/navigation";

export async function regsiterUser(
  pathname: string,
  prevState: RegisterUserState | undefined,
  formData: FormData
) {
  const validatedFields = registerUserformSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: RegisterUserState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  redirect(pathname);
}
