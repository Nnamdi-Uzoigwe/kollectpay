export type Plan = "starter" | "growth" | "pro";

export interface Debtor {
  id: string;
  name: string;
  phone: string;
  amountOwed: number;
  dueDate: string;
  status: "pending" | "overdue" | "paid";
}

export interface User {
  id: string;
  businessName: string;
  email: string;
  plan: Plan;
}