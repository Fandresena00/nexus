import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { VerifyEmailPage } from "./verify-email-client";

export default async function Page() {
  const session = await getSession();

  // If no session, redirect to login
  if (!session) {
    redirect("/signin");
  }

  // If email is already verified, redirect to dashboard
  if (session.emailVerified) {
    redirect("/dashboard");
  }

  return <VerifyEmailPage userEmail={session.email} />;
}
