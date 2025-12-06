import GoogleSvg from "@/public/google-svg";
import SigninForm from "./signin-form";
import FacebookSvg from "@/public/facebook-svg";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-gray-50 rounded-xl p-12 w-full max-w-[440] shadow-2xl shadow-blue-950/60">
      <div className="text-center mb-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Bon retour !</h2>
        <p className="text-sm text-gray-600">
          Connectez-vous pour accéder à votre espace
        </p>
      </div>
      {/** Social Login */}
      <div className="flex flex-col gap-2">
        <button className="flex gap-2 items-center justify-center w-full rounded-lg py-1.5 text-xs font-bold  shadow shadow-gray-600 cursor-pointer transition-all hover:bg-gray-200  ">
          <GoogleSvg />
          <span>Continuer avec Google</span>
        </button>
        <button className="flex gap-2 items-center justify-center w-full rounded-lg py-1.5 text-xs font-bold  shadow shadow-gray-600 cursor-pointer transition-all hover:bg-gray-200  ">
          <FacebookSvg />
          <span>Continuer avec Facebook</span>
        </button>
      </div>
      <SigninForm />
    </div>
  );
}
