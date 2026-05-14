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
    const {
      name, email, phone,
      productType, cakeSize, flavour, decoration,
      eventDate, quantity, deliveryMethod, address,
      specialRequests, referenceImages,
    } = await req.json();

    if (!name || !email || !productType || !eventDate) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const productLabels: Record<string, string> = {
      cake: 'Custom Cake',
      cupcakes: 'Cupcakes',
      crafts: 'Handmade Crafts',
      snacks: 'Nigerian Snacks',
      toppers: 'Cake Toppers',
      combo: 'Cake + Crafts Combo',
    };

    const deliveryLabel = deliveryMethod === 'delivery' ? 'Local Delivery' : 'Collection (Chelmsford)';
    const productLabel = productLabels[productType] ?? productType;

    const row = (label: string, value: string) =>
      value ? `<tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; font-weight: bold; width: 40%; color: #666; vertical-align: top;">${label}</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f5f5f5; vertical-align: top;">${value}</td>
      </tr>` : '';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #f9a8c9, #fce4ec); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="margin: 0; color: #c2185b; font-size: 24px;">New Order Received!</h1>
          <p style="margin: 8px 0 0; color: #ad1457;">Mide Cakes & Crafts</p>
        </div>
        <div style="background: #fff; padding: 30px; border: 1px solid #f0f0f0; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="color: #c2185b; font-size: 16px; margin: 0 0 16px;">Customer Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${row('Name', name)}
            ${row('Email', `<a href="mailto:${email}" style="color: #c2185b;">${email}</a>`)}
            ${row('Phone', phone || 'Not provided')}
          </table>

          <h2 style="color: #c2185b; font-size: 16px; margin: 24px 0 16px;">Order Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${row('Product', productLabel)}
            ${row('Quantity', quantity)}
            ${cakeSize ? row('Size', cakeSize) : ''}
            ${flavour ? row('Flavour', flavour) : ''}
            ${decoration ? row('Theme / Decoration', decoration) : ''}
          </table>

          <h2 style="color: #c2185b; font-size: 16px; margin: 24px 0 16px;">Delivery & Date</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${row('Event / Collection Date', eventDate)}
            ${row('Delivery Method', deliveryLabel)}
            ${address ? row('Delivery Address', address) : ''}
          </table>

          ${specialRequests ? `
          <div style="margin-top: 24px;">
            <p style="font-weight: bold; color: #666; margin-bottom: 8px;">Special Requests / Allergies</p>
            <div style="background: #fafafa; border-left: 4px solid #f9a8c9; padding: 16px; border-radius: 4px; line-height: 1.6;">
              ${specialRequests.replace(/\n/g, '<br/>')}
            </div>
          </div>` : ''}

          ${referenceImages ? `
          <div style="margin-top: 16px; padding: 12px; background: #fff8f9; border-radius: 8px; border: 1px solid #fce4ec;">
            <p style="margin: 0; font-size: 13px; color: #666;"><strong>Reference Images:</strong> ${referenceImages}</p>
          </div>` : ''}

          <div style="margin-top: 28px; text-align: center;">
            <a href="mailto:${email}" style="background: #c2185b; color: white; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block;">Reply to ${name}</a>
          </div>
        </div>
        <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 16px;">Mide Cakes &amp; Crafts &mdash; Chelmsford, Essex</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New Order: ${productLabel} from ${name} — ${eventDate}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }


    // Send confirmation to customer
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: linear-gradient(135deg, #f9a8c9, #fce4ec); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="margin: 0; color: #c2185b; font-size: 24px;">Order Received! 🎂</h1>
          <p style="margin: 8px 0 0; color: #ad1457;">Mide Cakes & Crafts</p>
        </div>
        <div style="background: #fff; padding: 30px; border: 1px solid #f0f0f0; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
          <p style="line-height: 1.6;">Thank you for placing an order with Mide Cakes & Crafts! We've received your order and will review the details and contact you within <strong>24 hours</strong> to confirm and arrange payment.</p>
          <div style="background: #fafafa; border-left: 4px solid #f9a8c9; padding: 16px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #666;">Order Summary:</p>
            <p style="margin: 4px 0;">🎂 <strong>Product:</strong> ${productLabel}</p>
            <p style="margin: 4px 0;">📅 <strong>Event Date:</strong> ${eventDate}</p>
            <p style="margin: 4px 0;">🚗 <strong>Delivery:</strong> ${deliveryLabel}</p>
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

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: `Your order has been received — Mide Cakes & Crafts`,
        html: customerHtml,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-order-email error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
