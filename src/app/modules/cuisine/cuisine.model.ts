import { model, Schema } from "mongoose";
import { TCuisine } from "./cuisine.interface";

const cuisineSchema = new Schema<TCuisine>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    icon: {
      type: String,
      required: [true, "icon is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Cuisine = model<TCuisine>("Cuisine", cuisineSchema);
