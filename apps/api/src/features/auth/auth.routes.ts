import { Router } from "express";
import { signup, login, getMe } from "./auth.controller";
import { protect } from "../../shared/middleware/auth.middleware";
import { forgotPassword, resetPassword } from "./auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;