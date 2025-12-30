"use client";

import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  Mail,
  Lock,
  User,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [error, setError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const router = useRouter();

  const HandleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      toast.error("Terms Required", {
        description: "Please agree to the Terms of Service and Privacy Policy",
      });
      return;
    }

    setIsLoading(true);
    setError("");

    await signUp.email(
      {
        name: name,
        email: email,
        password: password,
        callbackURL: "/dashboard",
      },
      {
        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          toast.success("Account created!", {
            description: "Please check your email to verify your account",
          });
          router.push("/verify-email");
        },
        onError: (error) => {
          const errorMessage = error.error.message;
          setError(errorMessage);
          toast.error("Registration failed", {
            description: errorMessage,
          });
        },
      },
    );
  };

  return (
    <form onSubmit={HandleEmailAuth} className="space-y-4">
      {/* Error Message */}
      {error.length > 0 && (
        <div
          className="relative"
          style={{ animation: "fade-in-up 0.3s ease-out" }}
        >
          <div className="w-full flex items-start gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-lg py-2.5 px-3">
            <Shield className="h-4 w-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Username Field */}
      <div
        className="space-y-2"
        style={{
          animation: "fade-in-up 0.4s ease-out 0.1s forwards",
          opacity: 0,
        }}
      >
        <Label
          htmlFor="username"
          className="text-sm font-medium flex items-center gap-2"
        >
          <User className="h-3.5 w-3.5 text-primary" />
          Username
        </Label>
        <div className="relative group">
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={50}
            className="h-10 transition-all duration-200"
          />
        </div>
      </div>

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
            minLength={8}
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
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters long
        </p>
      </div>

      {/* Terms & Conditions */}
      <div
        className="flex items-start gap-3 pt-1"
        style={{
          animation: "fade-in-up 0.4s ease-out 0.25s forwards",
          opacity: 0,
        }}
      >
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          required
          className="mt-0.5"
        />
        <Label
          htmlFor="terms"
          className="text-xs text-muted-foreground font-normal cursor-pointer leading-relaxed"
        >
          I agree to the{" "}
          <Link
            href="/terms"
            className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors duration-200"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </Label>
      </div>

      {/* Submit Button */}
      <div
        className="pt-2"
        style={{
          animation: "fade-in-up 0.4s ease-out 0.3s forwards",
          opacity: 0,
        }}
      >
        <Button
          type="submit"
          disabled={isLoading || !agreedToTerms}
          className="button-animated w-full h-10 bg-linear-to-r from-primary to-secondary hover:opacity-90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner className="w-4 h-4" />
              <span>Creating account...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
