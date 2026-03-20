import type { Request, Response } from "express";
import { signupSchema, loginSchema } from "./auth.schema";
import { signupService, loginService, getMeService } from "./auth.service";

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