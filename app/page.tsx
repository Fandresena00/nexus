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
    <div className="relative flex min-h-screen overflow-hidden bg-black">
      {/* Cyber grid overlay with scan animation */}
      <div className="fixed inset-0 opacity-15">
        <div
          className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-500/30 to-transparent"
          style={{
            animation: "scan 8s linear infinite",
          }}
        />
      </div>

      {/* Neon linear orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[90px]"
          style={{
            animation: "float-slow 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-lg h-128 bg-blue-600/20 rounded-full blur-[90px]"
          style={{
            animation: "float-slower 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[60px]"
          style={{
            animation: "pulse-slow 4s ease-in-out infinite",
          }}
        />
      </div>

      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/10 to-transparent h-1"
          style={{
            animation: "scanline 4s linear infinite",
          }}
        />
      </div>

      {/* Main container */}
      <div className="relative w-full z-10">
        {/* Navigation */}
        <nav className="relative z-50 border-b border-cyan-500/10 backdrop-blur-xl bg-black/50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="inline-flex items-center gap-3 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-xl group-hover:bg-cyan-400/40 transition-all duration-300" />
                  <Logo />
                </div>
                <span className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
                  NEXUS
                </span>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
                <Link href="/signin">
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-cyan-500/20 transition-all"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <div className="relative group">
                    <Button className="relative bg-linear-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 border border-white/10 text-white font-semibold">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm"
                style={{
                  animation: "fade-in-up 1s ease-out both",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  style={{
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                />
                <span className="text-sm font-medium text-cyan-400">
                  Next-Generation Project Management
                </span>
              </div>

              {/* Main Headline */}
              <h1
                className="text-5xl lg:text-7xl font-bold leading-tight"
                style={{
                  animation: "fade-in-up 1s ease-out 0.2s both",
                }}
              >
                <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Secure Access
                </span>
                <br />
                <span className="text-white">To Your</span>
                <br />
                <span className="text-gray-400">Digital Workspace</span>
              </h1>

              {/* Subheading */}
              <p
                className="text-lg lg:text-xl text-gray-400 font-light leading-relaxed max-w-xl"
                style={{
                  animation: "fade-in-up 1s ease-out 0.4s both",
                }}
              >
                Enter the future of task management with advanced security,
                real-time intelligence, and quantum-speed processing.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row items-start gap-4 pt-4"
                style={{
                  animation: "fade-in-up 1s ease-out 0.6s both",
                }}
              >
                <Link href="/signup">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300" />
                    <Button
                      size="lg"
                      className="relative bg-linear-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 border border-white/10 text-white font-semibold px-8 py-6 text-lg"
                    >
                      Get started
                      <Zap className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div
                className="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-400"
                style={{
                  animation: "fade-in-up 1s ease-out 0.8s both",
                }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right Side - Features */}
            <div
              className="space-y-4"
              style={{
                animation: "fade-in-up 1s ease-out 0.4s both",
              }}
            >
              {/* Feature 1 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-15 blur transition-all duration-300" />
                <div className="relative flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-5 group-hover:border-cyan-500/50 transition-all duration-300">
                  <div className="shrink-0 flex w-12 h-12 bg-linear-to-br from-cyan-500/20 to-blue-600/20 rounded-lg items-center justify-center border border-cyan-400/30 transition-transform duration-300 group-hover:scale-105">
                    <Target className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-base text-white font-semibold mb-1">
                      Smart Task Management
                    </p>
                    <p className="text-sm text-gray-400">
                      Intelligent Kanban boards with AI-powered prioritization
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-15 blur transition-all duration-300" />
                <div className="relative flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-5 group-hover:border-blue-500/50 transition-all duration-300">
                  <div className="shrink-0 flex w-12 h-12 bg-linear-to-br from-blue-500/20 to-purple-600/20 rounded-lg items-center justify-center border border-blue-400/30 transition-transform duration-300 group-hover:scale-105">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-base text-white font-semibold mb-1">
                      Team Collaboration
                    </p>
                    <p className="text-sm text-gray-400">
                      Real-time sync with advanced permission controls
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-pink-600 rounded-xl opacity-0 group-hover:opacity-15 blur transition-all duration-300" />
                <div className="relative flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5 group-hover:border-purple-500/50 transition-all duration-300">
                  <div className="shrink-0 flex w-12 h-12 bg-linear-to-br from-purple-500/20 to-pink-600/20 rounded-lg items-center justify-center border border-purple-400/30 transition-transform duration-300 group-hover:scale-105">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-base text-white font-semibold mb-1">
                      AI Analytics
                    </p>
                    <p className="text-sm text-gray-400">
                      Smart insights with predictive trend analysis
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-15 blur transition-all duration-300" />
                <div className="relative flex items-center gap-4 bg-gray-900/50 backdrop-blur-sm border border-pink-500/20 rounded-xl p-5 group-hover:border-pink-500/50 transition-all duration-300">
                  <div className="shrink-0 flex w-12 h-12 bg-linear-to-br from-pink-500/20 to-cyan-500/20 rounded-lg items-center justify-center border border-pink-400/30 transition-transform duration-300 group-hover:scale-105">
                    <Shield className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-base text-white font-semibold mb-1">
                      Cyber Shield Security
                    </p>
                    <p className="text-sm text-gray-400">
                      Military-grade encryption with zero-trust architecture
                    </p>
                  </div>
                </div>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-3 text-sm text-gray-400 pt-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                    style={{
                      animation:
                        "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                  <span>System Online</span>
                </div>
                <div className="w-px h-4 bg-gray-700" />
                <span>99.9% Uptime</span>
                <div className="w-px h-4 bg-gray-700" />
                <span>50K+ Active Users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="relative">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl opacity-10 blur-2xl" />
            <div className="relative bg-gray-900/30 backdrop-blur-xl border border-cyan-500/10 rounded-2xl p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-black bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    50K+
                  </div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    1M+
                  </div>
                  <div className="text-gray-400 text-sm">Tasks Completed</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                    99.9%
                  </div>
                  <div className="text-gray-400 text-sm">Uptime</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black bg-linear-to-r from-pink-400 to-cyan-500 bg-clip-text text-transparent mb-2">
                    4.9★
                  </div>
                  <div className="text-gray-400 text-sm">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-green-500/20 to-cyan-500/20 border border-green-500/30 mb-6">
            <Shield className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Enterprise-Grade{" "}
            <span className="bg-linear-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Security
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Your data is protected with bank-level encryption and zero-trust
            security protocols
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-400" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-400" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-400" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-400" />
              <span>Daily Backups</span>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to{" "}
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Transform
            </span>{" "}
            Your Workflow?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join thousands of teams already using NEXUS
          </p>
          <Link href="/signup">
            <div className="inline-block relative group">
              <Button
                size="lg"
                className="relative bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border border-white/10 text-white font-bold px-12 py-8 text-xl transition-all duration-300"
              >
                Get Started Free
                <Zap className="w-6 h-6 ml-3" />
              </Button>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="border-t border-cyan-500/10 bg-black/50 backdrop-blur-xl mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="inline-flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-linear-to-br from-cyan-500 to-blue-600 rounded-lg">
                  <span className="text-lg font-black text-white">N</span>
                </div>
                <span className="text-lg font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  NEXUS
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Nexus. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
