import { Router } from "express";
import { protect } from "../../shared/middleware/auth.middleware";
import {
  initializeTransaction,
  verifyTransaction,
  getCurrentSubscription,
  handleWebhook,
} from "./billing.controller";

const router = Router();

// Webhook must be before protect middleware — Paystack calls this directly
router.post("/webhook", handleWebhook);

router.use(protect);

router.get("/subscription", getCurrentSubscription);
router.post("/initialize", initializeTransaction);
router.get("/verify", verifyTransaction);

export default router;