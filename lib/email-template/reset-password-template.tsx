import Head from "next/head";

interface ResetPasswordProps {
  userName?: string;
  resetUrl: string;
}

export function ResetPasswordTemplate({
  userName,
  resetUrl,
}: ResetPasswordProps) {
  return (
    <html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      </Head>
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
            border: "1px solid rgba(6, 182, 212, 0.2)",
            boxShadow: "0 0 40px rgba(6, 182, 212, 0.15)",
          }}
        >
          {/* Top Neon Line */}
          <div
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, #06b6d4 50%, transparent 100%)",
            }}
          />

          {/* Header */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #1a1a1a 0%, #0c4a6e 50%, #1a1a1a 100%)",
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
                background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)",
                border: "2px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span style={{ fontSize: "40px" }}>🔐</span>
            </div>

            <h1
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #67e8f9 50%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: "32px",
                fontWeight: "bold",
                margin: "0 0 10px",
                letterSpacing: "-0.5px",
              }}
            >
              Reset Your Password
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
                    "linear-gradient(90deg, transparent 0%, #06b6d4 100%)",
                }}
              />
              <span style={{ color: "#06b6d4", fontSize: "16px" }}>✨</span>
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, #06b6d4 0%, transparent 100%)",
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
              We received a request to reset the password for your{" "}
              <strong style={{ color: "#06b6d4" }}>NEXUS</strong> account. Click
              the button below to create a new password.
            </p>

            {/* Warning Box */}
            <div
              style={{
                padding: "16px",
                backgroundColor: "rgba(245, 158, 11, 0.1)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
                borderRadius: "8px",
                marginBottom: "30px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#fbbf24",
                  margin: "0 0 4px",
                  fontWeight: "600",
                }}
              >
                ⚠️ Password Reset Requested
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                  margin: 0,
                }}
              >
                If you didn&apos;t request this, please ignore this email.
              </p>
            </div>

            {/* CTA Button */}
            <div style={{ textAlign: "center", margin: "40px 0" }}>
              <a
                href={resetUrl}
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
                  color: "#ffffff",
                  padding: "16px 40px",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                Reset Password →
              </a>
            </div>

            {/* Alternative Link Box */}
            <div
              style={{
                marginTop: "35px",
                padding: "20px",
                backgroundColor: "#111111",
                borderRadius: "8px",
                border: "1px solid #2a2a2a",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  marginBottom: "12px",
                  fontWeight: "600",
                }}
              >
                Or copy and paste this link:
              </p>
              <div
                style={{
                  padding: "12px",
                  backgroundColor: "#0a0a0a",
                  borderRadius: "6px",
                  border: "1px solid #2a2a2a",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    color: "#06b6d4",
                    wordBreak: "break-all",
                    margin: 0,
                    fontFamily: "monospace",
                  }}
                >
                  {resetUrl}
                </p>
              </div>
            </div>

            {/* Info Boxes */}
            <div style={{ marginTop: "35px" }}>
              {/* Expiry Notice */}
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
                  ⏱️ <strong>Expires in 1 hour</strong> - Reset your password
                  soon to secure your account.
                </p>
              </div>

              {/* Security Notice */}
              <div
                style={{
                  padding: "14px",
                  backgroundColor: "rgba(239, 68, 68, 0.05)",
                  border: "1px solid rgba(239, 68, 68, 0.15)",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#f87171",
                    margin: 0,
                  }}
                >
                  🚨 <strong>Security Alert:</strong> After resetting,
                  you&apos;ll be logged out of all devices.
                </p>
              </div>

              {/* Didn't Request */}
              <div
                style={{
                  padding: "14px",
                  backgroundColor: "rgba(156, 163, 175, 0.05)",
                  border: "1px solid rgba(156, 163, 175, 0.1)",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#9ca3af",
                    margin: 0,
                  }}
                >
                  🔒 <strong>Didn&apos;t request this?</strong> Your account is
                  still secure. You can safely ignore this email.
                </p>
              </div>
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
                    "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
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
                "linear-gradient(90deg, transparent 0%, #ec4899 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Spacer */}
        <div style={{ height: "40px" }} />
      </body>
    </html>
  );
}
