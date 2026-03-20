import { Router } from "express";
import { protect } from "../../shared/middleware/auth.middleware";
import { db } from "../../shared/db/index";
import { messages, debtors } from "../../shared/db/schema";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.use(protect);

router.get("/", async (req, res) => {
  try {
    const result = await db
      .select({
        id: messages.id,
        channel: messages.channel,
        status: messages.status,
        body: messages.body,
        sentAt: messages.sentAt,
        debtor: {
          id: debtors.id,
          name: debtors.name,
          phone: debtors.phone,
        },
      })
      .from(messages)
      .innerJoin(debtors, eq(messages.debtorId, debtors.id))
      .where(eq(messages.userId, req.user!.userId))
      .orderBy(desc(messages.sentAt));

    res.json({ success: true, data: { messages: result } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;