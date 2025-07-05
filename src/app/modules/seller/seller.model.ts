import { model, Schema } from "mongoose";
import { SellerModel, TAddress, TSeller } from "./seller.interface";

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  area: {
    type: String,
    trim: true,
  },
  postalCode: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  coordinates: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

const sellerSchema = new Schema<TSeller, SellerModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      //validate email
      match: [
        /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    shopName: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    shopLogo: {
      type: String,
      default: "",
    },
    shopBanner: {
      type: String,
      default: "",
    },
    address: {
      type: addressSchema,
      required: [true, "address is required"],
    },
    shopAddress: {
      type: addressSchema,
      required: [true, "shopAddress is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
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

sellerSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

sellerSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

sellerSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

sellerSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Seller.findOne({ email });

  return existingUser;
};

export const Seller = model<TSeller, SellerModel>("Seller", sellerSchema);
