import { Router } from "express";
import { protect } from "../../shared/middleware/auth.middleware";
import {
  createReminderSetting,
  getReminderSetting,
  processReminders,
} from "./reminders.service";

const router = Router();

router.use(protect);

// Get reminder setting for a debtor
router.get("/:debtorId", async (req, res) => {
  try {
    const setting = await getReminderSetting(req.params.debtorId);
    res.json({ success: true, data: { setting } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create or update reminder setting for a debtor
router.post("/", async (req, res) => {
  try {
    const { debtorId, frequency, channel } = req.body;
    const setting = await createReminderSetting(
      req.user!.userId,
      debtorId,
      frequency,
      channel
    );
    res.json({ success: true, data: { setting } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Manual trigger — for testing only
router.post("/trigger", async (req, res) => {
  try {
    await processReminders();
    res.json({ success: true, message: "Reminders processed" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;