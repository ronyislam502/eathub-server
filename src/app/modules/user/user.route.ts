import express from "express";
import { UserControllers } from "./user.controller";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";
import { validateRequest } from "../../middlewares/validateRequest";
import { AdminValidations } from "../admin/admin.validation";
import { SellerValidations } from "../seller/seller.validation";

const router = express.Router();

router.post(
  "/create-admin",
  multerUpload.single("image"),
  parseBody,
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);

router.post(
  "/create-seller",
  // multerUpload.single("image"),
  // parseBody,
  validateRequest(SellerValidations.createSellerValidationSchema),
  UserControllers.createSeller
);

router.get("/", UserControllers.getAllUsers);

// router.get(
//   "/user/:email",
//   auth(USER_ROLE.ADMIN, USER_ROLE.USER),
//   UserControllers.getSingleUser
// );

// router.patch(
//   "/update/:id",
//   auth(USER_ROLE.ADMIN, USER_ROLE.USER),
//   multerUpload.single("avatar"),
//   parseBody,
//   validateRequest(UserValidations.updateUserValidationSchema),
//   UserControllers.updateUser
// );

export const UserRoutes = router;
