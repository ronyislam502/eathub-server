import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { SellerServices } from "./seller.service";

const allSellers = catchAsync(async (req, res) => {
  const result = await SellerServices.allSellersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sellers retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const singleSeller = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SellerServices.singleSellerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller retrieved successfully",
    data: result,
  });
});

const deleteSeller = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SellerServices.deleteSellerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller deleted successfully",
    data: result,
  });
});

const updateSeller = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SellerServices.updateSellerIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller updated successfully",
    data: result,
  });
});

export const SellerControllers = {
  allSellers,
  singleSeller,
  deleteSeller,
  updateSeller,
};
