# Cafe 16 Satyanagar

A responsive, single-page restaurant website for Cafe 16 Satyanagar in Bhubaneswar. It includes a heritage bungalow story, menu browsing, reservations, reviews, an ambience gallery, cart and checkout demonstrations, order tracking, and a role-based workforce portal demo.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Vite prints the local preview URL in the terminal (usually `http://localhost:3000`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Build the production site into `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

## Workforce portal demo

Open **Team Portal Demo** from the footer (or the mobile navigation) and use one of these demo accounts:

| Role | Username | PIN |
| --- | --- | --- |
| Staff | `staff` | `1010` |
| Manager | `manager` | `1616` |

The workforce roster, attendance, payroll, and assigned tasks are demonstration data held in browser memory. The credentials are checked in frontend code and are not secure authentication. Do not use this portal for real employee records or payroll without a protected backend.

## Deploy

The project is configured for Vercel and uses the Vite preset. Vercel should use:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

Connect the GitHub repository to Vercel and deploy the `main` branch. Pushing new commits to `main` will trigger new deployments.

## Project structure

```text
src/
  Components/   React pages and interface components
  Data/         Menu data
  App.jsx       Single-page composition and shared cart/order state
  main.jsx      React entry point
  index.css     Tailwind CSS entry point
```
