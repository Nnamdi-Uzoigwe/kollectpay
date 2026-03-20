import { z } from "zod";

export const createDebtorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  amount: z.number().positive("Amount must be greater than 0"),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Enter a valid due date",
  }),
  notes: z.string().optional(),
});

export const updateDebtorSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  amount: z.number().positive().optional(),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["PENDING", "OVERDUE", "PAID"]).optional(),
});

export type CreateDebtorInput = z.infer<typeof createDebtorSchema>;
export type UpdateDebtorInput = z.infer<typeof updateDebtorSchema>;