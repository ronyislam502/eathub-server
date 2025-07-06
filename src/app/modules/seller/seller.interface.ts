import { Model, Types } from "mongoose";

export type TCoordinates = {
  lat: number;
  lng: number;
};

export type TAddress = {
  street: string;
  city: string;
  state?: string;
  area?: string;
  postalCode?: string;
  country: string;
  coordinates?: TCoordinates;
};

export type TSeller = {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: TAddress;
  shopName: string;
  description: string;
  shopAddress?: {
    type: "Point";
    coordinates: [number, number];
  };
  shopLogo?: string;
  shopBanner?: string;
  // cuisines: Types.ObjectId[];
  isDeleted: boolean;
};

export interface SellerModel extends Model<TSeller> {
  isUserExists(email: string): Promise<TSeller | null>;
}
