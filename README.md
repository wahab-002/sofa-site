# Sofa Site — Starter Scaffold

Next.js 14 (App Router) + Tailwind + Supabase starter for a UK sofa store, built to be SEO-first
and funnel buyers to WhatsApp for cash-on-delivery orders.

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in your Supabase project URL and anon key.
3. In Supabase, create a `products` table with columns:
   `id (uuid), slug (text), name (text), category (text), price_gbp (numeric), description (text), image_url (text)`
4. Run locally:
   ```
   npm run dev
   ```
5. Deploy to Vercel: push to GitHub, then import the repo at vercel.com. Add the same env vars
   in the Vercel project settings.

## What's included

- `/` — home page, pulls products from Supabase (falls back to sample data if empty)
- `/products/[slug]` — product detail page with WhatsApp CTA
- `/category/[category]` — category listing page
- `/contact` — WhatsApp contact page
- `app/sitemap.ts` + `app/robots.ts` — auto-generated for SEO
- `lib/products.ts` — swap in real Supabase data once your `products` table is populated
- `components/WhatsAppButton.tsx` — update the phone number to your real WhatsApp number

## Next steps (see the 7-day checklist)

- Replace placeholder image blocks with real product photos
- Fill in real product descriptions using your Semrush keyword research
- Add schema markup (Product/Offer) once real product data is in
- Write 3–5 SEO guide articles as a `/blog` section
