import { Router } from "express";
import { AuthControllers } from "./auth.controler";

const router = Router()

router.post("/login", AuthControllers.credentialsLogin)

export const AuthRoutes = router;