import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Shield,
  Users,
  CheckCircle2,
  TrendingUp,
  Lock,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      {/* Subtle linear orbs - REDUCED opacity for professionalism */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
          style={{ animation: "float-slow 25s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"
          style={{ animation: "float-slower 30s ease-in-out infinite" }}
        />
      </div>

      {/* Main container */}
      <div className="relative w-full z-10">
        {/* Navigation */}
        <nav className="relative z-50 border-b border-border backdrop-blur-xl bg-background/80">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="inline-flex items-center gap-3 group transition-transform duration-200 hover:scale-105"
              >
                <Logo />
                <span className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                  NEXUS
                </span>
              </Link>

              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
                <Link href="/signin">
                  <Button variant="ghost" className="button-animated">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="button-animated bg-linear-to-r from-primary to-secondary hover:opacity-90">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
                style={{ animation: "fade-in-up 0.6s ease-out both" }}
              >
                <div
                  className="w-2 h-2 rounded-full bg-primary"
                  style={{ animation: "pulse-slow 3s ease-in-out infinite" }}
                />
                <span className="text-sm font-medium text-primary">
                  Next-Generation Project Management
                </span>
              </div>

              {/* Main Headline */}
              <h1
                className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                style={{ animation: "fade-in-up 0.6s ease-out 0.1s both" }}
              >
                <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Manage Projects
                </span>
                <br />
                <span className="text-foreground">With Confidence</span>
              </h1>

              {/* Subheading */}
              <p
                className="text-lg text-muted-foreground leading-relaxed max-w-xl"
                style={{ animation: "fade-in-up 0.6s ease-out 0.2s both" }}
              >
                Streamline your workflow with intelligent task management,
                real-time collaboration, and powerful analytics.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row items-start gap-4 pt-4"
                style={{ animation: "fade-in-up 0.6s ease-out 0.3s both" }}
              >
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="button-animated bg-linear-to-r from-primary to-secondary hover:opacity-90 px-8"
                  >
                    Get Started Free
                    <Zap className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="button-animated"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div
                className="flex flex-wrap items-center gap-6 pt-4"
                style={{ animation: "fade-in-up 0.6s ease-out 0.4s both" }}
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right Side - Features Grid */}
            <div
              className="grid grid-cols-1 gap-4"
              style={{ animation: "fade-in-up 0.6s ease-out 0.3s both" }}
            >
              {/* Feature 1 */}
              <div className="card-interactive group">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 flex w-12 h-12 bg-primary/10 rounded-lg items-center justify-center border border-primary/20 transition-all duration-300 group-hover:scale-105">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      Smart Task Management
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      AI-powered prioritization and deadline tracking
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="card-interactive group">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 flex w-12 h-12 bg-secondary/10 rounded-lg items-center justify-center border border-secondary/20 transition-all duration-300 group-hover:scale-105">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Team Collaboration</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time sync with advanced permission controls
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="card-interactive group">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 flex w-12 h-12 bg-accent/10 rounded-lg items-center justify-center border border-accent/20 transition-all duration-300 group-hover:scale-105">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Analytics & Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Data-driven insights with predictive analytics
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="card-interactive group">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 flex w-12 h-12 bg-primary/10 rounded-lg items-center justify-center border border-primary/20 transition-all duration-300 group-hover:scale-105">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Enterprise Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Bank-level encryption with compliance certifications
                    </p>
                  </div>
                </div>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full bg-green-500"
                    style={{ animation: "pulse-slow 3s ease-in-out infinite" }}
                  />
                  <span>All Systems Operational</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Enterprise-Grade{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Security
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your data is protected with bank-level encryption and compliance
            certifications
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="w-4 h-4 text-primary" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="w-4 h-4 text-primary" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="w-4 h-4 text-primary" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="w-4 h-4 text-primary" />
              <span>Daily Backups</span>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Transform
            </span>{" "}
            Your Workflow?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of teams already using NEXUS
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="button-animated bg-linear-to-r from-primary to-secondary hover:opacity-90 px-12 py-6 text-lg"
            >
              Get Started Free
              <Zap className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50 backdrop-blur-xl mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3">
                <Logo />
                <span className="text-lg font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  NEXUS
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Nexus. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
