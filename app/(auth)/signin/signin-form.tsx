"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "@/lib/auth-client";
import { EyeIcon, EyeOffIcon, Mail, Lock, ArrowRight } from "lucide-react";
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
        onSuccess: (ctx) => {
          // Check if email is verified
          if (ctx.data?.user?.emailVerified === false) {
            toast.info("Please verify your email", {
              description: "Check your inbox for the verification link",
            });
            router.push("/verify-email");
          } else {
            toast.success("Welcome back!");
            router.push("/dashboard");
          }
        },
        onError: (error) => {
          toast.error("Sign in failed", {
            description: error.error.message,
          });
        },
      },
    );
  };

  return (
    <form onSubmit={HandleEmailAuth} className="space-y-4">
      {/* Email Field */}
      <div
        className="space-y-2"
        style={{
          animation: "fade-in-up 0.4s ease-out 0.15s forwards",
          opacity: 0,
        }}
      >
        <Label
          htmlFor="email"
          className="text-sm font-medium flex items-center gap-2"
        >
          <Mail className="h-3.5 w-3.5 text-primary" />
          Email
        </Label>
        <div className="relative group">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-10 transition-all duration-200"
          />
        </div>
      </div>

      {/* Password Field */}
      <div
        className="space-y-2"
        style={{
          animation: "fade-in-up 0.4s ease-out 0.2s forwards",
          opacity: 0,
        }}
      >
        <Label
          htmlFor="password"
          className="text-sm font-medium flex items-center gap-2"
        >
          <Lock className="h-3.5 w-3.5 text-primary" />
          Password
        </Label>
        <div className="relative group">
          <Input
            id="password"
            type={isViewPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            className="h-10 pr-10 transition-all duration-200"
          />
          <button
            type="button"
            className="absolute right-0 top-0 h-10 px-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200"
            onClick={() => setIsViewPassword(!isViewPassword)}
            aria-label={isViewPassword ? "Hide password" : "Show password"}
          >
            {isViewPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Forgot Password Link */}
      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors duration-200"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <div
        className="pt-2"
        style={{
          animation: "fade-in-up 0.4s ease-out 0.25s forwards",
          opacity: 0,
        }}
      >
        <Button
          type="submit"
          disabled={isLoading}
          className="button-animated w-full h-10 bg-linear-to-r from-primary to-secondary hover:opacity-90 font-semibold"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner className="w-4 h-4" />
              <span>Signing in...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
