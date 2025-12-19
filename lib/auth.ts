import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";
import {
  sendConfirmResetPasswordEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "./email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    onPasswordReset: async ({ user }) => {
      try {
        await sendConfirmResetPasswordEmail({
          to: user.email,
          userName: user.name,
        });
      } catch (error) {
        console.error(
          "❌ Failed to send reset password confirmation email:",
          error,
        );
        throw error;
      }
      console.log("password reset for the user email :" + user.email);
    },
    sendResetPassword: async ({ user, url }) => {
      try {
        await sendResetPasswordEmail({
          to: user.email,
          userName: user.name,
          resetUrl: url,
        });
        console.log(` reset password email sent to ${user.email}`);
      } catch (error) {
        console.error("❌ Failed to send reset password email:", error);
        throw error;
      }
    },
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
    useSecureCookies: true,
    crossSubDomainCookies: {
      enabled: false,
    },
  },
  plugins: [nextCookies()],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      overrideUserInfoOnSignIn: true,
    },
  },
});
