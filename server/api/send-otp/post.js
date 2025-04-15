import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, otp } = body

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'quynhanhnew2000@gmail.com',
      pass: 'zxcz jezr hlvm jqqw'
    }
  })

  let mailOptions = {
    from: 'quynhanhnew2000@gmail.com',
    to: email,
    subject: 'Mã OTP xác thực',
    text: `Mã OTP của bạn là: ${otp}`
  }

  await transporter.sendMail(mailOptions)

  return { success: true }
})