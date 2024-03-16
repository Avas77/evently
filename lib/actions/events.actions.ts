import { CreateEventParams } from "@/types";
import Event from "../database/models/event.model";
import { connectToDb } from "../database";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";

export const CreateEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDb();
    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");
    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};
