import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { UserServices } from "./user.service";
import { TImageFile } from "../../interface/image.interface";

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  const result = await UserServices.createAdminIntoDB(
    req.file as TImageFile,
    password,
    admin
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created successfully",
    data: result,
  });
});

const createSeller = catchAsync(async (req, res) => {
  const { password, seller } = req.body;
  const result = await UserServices.createSellerIntoDB(password, seller);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seller Created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    meta: users.meta,
    data: users.data,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await UserServices.getSingleUserFromDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved Successfully",
    data: result,
  });
});

// const updateUser = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await UserServices.updateUserIntoDB(
//     id,
//     req.file as TImageFile,
//     req.body
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User update Successfully",
//     data: result,
//   });
// });

export const UserControllers = {
  createAdmin,
  createSeller,
  getAllUsers,
  getSingleUser,
};
