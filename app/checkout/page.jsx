'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiUser, FiMail, FiPhone, FiLock, FiShield, FiTruck, FiRefreshCw, FiTag, FiCheckCircle } from 'react-icons/fi'

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const product = {
    name: 'Mechanical Keyboard',
    desc: 'RGB · Brown Switches · Wireless',
    price: 8499,
    original: 10999,
    emoji: '⌨️',
  }

  const discount = product.original - product.price

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handlePayment = async () => {
    if (!form.name || !form.email || !form.phone) {
      setError('Please fill in all fields')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('/api/payment', {
        amount: product.price,
        currency: 'PKR',
        customer: form,
        product: product.name,
      })
      const { tracker } = res.data
      localStorage.setItem('order', JSON.stringify({
        tracker, product: product.name, amount: product.price, customer: form,
      }))
const baseCheckoutUrl = 'https://sandbox.api.getsafepay.com/checkout'
const redirectUrl = `${baseCheckoutUrl}?env=sandbox&beacon=${tracker}&source=website&redirect_url=${window.location.origin}/success&cancel_url=${window.location.origin}/checkout`
      window.location.href = redirectUrl
    } catch (err) {
      setError('Payment failed. Please try again.')
      setLoading(false)
    }
  }

  const fields = [
    { label: 'Full name', name: 'name', type: 'text', placeholder: 'Ahmed Ali', Icon: FiUser },
    { label: 'Email address', name: 'email', type: 'email', placeholder: 'ahmed@example.com', Icon: FiMail },
    { label: 'Phone number', name: 'phone', type: 'tel', placeholder: '03001234567', Icon: FiPhone },
  ]

  const trust = [
    { Icon: FiShield, text: 'SSL secured' },
    { Icon: FiRefreshCw, text: '7-day return' },
    { Icon: FiTruck, text: 'Free delivery' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0d14',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '16px' : '20px',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div style={{
        width: '100%',
        maxWidth: '820px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        borderRadius: isMobile ? '16px' : '20px',
        overflow: 'hidden',
        border: '0.5px solid rgba(255,255,255,0.08)',
      }}>

        {/* LEFT — Product Info */}
        <div style={{
          background: '#13131f',
          padding: isMobile ? '24px 20px' : '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '16px' : '24px',
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(83,74,183,0.15)', border: '0.5px solid rgba(83,74,183,0.3)',
            borderRadius: '20px', padding: '4px 12px', width: 'fit-content',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1D9E75', flexShrink: 0 }} />
            <span style={{ fontSize: '11px', color: '#AFA9EC', fontWeight: '500', letterSpacing: '0.3px' }}>Secure checkout</span>
          </div>

          {/* Product */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: isMobile ? '56px' : '72px',
              height: isMobile ? '56px' : '72px',
              background: 'rgba(83,74,183,0.12)', border: '0.5px solid rgba(83,74,183,0.2)',
              borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: isMobile ? '24px' : '32px', flexShrink: 0,
            }}>{product.emoji}</div>
            <div>
              <p style={{ fontSize: isMobile ? '17px' : '20px', fontWeight: '500', color: '#EEEDFE', marginBottom: '4px' }}>{product.name}</p>
              <p style={{ fontSize: '12px', color: '#5F5E5A' }}>{product.desc}</p>
            </div>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: '500', color: '#EEEDFE' }}>
                Rs {product.price.toLocaleString()}
              </span>
              <span style={{ fontSize: '14px', color: '#444441', textDecoration: 'line-through' }}>
                Rs {product.original.toLocaleString()}
              </span>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              background: 'rgba(29,158,117,0.12)', border: '0.5px solid rgba(29,158,117,0.25)',
              borderRadius: '8px', padding: '4px 10px', width: 'fit-content',
            }}>
              <FiTag size={12} color="#1D9E75" />
              <span style={{ fontSize: '12px', color: '#1D9E75', fontWeight: '500' }}>You save Rs {discount.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />

          {/* Order Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ fontSize: '11px', color: '#5F5E5A', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Order summary</p>
            {[
              { label: product.name, val: `Rs ${product.original.toLocaleString()}` },
              { label: `Discount (${Math.round(discount / product.original * 100)}% off)`, val: `-Rs ${discount.toLocaleString()}`, green: true },
              { label: 'Shipping', val: 'Free', green: true },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#888780' }}>{row.label}</span>
                <span style={{ fontSize: '13px', color: row.green ? '#1D9E75' : '#D3D1C7', fontWeight: '500' }}>{row.val}</span>
              </div>
            ))}
            <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#EEEDFE', fontWeight: '500' }}>Total</span>
              <span style={{ fontSize: '18px', color: '#AFA9EC', fontWeight: '500' }}>Rs {product.price.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {trust.map(({ Icon, text }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#5F5E5A' }}>
                <Icon size={13} color="#3C3489" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Form */}
        <div style={{
          background: '#ffffff',
          padding: isMobile ? '24px 20px' : '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: isMobile ? '16px' : '20px',
        }}>
          <div>
            <h1 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '500', color: '#1a1a2e', marginBottom: '4px' }}>
              Complete your order
            </h1>
            <p style={{ fontSize: '13px', color: '#888780' }}>Enter your details to continue</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {fields.map(({ label, name, type, placeholder, Icon }) => (
              <div key={name}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#444441', display: 'block', marginBottom: '6px' }}>{label}</label>
                <div style={{ position: 'relative' }}>
                  <Icon size={15} color="#B4B2A9" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      paddingLeft: '38px', paddingRight: '14px',
                      paddingTop: '12px', paddingBottom: '12px',
                      border: '0.5px solid #D3D1C7', borderRadius: '10px',
                      fontSize: '14px', color: '#1a1a2e',
                      background: '#F1EFE8', outline: 'none',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#534AB7'; e.target.style.background = '#fff' }}
                    onBlur={e => { e.target.style.borderColor = '#D3D1C7'; e.target.style.background = '#F1EFE8' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div style={{
              background: '#FCEBEB', border: '0.5px solid #F09595',
              borderRadius: '10px', padding: '10px 14px',
              fontSize: '13px', color: '#A32D2D',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <FiShield size={14} color="#A32D2D" /> {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={handlePayment}
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#B4B2A9' : '#26215C',
                color: '#EEEDFE',
                border: 'none',
                borderRadius: '12px',
                padding: '15px',
                fontSize: '15px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#3C3489' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#26215C' }}
            >
              <FiLock size={16} />
              {loading ? 'Redirecting...' : `Pay Rs ${product.price.toLocaleString()}`}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px', color: '#B4B2A9' }}>
              <FiCheckCircle size={12} color="#1D9E75" />
              256-bit SSL · Powered by Safepay
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {['Visa', 'Mastercard', 'JazzCash', 'Easypaisa'].map((c) => (
                <span key={c} style={{
                  background: '#F1EFE8', border: '0.5px solid #D3D1C7',
                  borderRadius: '6px', padding: '3px 10px',
                  fontSize: '11px', fontWeight: '500', color: '#5F5E5A',
                }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}