// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

export async function sendResetEmail(email: string, link: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "info@aluwahaircare.com",
      to: email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: sans-serif;">
          <h2>Reset your password</h2>
          <p>Click below to reset your password:</p>
          <a href="${link}" target="_blank" style="color: #E11D48;">Reset Password</a>
          <p>This link expires in 15 minutes.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Send email failed:", err);
    return { success: false, error: err };
  }
}
