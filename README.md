# Lā Sol Enterprises Website

Static website for Lā Sol Enterprises — 100% Kona coffee, based on Oʻahu, sold locally and worldwide.

## Files
- `index.html` — home page
- `shop.html` — product page (100% Kona Coffee, 12 oz whole bean, $38.99)
- `cart.html` — shopping cart
- `checkout.html` — checkout form
- `about.html` — brand story
- `contact.html` — contact form
- `css/style.css` — all styling
- `js/cart.js` — cart logic (product list, cart storage, totals)

## How the cart works
The cart is a front-end demo: items are stored in the visitor's browser (localStorage), so it persists across pages but is not connected to a real payment processor or order database yet.

## To go live and accept real payments
1. **Host the site** — e.g. Netlify, Vercel, GitHub Pages, or your own hosting/domain.
2. **Connect a payment processor** — recommended: [Stripe Checkout](https://stripe.com/payments/checkout) (also good: Shopify, Square, PayPal). This replaces the demo card form in `checkout.html` with a secure, PCI-compliant flow, and can email order confirmations automatically.
3. **Connect the contact form** — e.g. [Formspree](https://formspree.io) or EmailJS, so messages from `contact.html` land in your inbox.
4. **Add product photos** — the product image is currently a CSS illustration; swap in real photos of your coffee bags/farm when ready.
5. **Update the pricing/product details** in `js/cart.js` (the `PRODUCTS` object) and `shop.html`/`index.html` as needed.

## Editing products
Product info lives in two places — keep them in sync:
- `js/cart.js` → `PRODUCTS` object (id, name, size, price)
- `shop.html` and `index.html` → the displayed price/description text

I can help wire up Stripe, hosting, or a domain whenever you're ready.
