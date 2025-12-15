interface VerificationEmailProps {
  userName?: string;
  verificationUrl: string;
}

export function VerificationEmailTemplate({
  userName,
  verificationUrl,
}: VerificationEmailProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>Vérification de compte</h1>
      <p>Bonjour {userName || "utilisateur"},</p>
      <p>
        Merci de vous être inscrit ! Veuillez cliquer sur le bouton ci-dessous
        pour vérifier votre adresse email :
      </p>
      <a
        href={verificationUrl}
        style={{
          backgroundColor: "#0070f3",
          color: "white",
          padding: "12px 24px",
          textDecoration: "none",
          borderRadius: "5px",
          display: "inline-block",
          margin: "20px 0",
        }}
      >
        Vérifier mon email
      </a>
      <p>Ou copiez ce lien dans votre navigateur :</p>
      <p style={{ color: "#666", wordBreak: "break-all" }}>{verificationUrl}</p>
      <p style={{ marginTop: "40px", color: "#999", fontSize: "12px" }}>
        Ce lien est valide pendant 24 heures.
      </p>
    </div>
  );
}
