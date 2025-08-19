"server-only";

import { CLIENT, CREDENTIALS } from "@/constants/user";
import { getUser } from "@/data/user";
import dbConnect from "@/lib/db";
import User from "@/models/user";

export const createUser = async (
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

export const isUserExists = async (email: string) => {
  try {
    await dbConnect();
    const user = await getUser({ email });

    return !!user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
};
