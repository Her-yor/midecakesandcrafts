import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const TO_EMAIL = 'midecakesandcrafts@yahoo.com';
const FROM_EMAIL = 'noreply@midecakesandcrafts.co.uk';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const phoneIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c2185b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z"/></svg>`;

const emailIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c2185b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;

const orderIcon = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" fill="#c2185b" stroke="none"/><path d="M9 11l3 3L22 4" stroke="#fff" stroke-width="2.5"/><path d="M9 11l3 3L22 4" stroke="#fff"/></svg>`;

const checkIcon = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" fill="#c2185b" stroke="none"/><polyline points="9,12 11,14 15,10" stroke="#ffffff" stroke-width="2.5"/></svg>`;

const cakeIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c2185b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1"/><path d="M2 21h20"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>`;

const calendarIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c2185b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

const truckIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c2185b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px;"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`;

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
        <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; width: 40%; color: #888; vertical-align: top; font-size: 14px;">${label}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top; color: #333; font-size: 15px;">${value}</td>
      </tr>` : '';

    // Owner email
    const ownerHtml = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px;">
        <div style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #c2185b, #f9a8c9); padding: 36px 30px; text-align: center;">
            <div style="margin-bottom: 16px;">${orderIcon}</div>
            <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">New Order Received!</h1>
            <p style="margin: 6px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Mide Cakes &amp; Crafts</p>
          </div>
          <div style="padding: 32px 30px;">
            <p style="font-size: 13px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px;">Customer Details</p>
            <table style="width: 100%; border-collapse: collapse;">
              ${row('Name', name)}
              ${row('Email', `<a href="mailto:${email}" style="color: #c2185b; text-decoration: none;">${email}</a>`)}
              ${row('Phone', phone || 'Not provided')}
            </table>

            <p style="font-size: 13px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin: 28px 0 12px;">Order Details</p>
            <table style="width: 100%; border-collapse: collapse;">
              ${row('Product', productLabel)}
              ${row('Quantity', quantity)}
              ${cakeSize ? row('Size', cakeSize) : ''}
              ${flavour ? row('Flavour', flavour) : ''}
              ${decoration ? row('Theme / Decoration', decoration) : ''}
            </table>

            <p style="font-size: 13px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin: 28px 0 12px;">Delivery &amp; Date</p>
            <table style="width: 100%; border-collapse: collapse;">
              ${row('Event / Collection Date', eventDate)}
              ${row('Delivery Method', deliveryLabel)}
              ${address ? row('Delivery Address', address) : ''}
            </table>

            ${specialRequests ? `
            <div style="margin-top: 24px;">
              <p style="font-size: 13px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">Special Requests / Allergies</p>
              <div style="background: #fdf6f9; border-left: 4px solid #c2185b; padding: 16px 20px; border-radius: 0 8px 8px 0; line-height: 1.7; color: #333; font-size: 15px;">
                ${specialRequests.replace(/\n/g, '<br/>')}
              </div>
            </div>` : ''}

            ${referenceImages ? `
            <div style="margin-top: 16px; padding: 12px 16px; background: #fdf6f9; border-radius: 8px; border: 1px solid #fce4ec;">
              <p style="margin: 0; font-size: 13px; color: #666;"><strong>Reference Images:</strong> ${referenceImages}</p>
            </div>` : ''}

            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${email}" style="background: #c2185b; color: #fff; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;">Reply to ${name}</a>
            </div>
          </div>
        </div>
        <p style="text-align: center; color: #bbb; font-size: 12px; margin-top: 20px;">Mide Cakes &amp; Crafts &mdash; Chelmsford, Essex</p>
      </div>
    `;

    // Customer confirmation email
    const customerHtml = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px;">
        <div style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #c2185b, #f9a8c9); padding: 36px 30px; text-align: center;">
            <div style="margin-bottom: 16px;">${checkIcon}</div>
            <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700;">Order Received!</h1>
            <p style="margin: 6px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Mide Cakes &amp; Crafts</p>
          </div>
          <div style="padding: 32px 30px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 0;">Hi <strong>${name}</strong>,</p>
            <p style="line-height: 1.7; color: #555; font-size: 15px;">Thank you for placing an order with Mide Cakes &amp; Crafts! We have received your order and will review the details and contact you within <strong style="color: #c2185b;">24 hours</strong> to confirm and arrange payment.</p>

            <div style="background: #fdf6f9; border-radius: 12px; padding: 20px 24px; margin: 24px 0;">
              <p style="font-size: 13px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 14px;">Order Summary</p>
              <p style="margin: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">${cakeIcon}<strong>Product:</strong> ${productLabel}</p>
              <p style="margin: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">${calendarIcon}<strong>Event Date:</strong> ${eventDate}</p>
              <p style="margin: 8px 0; color: #333; font-size: 15px; line-height: 1.6;">${truckIcon}<strong>Delivery:</strong> ${deliveryLabel}</p>
            </div>

            <p style="line-height: 1.6; color: #555; font-size: 15px;">For urgent enquiries, reach us directly at:</p>
            <p style="line-height: 2; color: #333; font-size: 15px;">
              ${phoneIcon}<a href="tel:07588635343" style="color: #c2185b; text-decoration: none;">07588 635343</a><br/>
              ${emailIcon}<a href="mailto:midecakesandcrafts@yahoo.com" style="color: #c2185b; text-decoration: none;">midecakesandcrafts@yahoo.com</a>
            </p>
            <div style="margin-top: 28px; text-align: center;">
              <a href="https://midecakesandcrafts.co.uk" style="background: #c2185b; color: #fff; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;">Visit Our Website</a>
            </div>
          </div>
        </div>
        <p style="text-align: center; color: #bbb; font-size: 12px; margin-top: 20px;">Mide Cakes &amp; Crafts &mdash; Chelmsford, Essex &mdash; <a href="https://midecakesandcrafts.co.uk" style="color: #bbb;">midecakesandcrafts.co.uk</a></p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New Order: ${productLabel} from ${name} — ${eventDate}`,
        html: ownerHtml,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
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
