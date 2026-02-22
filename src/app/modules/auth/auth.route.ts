import { Router } from "express";
import { AuthControllers } from "./auth.controler";

const router = Router()

router.post("/login", AuthControllers.credentialsLogin)
router.post("/refresh-token", AuthControllers.getNewAccessToken)

export const AuthRoutes = router;