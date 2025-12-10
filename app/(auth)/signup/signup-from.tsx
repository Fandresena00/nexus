"use client";

import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeClosedIcon, EyeIcon, LoaderPinwheelIcon } from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function SignupFrom() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const HandleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await signUp.email(
      {
        name: name,
        email: email,
        password: password,
      },
      {
        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (error) => {
          setError(error.error.message);
          console.log(error.error.message);
        },
      },
    );
  };

  return (
    <form onSubmit={HandleEmailAuth}>
      {error.length > 0 ? (
        <div className="w-full flex items-center justify-center text-xs text-red-500 py-2.5">
          <p>{error}</p>
        </div>
      ) : null}

      <FieldSet>
        <FieldGroup>
          {/** Username */}
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              type="text"
              name="username"
              placeholder="username"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </Field>

          {/** email */}
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

      {/** Submit Button */}
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? (
          <p className="flex justify-center gap-1.5">
            <LoaderPinwheelIcon size={20} className="animate-spin text-white" />
            <span>loading</span>
          </p>
        ) : (
          "Sign In"
        )}
      </Button>

      {/** Signup Link */}
      <p className="text-center mt-6 text-xs text-gray-700">
        Already have an account ?
        <Link
          href="/signin"
          className="text-zinc-700 font-semibold px-1 hover:text-zinc-800 hover:underline "
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
