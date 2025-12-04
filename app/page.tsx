import { getSession } from "@/src/lib/auth-server";
import { redirect, unauthorized } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session || session) {
    redirect("/signin");
  }

  return unauthorized();
}
