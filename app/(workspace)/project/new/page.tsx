import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import NewProject from "./new-project";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex items-center justify-center p-5 inset-0">
      <NewProject userId={session.id} />
    </div>
  );
}
