import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { SellerRoutes } from "../modules/seller/seller.route";
import { CustomerRoutes } from "../modules/customer/customer.route";
import { CuisineRoutes } from "../modules/cuisine/cuisine.route";
import { SellerCuisineRoutes } from "../modules/sellerCuisine/sellerCuisine.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/sellers",
    route: SellerRoutes,
  },
  {
    path: "/customers",
    route: CustomerRoutes,
  },
  {
    path: "/cuisines",
    route: CuisineRoutes,
  },
  {
    path: "/sellerCuisines",
    route: SellerCuisineRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
