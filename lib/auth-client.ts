import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession, signOut, updateUser } =
  createAuthClient();

/*import { headers } from "next/headers";
import { auth } from "./auth";

export const SignUp = async (name: string, email: string, password: string) => {
  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      callbackURL: "/dashboard",
    },
  });

  return result;
};

export const SignIn = async (email: string, password: string) => {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/dashboard",
    },
  });

  return result;
};

export const SignOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });

  return result;
};
*/
