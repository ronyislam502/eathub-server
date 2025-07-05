import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { CuisineServices } from "./cuisne.service";
import { TImageFile } from "../../interface/image.interface";

const createCuisine = catchAsync(async (req, res) => {
  const result = await CuisineServices.createCuisineIntoDB(
    req.file as TImageFile,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cuisine created successfully",
    data: result,
  });
});

const allCuisines = catchAsync(async (req, res) => {
  const result = await CuisineServices.allCuisinesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cuisines retrieved successfully",
    data: result,
  });
});

export const CuisineControllers = {
  createCuisine,
  allCuisines,
};
