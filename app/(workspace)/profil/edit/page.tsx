import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import EditForm from "./edit-form";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  if (!session.emailVerified) {
    redirect("/verify-email");
  }
  return (
    <div className="flex items-center justify-center p-5 min-h-screen dark">
      <EditForm
        name={session.name}
        email={session.email}
        image={session.image || null}
      />
    </div>
  );
}
