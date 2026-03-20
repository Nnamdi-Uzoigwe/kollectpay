import type { Request, Response } from "express";
import {
  initializePayment,
  verifyPayment,
  activateSubscription,
  getSubscription,
} from "./billing.service";
import { db } from "../../shared/db/index";
import { users } from "../../shared/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export const initializeTransaction = async (req: Request, res: Response) => {
  try {
    const { plan } = req.body;

    if (!["STARTER", "GROWTH", "PRO"].includes(plan)) {
      res.status(400).json({ success: false, message: "Invalid plan" });
      return;
    }

    // Get user email
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, req.user!.userId))
      .limit(1);

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const transaction = await initializePayment(
      req.user!.userId,
      user.email,
      plan
    );

    res.json({
      success: true,
      data: {
        authorizationUrl: transaction.authorization_url,
        reference: transaction.reference,
        accessCode: transaction.access_code,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyTransaction = async (req: Request, res: Response) => {
  try {
    const { reference } = req.query as { reference: string };

    if (!reference) {
      res.status(400).json({ success: false, message: "Reference is required" });
      return;
    }

    const transaction = await verifyPayment(reference);

    if (transaction.status !== "success") {
      res.status(400).json({ success: false, message: "Payment was not successful" });
      return;
    }

    const { userId, plan } = transaction.metadata;

    await activateSubscription(userId, plan, reference);

    res.json({
      success: true,
      message: "Payment verified and plan activated",
      data: { plan, reference },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCurrentSubscription = async (req: Request, res: Response) => {
  try {
    const subscription = await getSubscription(req.user!.userId);

    const [user] = await db
      .select({ plan: users.plan })
      .from(users)
      .where(eq(users.id, req.user!.userId))
      .limit(1);

    res.json({
      success: true,
      data: { subscription, currentPlan: user?.plan || "STARTER" },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      res.status(401).json({ message: "Invalid signature" });
      return;
    }

    const { event, data } = req.body;

    if (event === "charge.success") {
      const { userId, plan } = data.metadata;
      if (userId && plan) {
        await activateSubscription(userId, plan, data.reference);
        console.log(`✅ Plan ${plan} activated for user ${userId}`);
      }
    }

    res.sendStatus(200);
  } catch (error: any) {
    console.error("Webhook error:", error);
    res.sendStatus(500);
  }
};