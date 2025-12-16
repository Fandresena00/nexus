import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { sendVerificationEmail } from "./email";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60,
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await sendVerificationEmail({
          to: user.email,
          userName: user.name,
          verificationUrl: url,
        });
        console.log(` Verification email sent to ${user.email}`);
      } catch (error) {
        console.error("❌ Failed to send verification email:", error);
        // Better Auth gérera l'erreur
        throw error;
      }
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  advanced: {
    cookiePrefix: "nexus",
    crossSubDomainCookies: {
      enabled: false,
    },
  },

  plugins: [nextCookies()],
});
