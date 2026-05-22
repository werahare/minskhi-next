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

## Notes

- Product data is static and loaded from `src/data/products.json`.
- Prices are preserved in data but hidden by `src/config/site.ts`.
- Enquiry list state is stored in `localStorage`; enquiry submission opens email or WhatsApp.
- Remote WordPress upload images from `minskhi.com/wp-content/uploads` are allowed in `next.config.ts`.

## Vercel

Import the repository in Vercel, keep the default Next.js framework settings, and deploy. No server-side database or admin backend is required.
