import type { Request, Response } from "express";
import {
  createDebtorSchema,
  updateDebtorSchema,
} from "./debtors.schema";
import {
  getDebtorsService,
  createDebtorService,
  updateDebtorService,
  markPaidService,
  deleteDebtorService,
} from "./debtors.service";

interface DebtorParams {
  id: string;
}

export const getDebtors = async (req: Request, res: Response) => {
  try {
    const debtors = await getDebtorsService(req.user!.userId);
    res.status(200).json({ success: true, data: { debtors } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createDebtor = async (req: Request, res: Response) => {
  try {
    const parsed = createDebtorSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: parsed.error.issues[0].message,
      });
      return;
    }

    const debtor = await createDebtorService(req.user!.userId, parsed.data);
    res.status(201).json({
      success: true,
      message: "Debtor added successfully",
      data: { debtor },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDebtor = async (req: Request<DebtorParams>, res: Response) => {
  try {
    const parsed = updateDebtorSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: parsed.error.issues[0].message,
      });
      return;
    }

    const debtor = await updateDebtorService(
      req.user!.userId,
      req.params.id,
      parsed.data
    );
    res.status(200).json({
      success: true,
      message: "Debtor updated successfully",
      data: { debtor },
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const markPaid = async (req: Request<DebtorParams>, res: Response) => {
  try {
    const debtor = await markPaidService(req.user!.userId, req.params.id);
    res.status(200).json({
      success: true,
      message: "Debtor marked as paid",
      data: { debtor },
    });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const deleteDebtor = async (req: Request<DebtorParams>, res: Response) => {
  try {
    const result = await deleteDebtorService(req.user!.userId, req.params.id);
    res.status(200).json({ success: true, message: result.message });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};