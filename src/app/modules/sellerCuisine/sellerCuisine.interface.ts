import { Types } from "mongoose";

export type TSellerCuisine = {
  seller: Types.ObjectId;
  cuisine: Types.ObjectId;
  isDeleted: boolean;
};
