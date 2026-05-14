import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const TO_EMAIL = 'midecakesandcrafts@yahoo.com';
const FROM_EMAIL = 'noreply@midecakesandcrafts.co.uk';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const subjectMap: Record<string, string> = {
      'cake-order': 'Cake Order Enquiry',
      'cupcake-order': 'Cupcake Order Enquiry',
      'craft-order': 'Craft Order Enquiry',
      'custom-request': 'Custom Request',
      'general': 'General Question',
    };

    const subjectLabel = subjectMap[subject] ?? subject ?? 'General Enquiry';

    // Email to business owner
    const ownerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #f9a8c9, #fce4ec); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="margin: 0; color: #c2185b; font-size: 24px;">New Contact Message</h1>
          <p style="margin: 8px 0 0; color: #ad1457;">Mide Cakes & Crafts</p>
        </div>
        <div style="background: #fff; padding: 30px; border: 1px solid #f0f0f0; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; font-weight: bold; width: 35%; color: #666;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; font-weight: bold; color: #666;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5;"><a href="mailto:${email}" style="color: #c2185b;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; font-weight: bold; color: #666;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; font-weight: bold; color: #666;">Subject</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5;">${subjectLabel}</td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <p style="font-weight: bold; color: #666; margin-bottom: 8px;">Message</p>
            <div style="background: #fafafa; border-left: 4px solid #f9a8c9; padding: 16px; border-radius: 4px; line-height: 1.6;">
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${email}" style="background: #c2185b; color: white; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block;">Reply to ${name}</a>
          </div>
        </div>
        <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 16px;">Mide Cakes &amp; Crafts &mdash; Chelmsford, Essex</p>
      </div>
    `;

    // Confirmation email to customer
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #f9a8c9, #fce4ec); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="margin: 0; color: #c2185b; font-size: 24px;">Thanks for getting in touch! 🎂</h1>
          <p style="margin: 8px 0 0; color: #ad1457;">Mide Cakes & Crafts</p>
        </div>
        <div style="background: #fff; padding: 30px; border: 1px solid #f0f0f0; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
          <p style="line-height: 1.6;">Thank you for reaching out to Mide Cakes & Crafts! We've received your message and will get back to you within <strong>24 hours</strong>.</p>
          <div style="background: #fafafa; border-left: 4px solid #f9a8c9; padding: 16px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #666;">Your message:</p>
            <p style="margin: 8px 0 0; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="line-height: 1.6;">For urgent enquiries, you can reach us directly at:</p>
          <p style="line-height: 1.6;">📞 <a href="tel:07588635343" style="color: #c2185b;">07588 635343</a><br/>
          📧 <a href="mailto:midecakesandcrafts@yahoo.com" style="color: #c2185b;">midecakesandcrafts@yahoo.com</a></p>
          <div style="margin-top: 24px; text-align: center;">
            <a href="https://midecakesandcrafts.co.uk" style="background: #c2185b; color: white; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block;">Visit Our Website</a>
          </div>
        </div>
        <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 16px;">Mide Cakes &amp; Crafts &mdash; Chelmsford, Essex</p>
      </div>
    `;

    // Send to business owner
    const res1 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New Enquiry: ${subjectLabel} from ${name}`,
        html: ownerHtml,
      }),
    });

    // Send confirmation to customer
    const res2 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: `We've received your message — Mide Cakes & Crafts`,
        html: customerHtml,
      }),
    });

    if (!res1.ok || !res2.ok) {
      const err = await res1.text();
      throw new Error(`Resend error: ${err}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-contact-email error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
