
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactRequest {
  name: string
  email: string
  message: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, email, message }: ContactRequest = await req.json()
    
    if (!name || !email || !message) {
      throw new Error("Name, email, and message are required")
    }

    console.log("Sending contact form email from:", email)

    // Send message to admin
    const { data, error } = await resend.emails.send({
      from: 'BharatEsports Express <onboarding@resend.dev>',
      to: ['bharatesports.bgmi@gmail.com'],
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      reply_to: email
    })

    // Send confirmation to user
    await resend.emails.send({
      from: 'BharatEsports Express <onboarding@resend.dev>',
      to: [email],
      subject: 'We received your message!',
      html: `
        <h2>Thank you for contacting us, ${name}!</h2>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Follow us on social media:</p>
        <p>
          <a href="https://instagram.com/bharatesports.bgmi">Instagram</a><br>
          <a href="https://youtube.com/@BharatEsports">YouTube</a>
        </p>
        <p>Best regards,<br>The BharatEsports Express Team</p>
      `
    });

    if (error) {
      console.error("Resend API error:", error)
      throw error
    }

    console.log("Contact email sent successfully:", data)

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to send email' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
