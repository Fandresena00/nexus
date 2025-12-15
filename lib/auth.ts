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
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      try {
        await sendVerificationEmail({
          to: user.email,
          userName: user.name,
          verificationUrl: url,
        });
        console.log(`Email de vérification envoyé à ${user.email}`);
      } catch (error) {
        console.error("Échec de l'envoi de l'email de vérification:", error);
        // Better Auth gérera l'erreur
        throw error;
      }
    },
  },

  plugins: [nextCookies()],
});
