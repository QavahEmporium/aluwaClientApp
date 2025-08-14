"use server";
import { verifySession } from "@/lib/dal";
import dbConnect from "@/lib/db";
import User from "@/models/user";
import { cache } from "react";

export const getUser = cache(async (userData: any) => {
  await dbConnect();
  return await User.findOne(userData);
});

export const getSessionUser = cache(async () => {
  await dbConnect();
  const session = await verifySession();
  if (!session) return null;

  const userId = session?.userId as string;
  const { name, username, contactNumber } = (await User.findById(
    userId,
    "name username contactNumber"
  )) as any;

  return { name, username, contactNumber };
});

export const isUserExists = async (username: string) => {
  try {
    await dbConnect();
    const user = await getUser({ username });

    return !!user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
};
