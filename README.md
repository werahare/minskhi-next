# Minskhi Next.js rebuild

Production-oriented Next.js App Router rebuild of the Minskhi WordPress/WooCommerce site.

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run import-products -- ./path/to/woocommerce-products.csv ./path/to/wp-content/uploads
```

## Stripe Checkout

The shopping cart uses Stripe-hosted Checkout. Add `STRIPE_SECRET_KEY` to `.env.local` when the Stripe account is ready, then restart the application. Product names and prices are rebuilt on the server from `src/data/products.json`; the browser cannot submit its own prices.

Use a Stripe test secret key first. Before accepting live orders, configure the store's delivery rules and Stripe webhook/order-fulfilment process.

## Notes

- Product data is static and loaded from `src/data/products.json`.
- Prices are shown for selected products; unpriced products use the enquiry flow.
- Cart state is stored in `localStorage`; checkout is created server-side through Stripe.
- Enquiry list state is stored in `localStorage`; enquiry submission opens email or WhatsApp.
- Remote WordPress upload images from `minskhi.com/wp-content/uploads` are allowed in `next.config.ts`.

## Vercel

Import the repository in Vercel, keep the default Next.js framework settings, and deploy. No server-side database or admin backend is required.
