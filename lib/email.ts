import { Resend } from "resend";
import { render } from "@react-email/render";
import { VerificationEmailTemplate } from "./email-template/email-verification-template";
import { ResetPasswordTemplate } from "./email-template/reset-password-template";
import { ConfirmResetPasswordTemplate } from "./email-template/confirm-reset-password-template";

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
      from: `Nexus <${process.env.EMAIL_FROM}>`,
      to: [to],
      subject: "Verify your email adress - Nexus",
      html: emailHtml, // 👈 Utilisez 'html' au lieu de 'react'
    });

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    console.log("✅ email have been send successfuly:", data);
    return data;
  } catch (error) {
    console.error("❌ error on send email:", error);
    throw error;
  }
}

export async function sendResetPasswordEmail({
  to,
  userName,
  resetUrl,
}: {
  to: string;
  userName?: string;
  resetUrl: string;
}) {
  try {
    const emailHtml = await render(
      ResetPasswordTemplate({ userName, resetUrl }),
    );

    const { data, error } = await resend.emails.send({
      from: `Nexus <${process.env.EMAIL_FROM}>`,
      to: [to],
      subject: "Reset your password - Nexus",
      html: emailHtml, // 👈 Utilisez 'html' au lieu de 'react'
    });

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    console.log("✅ email have been send successfuly:", data);
    return data;
  } catch (error) {
    console.error("❌ error on send email:", error);
    throw error;
  }
}

export async function sendConfirmResetPasswordEmail({
  to,
  userName,
}: {
  to: string;
  userName?: string;
}) {
  try {
    const emailHtml = await render(ConfirmResetPasswordTemplate({ userName }));

    const { data, error } = await resend.emails.send({
      from: `Nexus <${process.env.EMAIL_FROM}>`,
      to: [to],
      subject: "Reset password confirmed - Nexus",
      html: emailHtml, // 👈 Utilisez 'html' au lieu de 'react'
    });

    if (error) {
      console.error("Resend error:", error);
      throw error;
    }

    console.log("✅ email have been send successfuly:", data);
    return data;
  } catch (error) {
    console.error("❌ error on send email:", error);
    throw error;
  }
}
