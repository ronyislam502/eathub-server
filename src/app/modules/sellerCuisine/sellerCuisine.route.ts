import { Router } from "express";
import { SellerCuisineControllers } from "./sellerCuisine.controller";

const router = Router();

router.post(
  "/create-seller-cuisine",
  SellerCuisineControllers.createSellerCuisine
);

router.get("/", SellerCuisineControllers.allSellerCuisines);

router.get("/my-cuisines/:email", SellerCuisineControllers.myCuisines);

export const SellerCuisineRoutes = router;
