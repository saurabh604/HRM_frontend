# HR NextGen UI (React + Vite)

A modern HR management UI with sections for Attendance, Employee Database, Recruitment, Payroll, and Compliance. Built with React + Vite and Tailwind (CDN) for zero-config startup.

## Run locally

1. Install Node.js 18+
2. Install deps:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```

Then open the URL shown (default `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Notes
- Tailwind is loaded via CDN in `index.html` for simplicity. For production, consider proper Tailwind build integration.
- Simple hash-based router in `src/router/useHashRouter.js`.
- Views live under `src/views/*`.
