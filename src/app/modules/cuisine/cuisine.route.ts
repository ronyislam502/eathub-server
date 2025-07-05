import { Router } from "express";
import { CuisineControllers } from "./cuisine.controller";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";
import { validateRequest } from "../../middlewares/validateRequest";
import { CuisineValidations } from "./cuisine.validation";

const router = Router();

router.post(
  "/create-cuisine",
  multerUpload.single("icon"),
  parseBody,
  validateRequest(CuisineValidations.createCuisineValidationSchema),
  CuisineControllers.createCuisine
);

router.get("/", CuisineControllers.allCuisines);

export const CuisineRoutes = router;
