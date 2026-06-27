'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiCheckCircle, FiPackage, FiMail, FiArrowLeft } from 'react-icons/fi'

export default function SuccessPage() {
  const router = useRouter()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('order')
    if (saved) {
      setOrder(JSON.parse(saved))
      localStorage.removeItem('order')
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0d14',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: '#13131f',
        borderRadius: '20px',
        border: '0.5px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
      }}>
        {/* Top green bar */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #1D9E75, #34d399)' }} />

        <div style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

          {/* Icon */}
          <div style={{
            width: '72px', height: '72px',
            background: 'rgba(29,158,117,0.12)',
            border: '0.5px solid rgba(29,158,117,0.3)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FiCheckCircle size={32} color="#1D9E75" />
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '22px', fontWeight: '500', color: '#EEEDFE', marginBottom: '8px' }}>
              Payment Successful!
            </h1>
            <p style={{ fontSize: '14px', color: '#5F5E5A', lineHeight: '1.5' }}>
              Your order is confirmed. A receipt has been sent to your email.
            </p>
          </div>

          {/* Order details */}
          {order && (
            <div style={{
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {[
                { icon: <FiPackage size={14} color="#AFA9EC" />, label: 'Product', val: order.product },
                { icon: <FiMail size={14} color="#AFA9EC" />, label: 'Email', val: order.customer?.email },
                { icon: <FiCheckCircle size={14} color="#AFA9EC" />, label: 'Amount', val: `Rs ${order.amount?.toLocaleString()}` },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {row.icon}
                    <span style={{ fontSize: '13px', color: '#888780' }}>{row.label}</span>
                  </div>
                  <span style={{ fontSize: '13px', color: '#D3D1C7', fontWeight: '500' }}>{row.val}</span>
                </div>
              ))}

              <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#5F5E5A' }}>Order ID</span>
                <span style={{ fontSize: '12px', color: '#AFA9EC', fontWeight: '500' }}>
                  {order.tracker?.substring(0, 16)}...
                </span>
              </div>
            </div>
          )}

          {/* Button */}
          <button
            onClick={() => router.push('/checkout')}
            style={{
              width: '100%',
              background: '#26215C',
              color: '#EEEDFE',
              border: 'none',
              borderRadius: '12px',
              padding: '14px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#3C3489'}
            onMouseLeave={e => e.currentTarget.style.background = '#26215C'}
          >
            <FiArrowLeft size={16} />
            Continue Shopping
          </button>

          <p style={{ fontSize: '11px', color: '#5F5E5A' }}>
            Powered by Safepay · 256-bit SSL
          </p>
        </div>
      </div>
    </div>
  )
}