import { redirect } from "next/navigation";
import { SignupFrom } from "./signup-from";
import { getSession } from "@/lib/auth-server";
import GoogleSvg from "@/public/google-svg";
import { CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Field } from "@/components/ui/field";

export default async function page() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <Field className="py-4 px-8">
      <CardHeader className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
        <p className="text-sm text-muted-foreground">
          Sign in to your Nexus account
        </p>
      </CardHeader>

      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full gap-2 transition hover:bg-muted"
        >
          <GoogleSvg />
          Continue with Google
        </Button>

        <Separator />

        <SignupFrom />
      </div>
    </Field>
  );
}
