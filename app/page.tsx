import { getSession } from "@/lib/auth-server";
import { redirect, unauthorized } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }
  if (!session != false) {
    redirect("/dashboard");
  }

  return unauthorized();
}
