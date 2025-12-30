import SigninForm from "./signin-form";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import GoogleLink from "./google-link";
import { Lock } from "lucide-react";

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
      {/* Main card */}
      <Card
        className="relative bg-card/50 backdrop-blur-xl border border-border shadow-lg"
        style={{ animation: "scale-in 0.4s ease-out" }}
      >
        <CardContent className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="inline-block mb-4"
              style={{ animation: "fade-in-down 0.4s ease-out forwards" }}
            >
              <div className="relative w-14 h-14 mx-auto bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center border border-primary/30 shadow-lg hover:scale-110 transition-transform duration-300">
                <Lock className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>

            <h2
              className="text-3xl font-bold mb-2"
              style={{ animation: "fade-in-up 0.4s ease-out 0.05s forwards" }}
            >
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Sign In
              </span>
            </h2>
            <p
              className="text-sm text-muted-foreground"
              style={{ animation: "fade-in-up 0.4s ease-out 0.1s forwards" }}
            >
              Welcome back! Please sign in to continue
            </p>
          </div>

          {/* Sign In Form */}
          <SigninForm />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-card text-muted-foreground text-xs uppercase tracking-wider font-medium">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <GoogleLink />

          {/* Footer */}
          <p
            className="mt-6 text-center text-sm text-muted-foreground"
            style={{ animation: "fade-in 0.4s ease-out 0.3s both" }}
          >
            Don&apos;t have an account?&nbsp;
            <Link
              href="/signup"
              className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>

      {/* Mobile branding */}
      <div
        className="lg:hidden mt-6 text-center"
        style={{ animation: "fade-in 0.4s ease-out 0.4s both" }}
      >
        <p className="text-sm text-muted-foreground">
          Powered by{" "}
          <span className="font-semibold text-foreground">Fandresena</span>
        </p>
      </div>
    </div>
  );
}
