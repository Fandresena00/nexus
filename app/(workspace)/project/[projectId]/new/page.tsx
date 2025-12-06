import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import NewTask from "./new-task";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex items-center justify-center p-5 inset-0">
      <NewTask userId={session.id} />
    </div>
  );
}
