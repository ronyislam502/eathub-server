import { Model, Types } from "mongoose";

export type TAddress = {
  street: string;
  city: string;
  state?: string;
  area?: string;
  postalCode?: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

export type TSeller = {
  user: Types.ObjectId;
  name: string;
  description: string;
  email: string;
  shopName: string;
  shopAddress: TAddress;
  shopLogo?: string;
  shopBanner?: string;
  phone: string;
  address: TAddress;
  isDeleted: boolean;
};

export interface SellerModel extends Model<TSeller> {
  isUserExists(email: string): Promise<TSeller | null>;
}
