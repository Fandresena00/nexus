interface ConfirmResetPasswordProps {
  userName?: string;
}

export function ConfirmResetPasswordTemplate({
  userName,
}: ConfirmResetPasswordProps) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      </head>
      <body
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          backgroundColor: "#0a0a0a",
          margin: 0,
          padding: "40px 20px",
          lineHeight: 1.6,
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#1a1a1a",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(34, 197, 94, 0.2)",
            boxShadow: "0 0 40px rgba(34, 197, 94, 0.15)",
          }}
        >
          {/* Top Neon Line */}
          <div
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, #22c55e 50%, transparent 100%)",
            }}
          />

          {/* Header */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #1a1a1a 0%, #14532d 50%, #1a1a1a 100%)",
              padding: "50px 40px",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Icon Circle */}
            <div
              style={{
                width: "80px",
                height: "80px",
                margin: "0 auto 20px",
                background: "linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)",
                border: "2px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span style={{ fontSize: "40px" }}>✅</span>
            </div>

            <h1
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #4ade80 50%, #22d3ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: "32px",
                fontWeight: "bold",
                margin: "0 0 10px",
                letterSpacing: "-0.5px",
              }}
            >
              Password Reset Successful
            </h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent 0%, #22c55e 100%)",
                }}
              />
              <span style={{ color: "#22c55e", fontSize: "16px" }}>✨</span>
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, #22c55e 0%, transparent 100%)",
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "50px 40px" }}>
            {/* Greeting */}
            <p
              style={{
                fontSize: "18px",
                color: "#e5e7eb",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Hello {userName || "there"} 👋
            </p>

            <p
              style={{
                fontSize: "15px",
                lineHeight: "24px",
                color: "#9ca3af",
                marginBottom: "30px",
              }}
            >
              Your password has been successfully changed. You can now use your
              new password to sign in to your{" "}
              <strong style={{ color: "#22c55e" }}>NEXUS</strong> account.
            </p>

            {/* Success Box */}
            <div
              style={{
                padding: "20px",
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                borderRadius: "8px",
                marginBottom: "30px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#4ade80",
                  margin: "0 0 8px",
                  fontWeight: "600",
                }}
              >
                ✓ Password Changed Successfully
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                  margin: 0,
                }}
              >
                Your account is now secured with your new password.
              </p>
            </div>

            {/* Account Details */}
            <div
              style={{
                padding: "20px",
                backgroundColor: "#111111",
                borderRadius: "8px",
                border: "1px solid #2a2a2a",
                marginBottom: "30px",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  margin: "0 0 12px",
                  fontWeight: "600",
                }}
              >
                📋 Account Security Details:
              </p>
              <div
                style={{ borderLeft: "2px solid #22c55e", paddingLeft: "12px" }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 2px",
                    }}
                  >
                    Date & Time:
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#e5e7eb",
                      margin: 0,
                      fontFamily: "monospace",
                    }}
                  >
                    {new Date().toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 2px",
                    }}
                  >
                    Status:
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#4ade80",
                      margin: 0,
                      fontWeight: "600",
                    }}
                  >
                    ✓ All Sessions Logged Out
                  </p>
                </div>
              </div>
            </div>

            {/* Info Boxes */}
            <div style={{ marginTop: "30px" }}>
              {/* Session Notice */}
              <div
                style={{
                  padding: "14px",
                  backgroundColor: "rgba(6, 182, 212, 0.05)",
                  border: "1px solid rgba(6, 182, 212, 0.15)",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#22d3ee",
                    margin: 0,
                  }}
                >
                  🔄 <strong>Session Update:</strong> You&apos;ve been logged
                  out of all devices for security. Please sign in again.
                </p>
              </div>

              {/* Security Tips */}
              <div
                style={{
                  padding: "14px",
                  backgroundColor: "rgba(139, 92, 246, 0.05)",
                  border: "1px solid rgba(139, 92, 246, 0.15)",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#a78bfa",
                    margin: 0,
                  }}
                >
                  💡 <strong>Security Tip:</strong> Use a unique password and
                  enable two-factor authentication for maximum security.
                </p>
              </div>

              {/* Warning Notice */}
              <div
                style={{
                  padding: "14px",
                  backgroundColor: "rgba(239, 68, 68, 0.05)",
                  border: "1px solid rgba(239, 68, 68, 0.15)",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#f87171",
                    margin: 0,
                  }}
                >
                  ⚠️ <strong>Didn&apos;t change your password?</strong> Contact
                  our support team immediately to secure your account.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div style={{ textAlign: "center", margin: "40px 0 0" }}>
              <a
                href="https://nexus.com/sign-in"
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)",
                  color: "#ffffff",
                  padding: "16px 40px",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                Sign In to Your Account →
              </a>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              backgroundColor: "#111111",
              padding: "30px 40px",
              borderTop: "1px solid #2a2a2a",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  margin: "0 0 8px",
                }}
              >
                NEXUS
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                Next-Generation Project Management
              </p>
            </div>

            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 0%, #2a2a2a 50%, transparent 100%)",
                margin: "20px 0",
              }}
            />

            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: "#6b7280",
                textAlign: "center",
              }}
            >
              © {new Date().getFullYear()} Nexus. All rights reserved.
            </p>
          </div>

          {/* Bottom Neon Line */}
          <div
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, #22c55e 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Spacer */}
        <div style={{ height: "40px" }} />
      </body>
    </html>
  );
}
