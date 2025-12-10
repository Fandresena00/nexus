"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "@/lib/auth-client";
import { EyeIcon, EyeClosedIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);

  const router = useRouter();

  const HandleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await signIn.email(
      {
        email: email,
        password: password,
      },
      {
        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          toast.success("Connexion Success");
          router.push("/dashboard");
        },
        onError: (error) => {
          toast.error("Connexion Failed", {
            description: error.error.message,
          });
        },
      },
    );
  };

  return (
    <form onSubmit={HandleEmailAuth}>
      {/** Email  */}
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Adresse email</FieldLabel>
            <Input
              type="email"
              name="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </Field>

          {/** Password */}
          <Field className="mb-6">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Input
                type={isViewPassword ? "text" : "password"}
                name="password"
                value={password}
                className="pr-12"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer p-1"
                onClick={() => {
                  setIsViewPassword(!isViewPassword);
                }}
              >
                {isViewPassword ? (
                  <EyeIcon size={18} />
                ) : (
                  <EyeClosedIcon size={18} />
                )}
              </button>
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>
      {/** Remember & Forgot */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Checkbox className="border-zinc-900" />
          <Label>Se souvenir de moi</Label>
        </div>
        <Button variant={"link"}>Mot de passe oublié ?</Button>
      </div>

      {/** Submit Button */}
      <Button
        className="w-full cursor-pointer"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Sign In"}
      </Button>

      {/** Signup Link */}
      <p className="text-center mt-6 text-xs text-gray-700">
        You don&apos;t have an account ?
        <Link
          href="/signup"
          className="text-zinc-700 font-semibold px-1 hover:text-zinc-800 hover:underline "
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
