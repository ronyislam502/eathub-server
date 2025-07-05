import httpStatus from "http-status";
import QueryBuilder from "../../builder/queryBuilder";
import { USER_ROLE, UserSearchableFields } from "./user.const";
import { User } from "./user.model";
import { TAdmin } from "../admin/admin.interface";
import { TImageFile } from "../../interface/image.interface";
import { TUser } from "./user.interface";
import config from "../../config";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { Admin } from "../admin/admin.model";
import { TSeller } from "../seller/seller.interface";
import { Seller } from "../seller/seller.model";
import { TCustomer } from "../customer/customer.interface";
import { Customer } from "./../customer/customer.model";

const createAdminIntoDB = async (
  image: TImageFile,
  password: string,
  payload: TAdmin
) => {
  const userData: Partial<TUser> = {
    name: payload.name,
    email: payload.email,
    password: password || (config.default_password as string),
    role: USER_ROLE?.ADMIN,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (image && image.path) {
      payload.avatar = image.path;
    }

    const newUser = await User.create([userData], { session });

    if (!newUser?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createSellerIntoDB = async (password: string, payload: TSeller) => {
  const userData: Partial<TUser> = {
    name: payload.name,
    email: payload.email,
    password: password || (config.default_password as string),
    role: USER_ROLE?.SELLER,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // if (image && image.path) {
    //   payload.avatar = image.path;
    // }

    const newUser = await User.create([userData], { session });

    if (!newUser?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    payload.user = newUser[0]._id;

    const newSeller = await Seller.create([payload], { session });

    if (!newSeller.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create seller");
    }

    await session.commitTransaction();
    await session.endSession();

    return newSeller;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createCustomerIntoDB = async (password: string, payload: TCustomer) => {
  const userData: Partial<TUser> = {
    name: payload.name,
    email: payload.email,
    password: password || (config.default_password as string),
    role: USER_ROLE?.CUSTOMER,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // if (image && image.path) {
    //   payload.avatar = image.path;
    // }

    const newUser = await User.create([userData], { session });

    if (!newUser?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    payload.user = newUser[0]._id;

    const newCustomer = await Customer.create([payload], { session });

    if (!newCustomer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create customer");
    }

    await session.commitTransaction();
    await session.endSession();

    return newCustomer;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(UserSearchableFields)
    .fields()
    .paginate()
    .sort()
    .filter();

  const meta = await userQuery.countTotal();
  const data = await userQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getSingleUserFromDB = async (email: string) => {
  const user = await User.find({ email });
  return user;
};

export const UserServices = {
  createAdminIntoDB,
  createSellerIntoDB,
  createCustomerIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
