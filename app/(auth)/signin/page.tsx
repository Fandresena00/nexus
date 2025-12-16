import GoogleSvg from "@/public/google-svg";
import SigninForm from "./signin-form";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SignInPage() {
  const session = await getSession();

  if (session) {
    // If user has session but email not verified, redirect to verification
    if (!session.emailVerified) {
      redirect("/verify-email");
    }
    // If verified, go to dashboard
    redirect("/dashboard");
  }

  return (
    <div className="w-full max-w-md">
      {/* Holographic Card */}
      <div className="relative group">
        {/* Neon glow effect */}
        <div
          className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-30 blur-lg transition-all duration-500"
          style={{
            animation: "pulse-slow 4s ease-in-out infinite",
          }}
        />

        {/* Main card */}
        <Card
          className="relative bg-gray-900/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)]"
          style={{
            animation: "scale-in 0.5s ease-out",
          }}
        >
          <CardContent className="p-4 sm:py-6 sm:px-10">
            {/* Header with icon */}
            <div className="text-center mb-8">
              <div
                className="inline-block mb-4"
                style={{
                  animation:
                    "fade-in-down 0.6s cubic-bezier(0.2, 0, 0, 1) forwards",
                  opacity: 0,
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-400/20 blur-lg" />
                  <div className="relative w-16 h-16 mx-auto bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center border border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-110 transition-transform duration-300">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      className="w-8 h-8 stroke-white stroke-2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <h2
                className="text-3xl font-bold mb-2"
                style={{
                  animation:
                    "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.1s forwards",
                  opacity: 0,
                }}
              >
                <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Secure Login
                </span>
              </h2>
              <p
                className="text-sm text-gray-400"
                style={{
                  animation:
                    "fade-in-up 0.6s cubic-bezier(0.2, 0, 0, 1) 0.15s forwards",
                  opacity: 0,
                }}
              >
                Access your command center
              </p>

              {/* Animated line */}
              <div
                className="mt-4 h-px w-32 mx-auto bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-50"
                style={{
                  animation:
                    "expand-x 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s forwards",
                  transform: "scaleX(0)",
                  opacity: 0,
                }}
              />
            </div>

            {/* Sign In Form */}
            <SigninForm />

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-gray-900 text-gray-500 text-xs uppercase tracking-wider font-medium flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    style={{
                      animation:
                        "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                  or continue with
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    style={{
                      animation:
                        "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="relative group/btn">
              <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-blue-600 rounded-lg opacity-0 group-hover/btn:opacity-30 blur transition-all duration-300" />
              <Button
                variant="outline"
                className="relative w-full h-10 font-medium bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 hover:bg-gray-800 text-gray-300 transition-all duration-300"
              >
                <GoogleSvg />
                <span>Continue with Google</span>
              </Button>
            </div>

            {/* Footer */}
            <p
              className="mt-8 text-center text-xs text-gray-400"
              style={{
                animation: "fade-in 1s ease-out 0.5s both",
              }}
            >
              New user?{" "}
              <Link
                href="/signup"
                className="font-semibold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-400 transition-all duration-300"
              >
                Initialize account →
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mobile branding */}
      <div
        className="lg:hidden mt-8 text-center"
        style={{
          animation: "fade-in 1s ease-out 0.5s both",
        }}
      >
        <div className="inline-flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
          <p className="text-sm text-gray-400">
            Powered by{" "}
            <span className="font-semibold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Fandresena
            </span>
          </p>
          <div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
