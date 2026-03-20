import {
  pgTable,
  text,
  boolean,
  timestamp,
  doublePrecision,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ================================
// ENUMS
// ================================
export const planEnum = pgEnum("plan", ["STARTER", "GROWTH", "PRO"]);
export const debtorStatusEnum = pgEnum("debtor_status", ["PENDING", "OVERDUE", "PAID"]);
export const channelEnum = pgEnum("channel", ["SMS", "WHATSAPP"]);
export const messageStatusEnum = pgEnum("message_status", ["PENDING", "SENT", "DELIVERED", "FAILED"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["ACTIVE", "CANCELLED", "EXPIRED", "PAST_DUE"]);

// ================================
// USERS
// ================================
export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  businessName: text("business_name").notNull(),
  phone: text("phone").notNull(),
  plan: planEnum("plan").default("STARTER").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ================================
// DEBTORS
// ================================
export const debtors = pgTable("debtors", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  amount: doublePrecision("amount").notNull(),
  dueDate: timestamp("due_date").notNull(),
  status: debtorStatusEnum("status").default("PENDING").notNull(),
  notes: text("notes"),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ================================
// MESSAGES
// ================================
export const messages = pgTable("messages", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  channel: channelEnum("channel").notNull(),
  status: messageStatusEnum("status").default("PENDING").notNull(),
  body: text("body").notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  debtorId: text("debtor_id").notNull().references(() => debtors.id, { onDelete: "cascade" }),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
});

// ================================
// SUBSCRIPTIONS
// ================================
export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  plan: planEnum("plan").notNull(),
  status: subscriptionStatusEnum("status").default("ACTIVE").notNull(),
  paystackCustomerCode: text("paystack_customer_code"),
  paystackSubCode: text("paystack_sub_code"),
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  userId: text("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ================================
// REMINDER SETTINGS
// ================================
export const reminderSettings = pgTable("reminder_settings", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  frequency: text("frequency").default("DAILY").notNull(), // DAILY, EVERY_2_DAYS, WEEKLY
  channel: channelEnum("channel").default("SMS").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  reminderCount: text("reminder_count").default("0").notNull(),
  lastSentAt: timestamp("last_sent_at"),
  debtorId: text("debtor_id").notNull().unique().references(() => debtors.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// ================================
// TYPES
// ================================
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Debtor = typeof debtors.$inferSelect;
export type NewDebtor = typeof debtors.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type ReminderSetting = typeof reminderSettings.$inferSelect;
export type NewReminderSetting = typeof reminderSettings.$inferInsert;