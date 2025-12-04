import { getSession } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }
  return <div>today</div>;
}
