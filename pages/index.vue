<template>
  <UContainer class="py-10">
    <UCard class="text-center p-6">
      <img src="/logo.png" alt="Logo" class="mx-auto w-32 h-auto mb-4" />
      <h1 class="text-3xl font-bold text-primary mb-2">
        Cộng Đồng Trader Thực Chiến
      </h1>
      <p class="text-gray-500 mb-6">
        Tự động hóa giao dịch Forex cùng bot AI – Dành cho người mới bắt đầu hoặc muốn tối ưu thời gian và lợi nhuận.
      </p>

      <UForm class="max-w-md mx-auto" @submit.prevent="handleSubmit">
        <UFormGroup label="Email" name="email" required>
          <UInput v-model="form.email" type="email" placeholder="Nhập email của bạn" />
        </UFormGroup>

        <UFormGroup label="Họ và tên" name="name" required>
          <UInput v-model="form.name" placeholder="Nhập tên của bạn" />
        </UFormGroup>

        <UFormGroup label="Mã xác nhận (OTP)" name="otp" required>
          <div class="flex gap-2">
            <UInput v-model="form.otp" placeholder="Nhập mã OTP" />
            <UButton @click="sendOtp" variant="soft">Gửi mã</UButton>
          </div>
        </UFormGroup>

        <UButton type="submit" class="mt-4 w-full" color="primary">
          Đăng ký dùng thử bot
        </UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>

<script setup>
const form = reactive({
  email: '',
  name: '',
  otp: ''
})

async function sendOtp() {
  form.otp = Math.floor(100000 + Math.random() * 900000).toString()
  await fetch('/api/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: form.email, otp: form.otp })
  })
  alert('Mã OTP đã được gửi đến email!')
}

function handleSubmit() {
  alert(`Đăng ký thành công cho ${form.name} - ${form.email}`)
}
</script>