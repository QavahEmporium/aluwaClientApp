"use server";
import {
  LoginUserState,
  loginUserFormSchema,
  registerUserformSchema,
  RegisterUserState,
} from "@/validations/user";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import dbConnect from "@/lib/db";
import User from "@/models/user";
import { getUser } from "@/data/user";
// import { createUser, updateExistingUser } from "./user";
// import { getUser, isUserExists } from "@/data/user";

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

  const { name, email, password, contactNumber } = validatedFields.data;

  try {
    const isUserExist = await isUserExists(email);
    if (isUserExist) {
      const state: RegisterUserState = {
        errors: { email: ["User already exists"] },
      };
      return state;
    }
  } catch (error) {
    throw new Error("Error fetching user:" + error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await createUser(name, email, hashedPassword, contactNumber);
    await createSession(user.id);
  } catch (error) {
    throw new Error("Error creating user:" + error);
  }

  redirect(pathname);
}

export async function loginUser(
  pathname: string,
  prevState: LoginUserState | undefined,
  formData: FormData
) {
  const validatedFields = loginUserFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    const state: LoginUserState = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there's a mistake with your inputs.",
    };
    return state;
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await getUser({ email });
    if (!user) {
      const state: LoginUserState = {
        errors: { email: ["User does not exists"] },
      };
      return state;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const state: LoginUserState = {
        errors: { password: ["Incorrect password"] },
      };
      return state;
    }

    await createSession(user.id);
  } catch (error) {
    console.error("Error: fetching Something went Wrong:", error);
  }

  redirect(pathname);
}

export async function logoutSessionUser() {
  await deleteSession();
  redirect("/");
}

const createUser = async (
  name: string,
  email: string,
  password: string,
  contactNumber: string
) => {
  await dbConnect();

  const user = User.create({
    name,
    email,
    password,
    contactNumber,
  });

  return user;
};

const isUserExists = async (email: string) => {
  try {
    await dbConnect();
    const user = await getUser({ email });

    return !!user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
};
