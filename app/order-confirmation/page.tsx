'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'   // 👈 یہ لائن شامل کریں

// 🟢 نیا Component (اس میں ساری پرانی logic ڈالیں)
function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  
  // 👇 آپ کی جو بھی HTML/JSX تھی، وہ یہاں ڈالیں
  return <h1>آرڈر نمبر: {orderId}</h1>
}

// 🟢 اصل Page (صرف Suspense میں لپیٹ کر واپس بھیجے گا)
export default function Page() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
