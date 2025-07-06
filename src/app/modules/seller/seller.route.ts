import { Router } from "express";
import { SellerControllers } from "./seller.controller";

const router = Router();

router.get("/", SellerControllers.allSellers);

router.get("/single/:id", SellerControllers.singleSeller);

router.patch("/update/:id", SellerControllers.updateSeller);

router.delete("/delete/:id", SellerControllers.deleteSeller);

export const SellerRoutes = router;
