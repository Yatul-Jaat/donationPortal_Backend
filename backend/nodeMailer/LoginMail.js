import nodemailer from "nodemailer"

const LoginMail = async (email, name) => {
  try {
    const auth = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "jezorb0212@gmail.com",
        pass: "ggqovdprhdyxopqv"
      }
    });

    const receiver = {
      from: "jezorb0212@gmail.com",
      to: email,
      subject: "✅ Login Confirmation - Auth",
      text: `Hello ${name},

We noticed a successful login to your Auth account 🎉 

If this was you, no further action is required. You can continue using Auth securely.

⚠️ If this wasn’t you, we recommend you reset your password immediately to protect your account.

Best regards,
The Auth Team`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Login Confirmation - Auth</h2>
          <p>Hello <b>${name}</b>,</p>
          
          <p>We noticed a <b>successful login</b> to your Auth account 🎉</p>
          
          <p>If this was you, you can safely ignore this email and continue using Auth.</p>
          
          <p style="color: #e74c3c;"><b>⚠️ If this wasn’t you</b>, please reset your password immediately to secure your account.</p>
          
          <a href="http://localhost:3000/reset-password" 
             style="display: inline-block; padding: 10px 20px; margin-top: 10px; background: #e74c3c; color: white; text-decoration: none; border-radius: 5px;">
             Reset Password
          </a>
          
          <p style="margin-top:20px; font-size: 0.9em; color: #777;">
            This is an automated login confirmation email from Auth.
          </p>
          
          <p style="margin-top:10px;">Cheers,<br/>The Auth Team</p>
        </div>
      `
    }

    auth.sendMail(receiver, (error, emailResponse) => {
      if (error) throw error
      console.log("Login confirmation email sent..")
    })

  } catch (error) {
    console.log(error)
  }
}

export default LoginMail
