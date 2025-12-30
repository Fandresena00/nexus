import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { Card, CardContent } from "@/components/ui/card";
import { SignupForm } from "./signup-form";
import Link from "next/link";
import GoogleLink from "./google-link";
import { UserPlus } from "lucide-react";

export default async function SignUpPage() {
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
              <div className="relative w-14 h-14 mx-auto bg-linear-to-br from-primary to-accent rounded-xl flex items-center justify-center border border-primary/30 shadow-lg hover:scale-110 transition-transform duration-300">
                <UserPlus className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>

            <h2
              className="text-3xl font-bold mb-2"
              style={{ animation: "fade-in-up 0.4s ease-out 0.05s forwards" }}
            >
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Create Account
              </span>
            </h2>
            <p
              className="text-sm text-muted-foreground"
              style={{ animation: "fade-in-up 0.4s ease-out 0.1s forwards" }}
            >
              Join us and start managing your projects
            </p>
          </div>

          {/* Sign Up Form */}
          <SignupForm />

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
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Sign in
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
