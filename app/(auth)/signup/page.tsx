import { redirect } from "next/navigation";
import { SignupFrom } from "./signup-from";
import { getSession } from "@/lib/auth-server";

export default async function page() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="bg-gray-50 rounded-xl p-12 w-full max-w-2xl shadow-2xl shadow-blue-950/60">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
        <p className="text-sm text-gray-600">
          create an account for use this app
        </p>
      </div>
      <SignupFrom />
    </div>
  );
}
