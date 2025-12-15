// lib/email.ts
import { Resend } from "resend";
import { render } from "@react-email/render";
import { VerificationEmailTemplate } from "./email-template/email-verification-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail({
  to,
  userName,
  verificationUrl,
}: {
  to: string;
  userName?: string;
  verificationUrl: string;
}) {
  try {
    const emailHtml = await render(
      VerificationEmailTemplate({ userName, verificationUrl }),
    );

    const { data, error } = await resend.emails.send({
      from: "Nexus <onboarding@resend.dev>",
      to: [to],
      subject: "Vérifiez votre adresse email - Nexus",
      html: emailHtml, // 👈 Utilisez 'html' au lieu de 'react'
    });

    if (error) {
      console.error("Erreur Resend:", error);
      throw error;
    }

    console.log("✅ Email envoyé avec succès:", data);
    return data;
  } catch (error) {
    console.error("❌ Échec envoi email:", error);
    throw error;
  }
}
