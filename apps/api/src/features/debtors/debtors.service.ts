import { db } from "../../shared/db/index";
import { debtors } from "../../shared/db/schema";
import { eq, and } from "drizzle-orm";
import type { CreateDebtorInput, UpdateDebtorInput } from "./debtors.schema";

export const getDebtorsService = async (userId: string) => {
  const result = await db
    .select()
    .from(debtors)
    .where(eq(debtors.userId, userId))
    .orderBy(debtors.createdAt);

  return result;
};

export const createDebtorService = async (
  userId: string,
  input: CreateDebtorInput
) => {
  const [debtor] = await db
    .insert(debtors)
    .values({
      ...input,
      dueDate: new Date(input.dueDate),
      userId,
    })
    .returning();

  return debtor;
};

export const updateDebtorService = async (
  userId: string,
  debtorId: string,
  input: UpdateDebtorInput
) => {
  const existing = await db
    .select()
    .from(debtors)
    .where(and(eq(debtors.id, debtorId), eq(debtors.userId, userId)))
    .limit(1);

  if (existing.length === 0) {
    throw new Error("Debtor not found");
  }

  const [updated] = await db
    .update(debtors)
    .set({
      ...input,
      dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
      updatedAt: new Date(),
    })
    .where(and(eq(debtors.id, debtorId), eq(debtors.userId, userId)))
    .returning();

  return updated;
};

export const markPaidService = async (userId: string, debtorId: string) => {
  const existing = await db
    .select()
    .from(debtors)
    .where(and(eq(debtors.id, debtorId), eq(debtors.userId, userId)))
    .limit(1);

  if (existing.length === 0) {
    throw new Error("Debtor not found");
  }

  const [updated] = await db
    .update(debtors)
    .set({ status: "PAID", updatedAt: new Date() })
    .where(and(eq(debtors.id, debtorId), eq(debtors.userId, userId)))
    .returning();

  return updated;
};

export const deleteDebtorService = async (userId: string, debtorId: string) => {
  const existing = await db
    .select()
    .from(debtors)
    .where(and(eq(debtors.id, debtorId), eq(debtors.userId, userId)))
    .limit(1);

  if (existing.length === 0) {
    throw new Error("Debtor not found");
  }

  await db
    .delete(debtors)
    .where(and(eq(debtors.id, debtorId), eq(debtors.userId, userId)));

  return { message: "Debtor deleted successfully" };
};