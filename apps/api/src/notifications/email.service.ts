import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (
  email: string,
  businessName: string,
  resetLink: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "KollectPay <onboarding@resend.dev>",
      to: email,
      subject: "Reset Your KollectPay Password",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background:#f9fafb;font-family:'Helvetica Neue',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:#0F0A1E;padding:32px 40px;text-align:center;">
                      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
                        Kollect<span style="color:#84CC16;">Pay</span>
                      </h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">
                      <h2 style="margin:0 0 12px;color:#111827;font-size:20px;font-weight:700;">
                        Reset your password
                      </h2>
                      <p style="margin:0 0 8px;color:#6B7280;font-size:15px;line-height:1.6;">
                        Hi ${businessName},
                      </p>
                      <p style="margin:0 0 28px;color:#6B7280;font-size:15px;line-height:1.6;">
                        We received a request to reset your KollectPay password. Click the button below to create a new password. This link expires in <strong>1 hour</strong>.
                      </p>

                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding-bottom:28px;">
                            <a href="${resetLink}"
                              style="display:inline-block;background:linear-gradient(135deg,#7C3AED,#9D5CF6);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 32px;border-radius:10px;">
                              Reset My Password
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:0 0 8px;color:#9CA3AF;font-size:13px;line-height:1.6;">
                        If the button doesn't work, copy and paste this link into your browser:
                      </p>
                      <p style="margin:0 0 28px;word-break:break-all;">
                        <a href="${resetLink}" style="color:#7C3AED;font-size:13px;">${resetLink}</a>
                      </p>

                      <div style="border-top:1px solid #F3F4F6;padding-top:24px;">
                        <p style="margin:0;color:#9CA3AF;font-size:13px;line-height:1.6;">
                          If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                        </p>
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#F9FAFB;padding:20px 40px;border-top:1px solid #F3F4F6;text-align:center;">
                      <p style="margin:0;color:#9CA3AF;font-size:12px;">
                        © ${new Date().getFullYear()} KollectPay. Built for Nigerian businesses.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    console.log("✅ Password reset email sent to:", email);
    return { success: true, data };
  } catch (error: any) {
    console.error("Email service error:", error);
    return { success: false, error };
  }
};