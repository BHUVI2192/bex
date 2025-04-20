
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()

    // Send confirmation email to subscriber
    const { data, error } = await resend.emails.send({
      from: 'BharatEsports Express <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to BharatEsports Express Newsletter!',
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You're now subscribed to receive the latest gaming news from BharatEsports Express.</p>
        <p>Stay tuned for exciting updates!</p>
      `
    })

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error sending confirmation:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process subscription' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
