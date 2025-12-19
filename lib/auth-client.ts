import { createAuthClient } from "better-auth/react";

export const {
  signIn,
  signUp,
  useSession,
  signOut,
  updateUser,
  resetPassword,
  requestPasswordReset,
} = createAuthClient();
