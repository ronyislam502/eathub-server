import { model, Schema } from "mongoose";
import { TSellerCuisine } from "./sellerCuisine.interface";

const sellerCuisineSchema = new Schema<TSellerCuisine>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      required: [true, "Seller id is required"],
      unique: true,
      ref: "Seller",
    },
    cuisine: {
      type: Schema.Types.ObjectId,
      required: [true, "Cuisine id is required"],
      unique: true,
      ref: "Cuisine",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const SellerCuisine = model<TSellerCuisine>(
  "SellerCuisine",
  sellerCuisineSchema
);
