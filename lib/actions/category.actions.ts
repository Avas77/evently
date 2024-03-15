"use server";

import { CreateCategoryParams } from "@/types";
import { connectToDb } from "../database";
import Category from "../database/models/category.model";
import { handleError } from "../utils";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDb();
    const newEvent = await Category.create({
      name: categoryName,
    });
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};
