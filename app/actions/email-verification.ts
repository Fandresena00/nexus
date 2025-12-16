"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function resendVerificationEmail() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    if (session.user.emailVerified) {
      return {
        success: false,
        error: "Email already verified",
      };
    }

    // Send verification email through Better Auth
    await auth.api.sendVerificationEmail({
      body: {
        email: session.user.email,
        callbackURL: "/dashboard",
      },
    });

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Error resending verification email:", error);
    return {
      success: false,
      error: "Failed to send verification email. Please try again.",
    };
  }
}
