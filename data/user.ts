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
  const user = (await User.findById(
    userId,
    "name username contactNumber"
  )) as any;
  if (!user) return null;
  
  const { name, username, contactNumber } = user;
  return { name, username, contactNumber };
});

export const isUserExists = async (userDetail: any) => {
  try {
    await dbConnect();
    const user = await getUser(userDetail);

    return !!user;
  } catch (error) {
    return null;
  }
};
