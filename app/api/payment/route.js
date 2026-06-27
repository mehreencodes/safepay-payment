import axios from 'axios'

export async function POST(req) {
  try {
    const body = await req.json()
    const { amount, currency, customer, product } = body

    const publicKey = process.env.NEXT_PUBLIC_SAFEPAY_PUBLIC_KEY
    const secretKey = process.env.SAFEPAY_SECRET_KEY

    const baseUrl = 'https://sandbox.api.getsafepay.com'

    const trackerRes = await axios.post(
      `${baseUrl}/order/v1/init`,
      {
        client: publicKey,
        environment: 'sandbox',
        currency: 'PKR',
        amount: amount * 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-SFPY-MERCHANT-SECRET': secretKey,
        }
      }
    )

    console.log('Safepay response:', JSON.stringify(trackerRes.data, null, 2))

    const tracker = trackerRes.data?.data?.token

    if (!tracker) {
      return Response.json({ error: 'Failed to create tracker' }, { status: 500 })
    }

    return Response.json({ tracker })

  } catch (err) {
    console.error('Safepay error:', err?.response?.data || err.message)
    return Response.json(
      { error: err?.response?.data?.status?.message || 'Payment failed' },
      { status: 500 }
    )
  }
}