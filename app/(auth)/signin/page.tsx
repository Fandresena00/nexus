import GoogleSvg from "@/public/google-svg";
import SigninForm from "./signin-form";
import FacebookSvg from "@/public/facebook-svg";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function page() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <Card className="p-8 w-full max-w-[440] shadow-2xl shadow-zinc-950/60">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Bon retour !</h2>
        <p className="text-sm text-gray-600">
          Connectez-vous pour accéder à votre espace
        </p>
      </CardHeader>
      {/** Social Login */}
      <div className="relative flex gap-2 justify-center">
        <Button className="w-2/5">
          <GoogleSvg />
          <span>Google</span>
        </Button>
        <Button className="w-2/5">
          <FacebookSvg />
          <span>Facebook</span>
        </Button>
      </div>

      <Separator />
      <CardContent>
        <SigninForm />
      </CardContent>
    </Card>
  );
}
