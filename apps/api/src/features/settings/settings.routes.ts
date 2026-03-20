import { Router } from "express";
import { protect } from "../../shared/middleware/auth.middleware";
import { db } from "../../shared/db/index";
import { users } from "../../shared/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getUsageSummary } from "../../shared/services/usage.service";

const router = Router();

router.use(protect);

// Update profile
router.patch("/profile", async (req, res) => {
  try {
    const schema = z.object({
      businessName: z.string().min(2).optional(),
      phone: z.string().min(10).optional(),
      email: z.string().email().optional(),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, message: parsed.error.issues[0].message });
      return;
    }

    const [updated] = await db
      .update(users)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(users.id, req.user!.userId))
      .returning({
        id: users.id,
        email: users.email,
        businessName: users.businessName,
        phone: users.phone,
        plan: users.plan,
        isVerified: users.isVerified,
        createdAt: users.createdAt,
      });

    res.json({ success: true, message: "Profile updated", data: { user: updated } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Change password
router.patch("/password", async (req, res) => {
  try {
    const schema = z.object({
      currentPassword: z.string().min(1, "Current password is required"),
      newPassword: z.string().min(8, "New password must be at least 8 characters"),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, message: parsed.error.issues[0].message });
      return;
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, req.user!.userId))
      .limit(1);

    const isValid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
    if (!isValid) {
      res.status(400).json({ success: false, message: "Current password is incorrect" });
      return;
    }

    const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
    await db
      .update(users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(users.id, req.user!.userId));

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete account
router.delete("/account", async (req, res) => {
  try {
    const schema = z.object({
      password: z.string().min(1, "Password is required to delete account"),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, message: parsed.error.issues[0].message });
      return;
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, req.user!.userId))
      .limit(1);

    const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!isValid) {
      res.status(400).json({ success: false, message: "Incorrect password" });
      return;
    }

    await db.delete(users).where(eq(users.id, req.user!.userId));

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get usage summary
router.get("/usage", async (req, res) => {
  try {
    const [user] = await db
      .select({ plan: users.plan })
      .from(users)
      .where(eq(users.id, req.user!.userId))
      .limit(1);

    const usage = await getUsageSummary(req.user!.userId, user.plan);
    res.json({ success: true, data: { usage } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;