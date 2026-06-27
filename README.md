# 💳 Safepay Payment Integration

A full-stack payment system built with **Next.js** and **Safepay** — Pakistan's leading payment gateway. This project demonstrates a real-world checkout experience with secure backend API integration.

🔗 **Live Demo:** [safepay-payment-beta.vercel.app](https://safepay-payment-beta.vercel.app)

---

## ✨ Features

- 🔒 Secure server-side API key handling
- 💳 Real payment processing via Safepay
- 📱 Fully responsive — works on mobile & desktop
- 🎨 Clean, modern checkout UI
- ⚡ Built with Next.js App Router

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React, React Icons |
| Backend | Next.js API Routes (Node.js) |
| Payment Gateway | Safepay (Pakistan) |
| Deployment | Vercel |
| HTTP Client | Axios |

---

## 🚀 How It Works

```
User fills checkout form
        ↓
Frontend calls /api/payment (Next.js Backend)
        ↓
Backend sends request to Safepay API
        ↓
Safepay returns a payment tracker token
        ↓
User is redirected to Safepay hosted checkout
        ↓
Payment complete → Success page
```

---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/mehreencodes/safepay-payment.git
cd safepay-payment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_SAFEPAY_PUBLIC_KEY=your_public_key
SAFEPAY_SECRET_KEY=your_secret_key
NEXT_PUBLIC_SAFEPAY_ENV=sandbox
```

> Get your keys from [sandbox.api.getsafepay.com](https://sandbox.api.getsafepay.com)

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🧪 Test Payment

Use these test card details on the Safepay checkout page:

| Field | Value |
|---|---|
| Card Number | `4111 1111 1111 1111` |
| Expiry | `12/26` |
| CVV | `123` |

---

## 📁 Project Structure

```
safepay-payment/
├── app/
│   ├── api/
│   │   └── payment/
│   │       └── route.js      # Backend API — Safepay integration
│   ├── checkout/
│   │   └── page.jsx          # Checkout page UI
│   ├── success/
│   │   └── page.jsx          # Payment success page
│   └── page.tsx              # Redirects to /checkout
├── .env.local                # API keys (not committed)
└── README.md
```

---

## 🔐 Security

- Secret API key is stored server-side only — never exposed to the frontend
- All payments are processed through Safepay's PCI DSS compliant infrastructure
- 256-bit SSL encryption on all transactions

---

## 📦 Going to Production

1. Create a Safepay Production account at [getsafepay.com](https://getsafepay.com)
2. Submit KYC documents (CNIC + bank account)
3. Get production API keys
4. Update `.env.local`:
```env
NEXT_PUBLIC_SAFEPAY_PUBLIC_KEY=your_production_public_key
SAFEPAY_SECRET_KEY=your_production_secret_key
NEXT_PUBLIC_SAFEPAY_ENV=production
```

---

## 👩‍💻 Author

**Mehreen Khalid**  
[GitHub](https://github.com/mehreencodes) · [LinkedIn](https://www.linkedin.com/in/mehreen-khalid-53bbbb361/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BYjGFe%2B5cSimaBCrfvbx5mg%3D%3D)

