# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Build & Run Commands

```bash
npm run build          # Production build (Next.js 16)
npm run dev            # Dev server with hot reload
npm run start          # Start production server (port 3000)
npm run lint           # ESLint
pm2 start ecosystem.config.js   # Production via pm2 (binds 0.0.0.0:3000)
pm2 logs baker-hub     # View production logs
```

No test framework is configured.

## Architecture

Single-page tabbed dashboard built with **Next.js 16.2.2**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Runs on a home LAN as a PWA (iOS kiosk mode supported via manifest.json + apple-web-app meta).

### Tab System

`page.tsx` is a client component that owns tab state (`"calendar" | "weather" | "atm"`). It renders **two navigation variants** for the same tabs:

- **Mobile**: bottom tab bar inlined in `page.tsx` (visible below `md` breakpoint)
- **Desktop**: left sidebar via `Sidebar.tsx` (visible at `md`+)

The layout flips with `flex-col-reverse md:flex-row`. Tab content is conditionally rendered (not routed).

### Tab Views

- **CalendarView** / **ATMView** — thin iframe wrappers (Canva calendar embed, VaultQuest ATM embed) with a loading spinner overlay
- **WeatherView** — custom-built weather display that fetches from `/api/weather` on mount, then polls every 30 minutes

### Weather API

`src/app/api/weather/route.ts` — server-side route that proxies Open-Meteo (no API key needed). Hardcoded to Glen Ellyn, IL (41.8775, -88.0673). Returns current conditions + 5-day forecast. Cached via `Cache-Control` headers.

### Styling

Tailwind v4 with a custom color theme defined in `globals.css` using `@theme` — reference colors as `bg-bg`, `bg-sidebar`, `bg-sidebar-active`, `text-accent`, `text-text-primary`, `text-text-secondary`. All icons are inline SVGs in `Icons.tsx` using `currentColor`.

### Design Constraints

This app is used by a 6-year-old. Tab buttons and touch targets must stay large and easy to press (32px icons, `text-lg` labels, generous padding). Do not shrink the UI.
