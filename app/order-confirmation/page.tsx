'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
// 👇 یہ نئی لائن شامل کریں (Home page لنک کے لیے)
import Link from 'next/link'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>✅ آرڈر کنفرم ہو گیا! 🎉</h1>
      <p>آپ کا آرڈر نمبر: <strong>{orderId}</strong></p>
      
      {/* 👇 یہ ہے نیا Home Page Button */}
      <Link href="/">
        <button style={{
          marginTop: '30px',
          padding: '12px 30px',
          fontSize: '18px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          🏠 ہوم پیج پر جائیں
        </button>
      </Link>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
