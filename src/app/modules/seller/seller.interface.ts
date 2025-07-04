import { Model, Types } from "mongoose";

export type TAddress = {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
};

export type TSeller = {
  user: Types.ObjectId;
  name: string;
  description: string;
  email: string;
  avatar?: string;
  banner?: string;
  phone: string;
  address: TAddress;
  isDeleted: boolean;
};

export interface SellerModel extends Model<TSeller> {
  isUserExists(email: string): Promise<TSeller | null>;
}
