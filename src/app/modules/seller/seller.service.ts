import mongoose, { FilterQuery, startSession } from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { sellerSearchableFields } from "./seller.const";
import { Seller } from "./seller.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TSeller } from "./seller.interface";
import { geocodeAddress } from "../../utilities/locationTrack";
import { TUser } from "../user/user.interface";

const allSellersFromDB = async (query: Record<string, unknown>) => {
  let coords = null;

  // Priority 1: Use lat/lon if provided
  if (query?.lat && query?.lon) {
    coords = {
      lat: Number(query.lat),
      lon: Number(query.lon),
    };
  }
  // Priority 2: Use address if no lat/lon
  else if (query.address) {
    coords = await geocodeAddress(query.address as string);
  }
  // Base filter or geo filter
  let geoFilter: FilterQuery<typeof Seller> = { isDeleted: false };

  // Geo filter add if coords available
  if (coords) {
    const maxDistance = query?.maxDistance ? Number(query?.maxDistance) : 5000;

    geoFilter.shopAddress = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [coords.lon, coords.lat],
        },
        $maxDistance: maxDistance,
      },
    };
  }

  const sellerQuery = new QueryBuilder(Seller.find(geoFilter), query)
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

const updateSellerIntoDB = async (id: string, payload: Partial<TSeller>) => {
  const userData: Partial<TUser> = {
    name: payload.name,
    email: payload.email,
  };
  const session = await startSession();
  session.startTransaction();

  try {
    const { address, cuisines, ...remainingData } = payload;
    // console.log("cuisine", payload?.cuisines);

    // console.log("isSeller", isSeller);

    // console.log("address", payload?.address);

    const modifiedData: Record<string, unknown> = {
      ...remainingData,
    };

    const isSeller = await Seller.findById(id).session(session);

    if (!isSeller) {
      throw new AppError(httpStatus.NOT_FOUND, "Seller not found");
    }

    if (address && Object.keys(address).length) {
      for (const [key, value] of Object.entries(address)) {
        modifiedData[`address.${key}`] = value;
      }
    }
    // Build full address string
    const fullAddress = `${address?.street}, ${address?.city}, ${address?.state || ""}, ${address?.postalCode || ""}, ${address?.country || ""}`;

    // Get lat/lon from geocoding
    const { lat, lon } = await geocodeAddress(fullAddress);

    // Set the shopAddress field (GeoJSON Point)
    modifiedData.shopAddress = {
      type: "Point",
      coordinates: [lon, lat],
    };

    const updateUser = await User.findByIdAndUpdate(isSeller?.user, userData, {
      new: true,
      session,
      runValidators: true,
    });

    if (!updateUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update user");
    }

    const updateSeller = await Seller.findByIdAndUpdate(id, modifiedData, {
      new: true,
      session,
      runValidators: true,
    });

    await session.commitTransaction();
    await session.endSession();

    return updateSeller;
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
  updateSellerIntoDB,
};
