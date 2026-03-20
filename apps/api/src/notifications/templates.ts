interface TemplateData {
  businessName: string;
  debtorName: string;
  amount: number;
  dueDate: string;
}

const formatAmount = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const getSMSTemplate = (
  data: TemplateData,
  reminderCount: number
): string => {
  const { businessName, debtorName, amount, dueDate } = data;
  const formattedAmount = formatAmount(amount);
  const formattedDate = formatDate(dueDate);

  if (reminderCount === 1) {
    // First reminder — friendly
    return `Hi ${debtorName}, this is a friendly reminder from ${businessName} that a payment of ${formattedAmount} was due on ${formattedDate}. Kindly make payment at your earliest convenience. Thank you.`;
  }

  if (reminderCount === 2) {
    // Second reminder — firm
    return `Dear ${debtorName}, we noticed your payment of ${formattedAmount} to ${businessName} is still outstanding (due ${formattedDate}). Please make payment as soon as possible to avoid further reminders.`;
  }

  // Third+ reminder — urgent
  return `URGENT: ${debtorName}, your debt of ${formattedAmount} to ${businessName} is seriously overdue since ${formattedDate}. Please settle this immediately. Contact us if you need a payment arrangement.`;
};