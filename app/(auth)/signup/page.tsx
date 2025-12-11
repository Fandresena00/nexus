import { redirect } from "next/navigation";
import { SignupFrom } from "./signup-from";
import { getSession } from "@/lib/auth-server";
import FacebookSvg from "@/public/facebook-svg";
import GoogleSvg from "@/public/google-svg";
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
      <Button>
        <GoogleSvg />
        <span>Google</span>
      </Button>

      <Separator />
      <CardContent>
        <SignupFrom />
      </CardContent>
    </Card>
  );
}
