"use client";

import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, Mail, Lock, User, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";

export function SignupForm() {
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
    setError("");

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
    <form onSubmit={HandleEmailAuth} className="space-y-5">
      {/* Error Message */}
      {error.length > 0 && (
        <div
          className="relative"
          style={{
            animation: "shake 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="absolute -inset-0.5 bg-linear-to-r from-red-500 to-pink-600 rounded-lg opacity-20 blur" />
          <div className="relative w-full flex items-center justify-center text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg py-3 px-4">
            <Shield className="h-4 w-4 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Username Field */}
      <div
        className="space-y-2"
        style={{
          animation:
            "slide-fade-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.2s forwards",
          opacity: 0,
        }}
      >
        <Label
          htmlFor="username"
          className="text-sm font-medium text-gray-300 flex items-center gap-2"
        >
          <User className="h-3.5 w-3.5 text-purple-400" />
          Username
        </Label>
        <div className="relative group">
          {/* Neon glow on focus */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-pink-600 rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors duration-300">
              <User className="h-4 w-4" />
            </div>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-10 pl-11 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
            />
            {/* Animated border */}
            <div className="absolute inset-0 rounded-lg border border-purple-500/0 group-focus-within:border-purple-500/50 pointer-events-none transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* Email Field */}
      <div
        className="space-y-2"
        style={{
          animation:
            "slide-fade-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.3s forwards",
          opacity: 0,
        }}
      >
        <Label
          htmlFor="email"
          className="text-sm font-medium text-gray-300 flex items-center gap-2"
        >
          <Mail className="h-3.5 w-3.5 text-purple-400" />
          Email Address
        </Label>
        <div className="relative group">
          {/* Neon glow on focus */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-blue-600 rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors duration-300">
              <Mail className="h-4 w-4" />
            </div>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="user@nexus.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 pl-11 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
            />
            {/* Animated border */}
            <div className="absolute inset-0 rounded-lg border border-purple-500/0 group-focus-within:border-purple-500/50 pointer-events-none transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* Password Field */}
      <div
        className="space-y-2"
        style={{
          animation:
            "slide-fade-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.4s forwards",
          opacity: 0,
        }}
      >
        <Label
          htmlFor="password"
          className="text-sm font-medium text-gray-300 flex items-center gap-2"
        >
          <Lock className="h-3.5 w-3.5 text-purple-400" />
          Security Code
        </Label>
        <div className="relative group">
          {/* Neon glow on focus */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500 to-purple-600 rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors duration-300">
              <Lock className="h-4 w-4" />
            </div>
            <Input
              id="password"
              type={isViewPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="h-10 pl-11 pr-12 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500/20 transition-all duration-300"
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-10 px-4 flex items-center justify-center text-gray-500 hover:text-purple-400 transition-colors duration-300"
              onClick={() => setIsViewPassword(!isViewPassword)}
              aria-label={isViewPassword ? "Hide password" : "Show password"}
            >
              {isViewPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
            {/* Animated border */}
            <div className="absolute inset-0 rounded-lg border border-pink-500/0 group-focus-within:border-pink-500/50 pointer-events-none transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div
        className="flex items-center gap-3 pt-2"
        style={{
          animation:
            "slide-fade-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.5s forwards",
          opacity: 0,
        }}
      >
        <Checkbox
          id="terms"
          required
          className="mt-0.5 border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 transition-all duration-300"
        />
        <Label
          htmlFor="terms"
          className="text-xs text-gray-400 font-normal cursor-pointer hover:text-gray-300 transition-colors duration-300 leading-relaxed"
        >
          I agree to the&nbsp;
          <Link
            href="/terms"
            className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors duration-300"
          >
            Terms of Service
          </Link>
          &nbsp;and&nbsp;
          <Link
            href="/privacy"
            className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors duration-300"
          >
            Privacy Policy
          </Link>
        </Label>
      </div>

      {/* Submit Button with holographic effect */}
      <div
        className="relative group/submit pt-2"
        style={{
          animation:
            "slide-fade-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.6s forwards",
          opacity: 0,
        }}
      >
        {/* Animated glow */}
        <div
          className="absolute inset-0.5 bg-linear-to-r from-purple-600 via-pink-700 to-blue-700 rounded-lg opacity-50 group-hover/submit:opacity-60 blur-xs transition-all duration-500"
          style={{
            animation: "tilt 3s ease-in-out infinite",
          }}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="relative w-full h-10 bg-linear-to-r from-purple-800 to-pink-900 hover:from-purple-700 hover:to-pink-800 text-white font-semibold shadow-lg shadow-purple-500/50 transition-all duration-300 border border-purple-400/50"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner />
              <span>Initializing...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Create Account</span>
              <svg
                className="w-5 h-5 group-hover/submit:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
