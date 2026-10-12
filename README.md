# Sagar Rathod — 3D Product Portfolio

Vite + React + TypeScript + Tailwind + React Three Fiber + Framer Motion.

## Run
```bash
npm install
npm run dev      # local dev
npm run build    # type-check + production build
npm run preview  # serve the build
```

## Edit content
All text lives in `src/data.ts`. Avatars: `public/avatars/`. Resume: `public/resume/Sagar-Rathod-Resume.pdf`.

## Deploy
Push to GitHub; Vercel redeploys automatically (framework Vite, build `npm run build`, output `dist`). No environment variables.

## Notes
The 3D hero falls back to a static avatar grid without WebGL or with reduced-motion. Case studies and teardowns are independent exercises, not employer projects.
