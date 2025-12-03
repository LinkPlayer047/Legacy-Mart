import User from "@/models/user";
import connectToDB from "./db";
import { getUserFromToken } from "./auth";

export { getUserFromToken };

export async function updateUserInDB(userId, data) {
  await connectToDB();
  
  const updated = await User.findByIdAndUpdate(
    userId,
    { $set: data },
    { new: true }
  );

  return updated;
}
