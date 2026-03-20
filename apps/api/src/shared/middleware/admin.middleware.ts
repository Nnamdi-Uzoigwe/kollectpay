import type { Request, Response, NextFunction } from "express";
import { db } from "../db/index";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const adminOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [user] = await db
      .select({ isAdmin: users.isAdmin })
      .from(users)
      .where(eq(users.id, req.user!.userId))
      .limit(1);

    if (!user || !user.isAdmin) {
      res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
      return;
    }

    next();
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};