import { Router } from "express";
import {
  getDebtors,
  createDebtor,
  updateDebtor,
  markPaid,
  deleteDebtor,
} from "./debtors.controller";
import { protect } from "../../shared/middleware/auth.middleware";

const router = Router();

router.use(protect); // all debtor routes require auth

router.get("/", getDebtors);
router.post("/", createDebtor);
router.patch("/:id", updateDebtor);
router.patch("/:id/pay", markPaid);
router.delete("/:id", deleteDebtor);

export default router;