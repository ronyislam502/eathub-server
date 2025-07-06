import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { SellerCuisineServices } from "./sellerCuisine.service";

const createSellerCuisine = catchAsync(async (req, res) => {
  const result = await SellerCuisineServices.createSellerCuisineIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller cuisine added successfully",
    data: result,
  });
});

const allSellerCuisines = catchAsync(async (req, res) => {
  const result = await SellerCuisineServices.allSellerCuisinesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller cuisines retrieved successfully",
    data: result,
  });
});

const myCuisines = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await SellerCuisineServices.myCuisinesFromDB(email, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "my cuisines retrieved successfully",
    data: result,
  });
});

export const SellerCuisineControllers = {
  createSellerCuisine,
  allSellerCuisines,
  myCuisines,
};
