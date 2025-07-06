import httpStatus from "http-status";
import QueryBuilder from "../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { Seller } from "../seller/seller.model";
import { TSellerCuisine } from "./sellerCuisine.interface";
import { SellerCuisine } from "./sellerCuisine.model";

const createSellerCuisineIntoDB = async (payload: TSellerCuisine) => {
  const alreadyExists = await SellerCuisine.findOne({
    seller: payload.seller,
    cuisine: payload.cuisine,
  });

  if (alreadyExists) {
    throw new Error("cuisine already exists for this seller");
  }

  const result = await SellerCuisine.create(payload);

  return result;
};

const allSellerCuisinesFromDB = async (query: Record<string, unknown>) => {
  const sellerCuisineQuery = new QueryBuilder(SellerCuisine.find(), query)
    .search(["seller", "cuisine"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await sellerCuisineQuery.countTotal();
  const data = await sellerCuisineQuery.modelQuery;

  return { meta, data };
};

const myCuisinesFromDB = async (
  email: string,
  query: Record<string, unknown>
) => {
  const isSeller = await Seller.find({ email });
  if (!isSeller) {
    throw new AppError(httpStatus.NOT_FOUND, "Seller not found");
  }
  const sellerCuisineQuery = new QueryBuilder(
    SellerCuisine.find({ isSeller }),
    query
  )
    .search(["cuisine"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await sellerCuisineQuery.countTotal();
  const data = await sellerCuisineQuery.modelQuery;

  return { meta, data };
};

export const SellerCuisineServices = {
  createSellerCuisineIntoDB,
  allSellerCuisinesFromDB,
  myCuisinesFromDB,
};
