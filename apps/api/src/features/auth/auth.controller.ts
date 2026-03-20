import type { Request, Response } from "express";
import { signupSchema, loginSchema } from "./auth.schema";
import { signupService, loginService, getMeService } from "./auth.service";
import { sendPasswordResetEmail } from "../../notifications/email.service";
import crypto from "crypto";
import { db } from "../../shared/db/index";
import { users } from "../../shared/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";


export const signup = async (req: Request, res: Response) => {
  try {
    const parsed = signupSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: parsed.error.issues[0].message,
      });
      return;
    }

    const { user, token } = await signupService(parsed.data);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: { user, token },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Signup failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: parsed.error.issues[0].message,
      });
      return;
    }

    const { user, token } = await loginService(parsed.data);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user, token },
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await getMeService(req.user!.userId);

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "User not found",
    });
  }
};


export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ success: false, message: "Email is required" });
      return;
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // Always return success even if email not found — security best practice
    // Don't reveal whether an email exists in the system
    if (!user) {
      res.json({
        success: true,
        message: "If this email exists, a reset link has been sent.",
      });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save token to database
    await db
      .update(users)
      .set({ resetToken, resetTokenExpiry, updatedAt: new Date() })
      .where(eq(users.id, user.id));

    // Send email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(user.email, user.businessName, resetLink);

    res.json({
      success: true,
      message: "If this email exists, a reset link has been sent.",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({ success: false, message: "Token and new password are required" });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
      return;
    }

    // Find user with valid token
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.resetToken, token))
      .limit(1);

    if (!user || !user.resetTokenExpiry) {
      res.status(400).json({ success: false, message: "Invalid or expired reset link" });
      return;
    }

    // Check token hasn't expired
    if (new Date() > user.resetTokenExpiry) {
      res.status(400).json({ success: false, message: "Reset link has expired. Please request a new one." });
      return;
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12);

    // Update password and clear token
    await db
      .update(users)
      .set({
        passwordHash,
        resetToken: null,
        resetTokenExpiry: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    res.json({ success: true, message: "Password reset successfully. You can now log in." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};