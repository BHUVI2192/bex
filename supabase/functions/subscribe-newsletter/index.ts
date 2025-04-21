
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()
    
    if (!email) {
      throw new Error("Email is required")
    }

    console.log("Sending confirmation email to:", email)

    // Send confirmation email to subscriber
    const { data, error } = await resend.emails.send({
      from: 'BharatEsports Express <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to BharatEsports Express Newsletter!',
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>You're now subscribed to receive the latest gaming news from BharatEsports Express.</p>
        <p>Stay tuned for exciting updates!</p>
        <p>Follow us on social media:</p>
        <p>
          <a href="https://instagram.com/bharatesports.bgmi">Instagram</a><br>
          <a href="https://youtube.com/@BharatEsports">YouTube</a>
        </p>
      `
    })

    // Send notification to admin
    await resend.emails.send({
      from: 'BharatEsports Express <onboarding@resend.dev>',
      to: ['bharatesports.bgmi@gmail.com'],
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p>A new user has subscribed to your newsletter:</p>
        <p><strong>Email:</strong> ${email}</p>
      `
    });

    if (error) {
      console.error("Resend API error:", error)
      throw error
    }

    console.log("Email sent successfully:", data)

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error sending confirmation:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to process subscription' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
