import { TImageFile } from "../../interface/image.interface";
import { TCuisine } from "./cuisine.interface";
import { Cuisine } from "./cuisine.model";

const createCuisineIntoDB = async (icon: TImageFile, payload: TCuisine) => {
  if (icon && icon.path) {
    payload.icon = icon.path;
  }
  const result = await Cuisine.create(payload);

  return result;
};

const allCuisinesFromDB = async () => {
  const result = await Cuisine.find();

  return result;
};

export const CuisineServices = {
  createCuisineIntoDB,
  allCuisinesFromDB,
};
