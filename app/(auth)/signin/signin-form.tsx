"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "@/lib/auth-client";
import { EyeIcon, EyeOffIcon, Mail, Lock, Fingerprint } from "lucide-react";
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
          toast.success("Access granted");
          router.push("/dashboard");
        },
        onError: (error) => {
          toast.error("Access denied", {
            description: error.error.message,
          });
        },
      },
    );
  };

  return (
    <form onSubmit={HandleEmailAuth} className="space-y-5">
      {/* Email Field */}
      <div
        className="space-y-2"
        style={{
          animation:
            "slide-fade-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.2s forwards",
          opacity: 0,
        }}
      >
        <Label
          htmlFor="email"
          className="text-sm font-medium text-gray-300 flex items-center gap-2"
        >
          <Mail className="h-3.5 w-3.5 text-cyan-400" />
          Email Address
        </Label>
        <div className="relative group">
          {/* Neon glow on focus */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors duration-300">
              <Fingerprint className="h-4 w-4" />
            </div>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="user@nexus.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 pl-11 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all duration-300"
            />
            {/* Animated border */}
            <div className="absolute inset-0 rounded-lg border border-cyan-500/0 group-focus-within:border-cyan-500/50 pointer-events-none transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* Password Field */}
      <div
        className="space-y-2"
        style={{
          animation:
            "slide-fade-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.3s forwards",
          opacity: 0,
        }}
      >
        <Label
          htmlFor="password"
          className="text-sm font-medium text-gray-300 flex items-center gap-2"
        >
          <Lock className="h-3.5 w-3.5 text-cyan-400" />
          Security Code
        </Label>
        <div className="relative group">
          {/* Neon glow on focus */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-all duration-300" />

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-300">
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
              className="h-10 pl-11 pr-12 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-10 px-4 flex items-center justify-center text-gray-500 hover:text-cyan-400 transition-colors duration-300"
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
            <div className="absolute inset-0 rounded-lg border border-blue-500/0 group-focus-within:border-blue-500/50 pointer-events-none transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* Remember & Forgot */}
      <div
        className="flex items-center justify-between pt-2"
        style={{
          animation:
            "slide-fade-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.4s forwards",
          opacity: 0,
        }}
      >
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            className="border-gray-600 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600 transition-all duration-300"
          />
          <Label
            htmlFor="remember"
            className="text-sm text-gray-400 font-normal cursor-pointer hover:text-gray-300 transition-colors duration-300"
          >
            Remember session
          </Label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
        >
          Reset code?
        </Link>
      </div>

      {/* Submit Button with holographic effect */}
      <div
        className="relative group/submit pt-2"
        style={{
          animation:
            "slide-fade-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.5s forwards",
          opacity: 0,
        }}
      >
        {/* Animated glow */}
        <div
          className="absolute inset-0.5 bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-lg opacity-50 group-hover/submit:opacity-60 blur-xs transition-all duration-500"
          style={{
            animation: "tilt 3s ease-in-out infinite",
          }}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="relative w-full h-10 bg-linear-to-r from-cyan-800 to-blue-900 hover:from-cyan-700 hover:to-blue-800 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all duration-300 border border-cyan-400/30"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner />
              <span>Authenticating...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Access System</span>
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
