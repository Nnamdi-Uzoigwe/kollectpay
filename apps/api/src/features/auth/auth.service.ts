// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { db } from "../../shared/db/index";
// import { users } from "../../shared/db/schema";
// import { eq } from "drizzle-orm";
// import type { SignupInput, LoginInput } from "./auth.schema";

// const JWT_SECRET = process.env.JWT_SECRET!;
// const JWT_EXPIRES_IN = "7d";

// export const generateToken = (userId: string) => {
//   return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
// };

// export const signupService = async (input: SignupInput) => {
//   // Check if email already exists
//   const existing = await db
//     .select()
//     .from(users)
//     .where(eq(users.email, input.email))
//     .limit(1);

//   if (existing.length > 0) {
//     throw new Error("An account with this email already exists");
//   }

//   // Hash password
//   const passwordHash = await bcrypt.hash(input.password, 12);

//   // Create user
//   const [user] = await db
//     .insert(users)
//     .values({
//       email: input.email,
//       passwordHash,
//       businessName: input.businessName,
//       phone: input.phone,
//     })
//     .returning({
//       id: users.id,
//       email: users.email,
//       businessName: users.businessName,
//       phone: users.phone,
//       plan: users.plan,
//       isVerified: users.isVerified,
//       createdAt: users.createdAt,
//     });

//   const token = generateToken(user.id);

//   return { user, token };
// };

// export const loginService = async (input: LoginInput) => {
//   // Find user by email
//   const [user] = await db
//     .select()
//     .from(users)
//     .where(eq(users.email, input.email))
//     .limit(1);

//   if (!user) {
//     throw new Error("Invalid email or password");
//   }

//   // Check password
//   const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);

//   if (!isValidPassword) {
//     throw new Error("Invalid email or password");
//   }

//   const token = generateToken(user.id);

//   return {
//     user: {
//       id: user.id,
//       email: user.email,
//       businessName: user.businessName,
//       phone: user.phone,
//       plan: user.plan,
//       isVerified: user.isVerified,
//       createdAt: user.createdAt,
//     },
//     token,
//   };
// };

// export const getMeService = async (userId: string) => {
//   const [user] = await db
//     .select({
//       id: users.id,
//       email: users.email,
//       businessName: users.businessName,
//       phone: users.phone,
//       plan: users.plan,
//       isAdmin: users.isAdmin,
//       isVerified: users.isVerified,
//       createdAt: users.createdAt,
//     })
//     .from(users)
//     .where(eq(users.id, userId))
//     .limit(1);

//   if (!user) {
//     throw new Error("User not found");
//   }

//   return user;
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../../shared/db/index";
import { users } from "../../shared/db/schema";
import { eq } from "drizzle-orm";
import type { SignupInput, LoginInput } from "./auth.schema";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "7d";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const signupService = async (input: SignupInput) => {
  // Check if email already exists
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("An account with this email already exists");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(input.password, 12);

  // Create user
  const [user] = await db
    .insert(users)
    .values({
      email: input.email,
      passwordHash,
      businessName: input.businessName,
      phone: input.phone,
    })
    .returning({
      id: users.id,
      email: users.email,
      businessName: users.businessName,
      phone: users.phone,
      plan: users.plan,
      isAdmin: users.isAdmin,
      isVerified: users.isVerified,
      createdAt: users.createdAt,
    });

  const token = generateToken(user.id);

  return { user, token };
};

export const loginService = async (input: LoginInput) => {
  // Find user by email
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check password
  const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);

  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      businessName: user.businessName,
      phone: user.phone,
      plan: user.plan,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    },
    token,
  };
};

export const getMeService = async (userId: string) => {
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      businessName: users.businessName,
      phone: users.phone,
      plan: users.plan,
      isAdmin: users.isAdmin,
      isVerified: users.isVerified,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};