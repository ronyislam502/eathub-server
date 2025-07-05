import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { sellerSearchableFields } from "./seller.const";
import { Seller } from "./seller.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const allSellersFromDB = async (query: Record<string, unknown>) => {
  const sellerQuery = new QueryBuilder(Seller.find(), query)
    .search(sellerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await sellerQuery.countTotal();
  const data = await sellerQuery.modelQuery;

  return { meta, data };
};

const singleSellerFromDB = async (id: string) => {
  const result = await Seller.findById(id);

  return result;
};

const deleteSellerFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    const deletedSeller = await Seller.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedSeller) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete seller");
    }

    const userId = deletedSeller.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedSeller;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const SellerServices = {
  allSellersFromDB,
  singleSellerFromDB,
  deleteSellerFromDB,
};
