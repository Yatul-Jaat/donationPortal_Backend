import nodemailer from "nodemailer"

const SignupMail = async (email, name) => {
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
      subject: "✅ Signup Confirmation - Welcome to Auth!",
      text: `Hello ${name},

Thank you for signing up to Auth! 🎉 
Your account has been successfully created.

You can now log in and start using Auth securely.

If you did not create this account, please ignore this email.

Best regards,
The Auth Team`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">Welcome to Auth, ${name}! 🎉</h2>
          <p>Thank you for <b>signing up</b> to <b>Auth</b>. Your account has been created successfully and is ready to use.</p>
          
          <p>You can now log in and start accessing our secure services instantly.</p>
          
          <a href="http://localhost:3000/login" 
             style="display: inline-block; padding: 10px 20px; margin-top: 10px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
             Login to Auth
          </a>
          
          <p style="margin-top:20px; font-size: 0.9em; color: #777;">
            If you did not create this account, please ignore this email.
          </p>
          
          <p style="margin-top:10px;">Cheers,<br/>The Auth Team</p>
        </div>
      `
    }

    auth.sendMail(receiver, (error, emailResponse) => {
      if (error) throw error
      console.log("message sent..")
    })

  } catch (error) {
    console.log(error)
  }
}

export default SignupMail
