interface VerificationEmailProps {
  userName?: string;
  verificationUrl: string;
}

export function VerificationEmailTemplate({
  userName,
  verificationUrl,
}: VerificationEmailProps) {
  return (
    <html>
      <body
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          backgroundColor: "#f6f9fc",
          margin: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Header with gradient */}
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: "40px 30px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              ✉️ Verify Your Email
            </h1>
          </div>

          {/* Content */}
          <div style={{ padding: "40px 30px" }}>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                color: "#374151",
                marginBottom: "20px",
              }}
            >
              Hello {userName || "there"},
            </p>

            <p
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                color: "#374151",
                marginBottom: "30px",
              }}
            >
              Thank you for signing up! Please click the button below to verify
              your email address and activate your account.
            </p>

            {/* CTA Button */}
            <div style={{ textAlign: "center", margin: "30px 0" }}>
              <a
                href={verificationUrl}
                style={{
                  display: "inline-block",
                  backgroundColor: "#667eea",
                  color: "#ffffff",
                  padding: "14px 32px",
                  textDecoration: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "600",
                  boxShadow: "0 4px 6px rgba(102, 126, 234, 0.25)",
                }}
              >
                Verify Email Address
              </a>
            </div>

            {/* Alternative link */}
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                backgroundColor: "#f9fafb",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "10px",
                }}
              >
                Or copy and paste this link into your browser:
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#667eea",
                  wordBreak: "break-all",
                  margin: 0,
                }}
              >
                {verificationUrl}
              </p>
            </div>

            {/* Expiry notice */}
            <p
              style={{
                marginTop: "30px",
                fontSize: "14px",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              ⏱️ This verification link will expire in 1 hour.
            </p>

            {/* Help text */}
            <p
              style={{
                marginTop: "20px",
                fontSize: "14px",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              If you didn&apos;t create an account, you can safely ignore this
              email.
            </p>
          </div>

          {/* Footer */}
          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "20px 30px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              © {new Date().getFullYear()} Nexus. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
