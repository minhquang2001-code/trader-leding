import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, name, otp } = body

  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })

  // 1. Gửi OTP qua Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'quynhanhnew2000@gmail.com',
      pass: 'zxcz jezr hlvm jqqw'
    }
  })

  const mailOptions = {
    from: 'quynhanhnew2000@gmail.com',
    to: email,
    subject: 'Mã OTP xác thực',
    text: `Mã OTP của bạn là: ${otp}`
  }

  await transporter.sendMail(mailOptions)

  // 2. Gửi về Telegram
  const telegramToken = '7757638440:AAEZyvqAR8vvapjfp44t0H_pogDGeaTZQgA'
  const chatId = '7757638440' // nếu bạn có group/channel ID thì thay ở đây
  const message = `📥 Đăng ký mới:\n👤 Họ tên: ${name}\n📧 Email: ${email}\n🔐 OTP: ${otp}\n🕒 Lúc: ${timestamp}`

  await $fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: 'POST',
    body: {
      chat_id: chatId,
      text: message
    }
  })

  // 3. Gửi dữ liệu vào Google Sheet qua webhook (sẽ cập nhật đúng URL sau)
  await $fetch('https://script.google.com/macros/s/PASTE_WEBHOOK_URL_HERE/exec', {
    method: 'POST',
    body: {
      email,
      hoten: name,
      otp,
      time: timestamp
    }
  })

  return { success: true }
})