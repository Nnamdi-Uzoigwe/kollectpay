import { Router } from "express";
import { protect } from "../../shared/middleware/auth.middleware";
import { adminOnly } from "../../shared/middleware/admin.middleware";
import { db } from "../../shared/db/index";
import { users, subscriptions, messages, debtors } from "../../shared/db/schema";
import { eq, count, sum, desc } from "drizzle-orm";

const router = Router();

router.use(protect, adminOnly);

// ── Platform overview stats
router.get("/stats", async (req, res) => {
  try {
    const [totalUsers] = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.isAdmin, false));

    const [totalMessages] = await db
      .select({ count: count() })
      .from(messages);

    const [totalDebtors] = await db
      .select({ count: count() })
      .from(debtors);

    const [activeSubscriptions] = await db
      .select({ count: count() })
      .from(subscriptions)
      .where(eq(subscriptions.status, "ACTIVE"));

    // Revenue per plan
    const starterSubs = await db
      .select({ count: count() })
      .from(subscriptions)
      .where(eq(subscriptions.plan, "STARTER"));

    const growthSubs = await db
      .select({ count: count() })
      .from(subscriptions)
      .where(eq(subscriptions.plan, "GROWTH"));

    const proSubs = await db
      .select({ count: count() })
      .from(subscriptions)
      .where(eq(subscriptions.plan, "PRO"));

    const totalRevenue =
      (starterSubs[0].count * 5000) +
      (growthSubs[0].count * 12000) +
      (proSubs[0].count * 25000);

    res.json({
      success: true,
      data: {
        totalUsers: totalUsers.count,
        totalMessages: totalMessages.count,
        totalDebtors: totalDebtors.count,
        activeSubscriptions: activeSubscriptions.count,
        totalRevenue,
        planBreakdown: {
          starter: starterSubs[0].count,
          growth: growthSubs[0].count,
          pro: proSubs[0].count,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── All users
router.get("/users", async (req, res) => {
  try {
    const allUsers = await db
      .select({
        id: users.id,
        businessName: users.businessName,
        email: users.email,
        phone: users.phone,
        plan: users.plan,
        isAdmin: users.isAdmin,
        isVerified: users.isVerified,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.isAdmin, false))
      .orderBy(desc(users.createdAt));

    // Get subscription for each user
    const usersWithSubs = await Promise.all(
      allUsers.map(async (user) => {
        const [sub] = await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.userId, user.id))
          .limit(1);

        const [debtorCount] = await db
          .select({ count: count() })
          .from(debtors)
          .where(eq(debtors.userId, user.id));

        const [messageCount] = await db
          .select({ count: count() })
          .from(messages)
          .where(eq(messages.userId, user.id));

        return {
          ...user,
          subscription: sub || null,
          debtorCount: debtorCount.count,
          messageCount: messageCount.count,
        };
      })
    );

    res.json({ success: true, data: { users: usersWithSubs } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── Suspend / unsuspend user
router.patch("/users/:id/suspend", async (req, res) => {
  try {
    const { suspend } = req.body;

    const [updated] = await db
      .update(users)
      .set({ isVerified: !suspend, updatedAt: new Date() })
      .where(eq(users.id, req.params.id))
      .returning({ id: users.id, isVerified: users.isVerified });

    res.json({
      success: true,
      message: suspend ? "User suspended" : "User unsuspended",
      data: { user: updated },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── Recent messages across platform
router.get("/messages", async (req, res) => {
  try {
    const recentMessages = await db
      .select({
        id: messages.id,
        channel: messages.channel,
        status: messages.status,
        sentAt: messages.sentAt,
        user: {
          businessName: users.businessName,
          email: users.email,
        },
        debtor: {
          name: debtors.name,
          phone: debtors.phone,
        },
      })
      .from(messages)
      .innerJoin(users, eq(messages.userId, users.id))
      .innerJoin(debtors, eq(messages.debtorId, debtors.id))
      .orderBy(desc(messages.sentAt))
      .limit(50);

    res.json({ success: true, data: { messages: recentMessages } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;