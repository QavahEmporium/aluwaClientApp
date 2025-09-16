"server-only";

import { getUser } from "@/data/user";
import { verifySession } from "@/lib/dal";
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

export const updateUser = async (
  name: string,
  email: string,
  contactNumber: string
) => {
  await dbConnect();

  const session = await verifySession();
  if (!session) return null;

  const userId = session?.userId as string;
  const user = User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
      contactNumber,
    },
    { new: true }
  );

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
