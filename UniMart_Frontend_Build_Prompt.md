# UniMart Frontend Build Prompt (for Google Antigravity)

> Copy everything inside the fenced block below and paste it into Antigravity as your build prompt. It is written so the IDE's AI agent has the exact stack, structure, and design direction it needs to generate the project in one pass, matching Guide 02: Frontend Environment Setup.

---

```
You are building the frontend for "UniMart" — a full-stack e-commerce marketplace
student project — inside a fresh Vite workspace. Follow the stack and structure
below exactly. Do not substitute alternative libraries or folder layouts.

## 1. Tech stack (non-negotiable)
- React + TypeScript, scaffolded with Vite (`react-ts` template), Node 22.12+.
- State management: Redux Toolkit + React Redux, with typed hooks
  (`useAppDispatch`, `useAppSelector`) in `src/app/hooks.ts`.
- UI kit: Material UI (`@mui/material`, `@mui/icons-material`, `@emotion/react`,
  `@emotion/styled`, `@fontsource/roboto`) — use for accessible interactive
  components (buttons, dialogs, forms, nav) and as the single source of theme
  tokens (palette, typography, shape).
- Styling: Tailwind CSS v4 via the official `@tailwindcss/vite` plugin — use
  ONLY for layout, spacing, grid/flex utilities, and responsive behavior.
  Never apply MUI `sx` and a Tailwind utility to the same CSS property on the
  same element (e.g. don't set both `sx={{ padding }}` and `p-4`).
- Routing: `react-router-dom` with `createBrowserRouter` and lazy-loaded route
  modules.
- Forms/validation: `react-hook-form`, `zod`, `@hookform/resolvers`.
- Env vars: only `VITE_`-prefixed variables in `.env.local` (gitignored) and
  `.env.example` (committed). Never place secrets, passwords, or API keys in
  any Vite env file.

## 2. Folder structure (feature-first — create exactly this)
src/
  app/            → store.ts, hooks.ts (global Redux config)
  assets/
  components/
    common/       → truly reusable, generic UI only
    feedback/     → loaders, empty states, toasts, error boundaries
  features/
    auth/         → authSlice.ts, authTypes.ts, components/, pages/
    listings/     → listingsApi.ts, listingTypes.ts, components/, pages/
    reviews/      → reviewsApi.ts, reviewTypes.ts, components/
  layouts/
  routes/         → AppRouter.tsx, ProtectedRoute.tsx
  services/       → baseApi.ts
  theme/          → theme.ts
  utils/
  App.tsx
  main.tsx
  index.css

Wrap the app in `main.tsx` in this order: Redux `<Provider>` → MUI
`<ThemeProvider>` + `<CssBaseline>` → `<App />`.

## 3. Design direction: "energetic futuristic marketplace"
UniMart should feel like a next-generation shopping command center — fast,
confident, alive — NOT a generic admin dashboard or another cream/serif
AI-template look. Treat this as a real visual identity, not a default theme
swap. Concretely:

- **Palette (define as MUI theme tokens + Tailwind CSS variables, 5–6 named
  hex values):** a deep space-navy/near-black base (e.g. `#0B0F1A`), one
  electric signature accent for primary actions (e.g. an electric violet or
  cyan, `#6C5CE7` or `#00E5FF`), a secondary energetic accent for highlights/
  badges/deals (e.g. a hot coral or lime, `#FF5C7A` or `#B4FF3C`), a soft
  off-white for high-contrast text on dark surfaces, and a muted slate for
  secondary text. Support a light mode using the same accents on a cool
  near-white base — don't just invert blindly, keep the accents feeling
  electric on both.
- **Typography:** pair a confident, slightly technical/geometric display
  face (e.g. Space Grotesk or Clash Display for headings, prices, and hero
  copy) with a clean, highly legible body face (e.g. Inter or Roboto) for
  descriptions and UI text. Use a mono face (e.g. JetBrains Mono) sparingly
  for SKUs, prices-as-data, or countdown timers to reinforce the
  "futuristic marketplace" feel.
- **Signature element:** design one memorable, on-brand moment — for example
  a glowing gradient-outline "product card" hover state with a subtle
  parallax tilt, or an animated live-stock/deal-countdown chip on listing
  cards. Spend the visual boldness here; keep surrounding chrome (nav,
  forms, tables) clean and disciplined so the signature element stands out.
- **Motion:** deliberate, not scattered — a orchestrated page-load fade/rise
  for the hero and first row of listings, smooth micro-interactions on
  hover/focus (button glow, card lift), and respect
  `prefers-reduced-motion`. Avoid animating everything; stillness elsewhere
  makes the signature moments land.
- **Layout:** bold hero on the listings/home page (headline + live search or
  featured deal, not just a stat block), clear card-grid for listings with
  generous spacing, sticky/glassy top nav (subtle blur + translucency over
  the dark base), and accessible contrast throughout (WCAG AA minimum) even
  with the dark, saturated palette.
- **Voice/copy:** confident and plain — buttons say what they do ("Add to
  cart", "Track order"), empty/error states explain what happened and what
  to do next in the interface's voice, no filler or fake urgency.
- Responsive down to mobile; visible keyboard focus states everywhere;
  don't let Tailwind and MUI fight over the same property.

## 4. Build steps
1. Scaffold with `npm create vite@latest unimart-frontend -- --template react-ts`,
   install, verify `npm run dev` works, then remove starter demo assets/CSS.
2. Create the folder structure in section 2.
3. Install and wire up Redux Toolkit (`store.ts`, `hooks.ts`), MUI (theme with
   the palette/type tokens above), and Tailwind v4 via the Vite plugin
   (`@import "tailwindcss";` in `index.css`).
4. Install `react-router-dom`, `react-hook-form`, `zod`,
   `@hookform/resolvers`; scaffold `AppRouter.tsx` with lazy routes for
   listings, listing details, and login, plus a `ProtectedRoute.tsx`.
5. Build the theme (`theme.ts`) and global CSS variables to match section 3
   exactly — this is the part that should NOT default to a generic look.
6. Build the home/listings page as the first real proof of the design
   direction: hero, search, and a listing-card grid using the signature
   hover/interaction element.
7. Add `.env.local` and `.env.example` with `VITE_API_BASE_URL=http://localhost:8080/api/v1`.
8. Run `npm run build` and `npm run lint`; fix all TypeScript/ESLint errors
   before stopping.

Do not insert any real passwords, tokens, student data, or assessment
answers into the workspace or into prompts while building.
```

---

## Notes for you (not part of the prompt)

- This prompt intentionally locks the **stack and folder structure** to Guide 02 so nothing drifts, while leaving the **design system** open enough for Antigravity's agent to make real creative choices instead of falling back to a generic dashboard theme.
- If Antigravity's output still feels generic, the fastest fix is to point back at Section 3 and ask it to "revise the palette/type/signature element to be more specific to UniMart" rather than regenerating from scratch.
- Suggested next prompt after this one: ask the agent to generate the `listings` and `auth` features (slice + API + pages) using the same theme tokens, one feature at a time, so you can review each diff before moving on — per the guide's "read generated diffs" responsible-use note.
