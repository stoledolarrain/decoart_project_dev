# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

DecoArt is a frontend-only e-commerce SPA for a balloon-bouquet shop in Santa Cruz de la Sierra, Bolivia (university project). Prices are in Bolivianos (Bs.).

**Scope is intentionally UI-only.** All data (products, users, orders, payments, delivery) is fictional and simulated in the browser. Do not add a backend, API calls, databases, real auth or real payment integrations; new features should extend the mock data in `src/data/` and the simulated flows in the contexts. All UI text, identifiers for categories/sort keys, and comments are in Spanish — keep new user-facing copy in Spanish.

Stack: React 19 + TypeScript 7 + Vite 8, Tailwind CSS 3, Leaflet (delivery map), `qrcode.react` (QR payment), `canvas-confetti`, `lucide-react` icons.

## Commands

```bash
npm install
npm run dev       # Vite dev server
npm run build     # tsc -b (type check) then vite build
npm run lint      # oxlint (config in .oxlintrc.json)
npm run preview   # serve the production build
```

There is no test suite. `npm run build` is the type-check gate; `tsconfig.app.json` enables `noUnusedLocals`/`noUnusedParameters`, `verbatimModuleSyntax` (use `import type` for type-only imports) and `erasableSyntaxOnly` (no `enum`s or parameter properties).

## Architecture

- **No backend, no router.** Everything is mocked client-side. Products come from the static `PRODUCTS` array in `src/data/products.ts`; delivery zones, fees and the workshop location from `src/data/zones.ts`. Order "payment" in `CheckoutView` is a simulated QR flow (timeout, then marks the order `paid`).
- **View switching via context.** `App.tsx` renders one of four views based on `currentView` (`'catalog' | 'checkout' | 'custom-bouquet' | 'confirmation'`) held in `CartContext`. Navigate by calling `setCurrentView(...)`, not by adding routes. Catalog filtering/sorting state lives in `MainContent` in `App.tsx`.
- **Two global contexts** (`src/context/`), wrapped as `AuthProvider > CartProvider`:
  - `CartContext` — cart items, coupons, current view, `lastOrder` (passed from checkout to confirmation), and the product detail modal selection. Cart line IDs are a hash of product id + customization, so the same product with different customizations is a separate line. Coupon codes (`DECO10`, `BIENVENIDO15`, `EXPRESS`) are hardcoded in `applyCoupon`.
  - `AuthContext` — fake auth; defaults to a guest user, registration grants the `BIENVENIDO15` coupon. No real credentials.
  - Both persist to `localStorage` (`decoart_cart`, `decoart_user`).
- **Delivery pricing** is geographic: `SantaCruzMap` (Leaflet) lets the user drop a pin, and `calculateSantaCruzRing(lat, lng)` in `zones.ts` maps it to a Santa Cruz "anillo" (ring) and fee (flat fee inside the 4th ring). Pickup uses `TALLER_LOCATION`. Leaflet CSS is imported in `src/index.css`.
- **Domain types** are centralized in `src/types/index.ts` (`Product`, `CartItem`, `CustomizationSelection`, `DeliveryDetails`, `Order`, `User`). Product `category` is a closed union — adding a category requires updating the type, the data, and `CategoryFilters`.
- **No emojis in the UI.** Use `lucide-react` icons instead (text, buttons, headings, toasts, empty states). Decorative emojis are simply omitted. For Leaflet markers/popups, which take HTML strings, mount the icon into a DOM element with `createRoot` and pass the element as the divIcon `html` (see `markerIconElement` in `SantaCruzMap`); avoid `react-dom/server`, which adds ~200 kB to the bundle. The prefilled WhatsApp message text in `CustomBouquetPage` is not UI and is exempt.
- **Styling:** Tailwind utility classes with a custom `deco` palette in `tailwind.config.js` (e.g. `bg-deco-pink`, `text-deco-gold`). Static images are served from `public/resources/` and referenced as `/resources/...` (the root `resources/` folder is a source copy, not served).
