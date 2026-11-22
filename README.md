# WedPlan Client

WedPlan is a role-based wedding planning platform for customers, vendors, and administrators.

## Features

- Better Auth email/password and Google authentication
- Role-based customer, vendor, and admin dashboards
- Public service search, filtering, sorting, and service details
- Customer booking requests and vendor booking management
- Vendor service management and Premium subscription checkout
- Admin user, service, and transaction management
- Responsive UI with loading and toast feedback

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Better Auth
- Tailwind CSS
- MongoDB
- Express.js API

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The client runs at `http://localhost:3000`.

## Scripts

- `npm run dev`
- `npm run typecheck`
- `npm run build`
- `npm start`

## Environment Variables

See `.env.example`. Required values include the API URL, Better Auth URL/database/secret, trusted origins, Google OAuth credentials, and ImgBB key.

## Deployment (Vercel)

Set these project environment variables in Vercel:

- `NEXT_PUBLIC_API_BASE_URL` — the deployed Express API origin (for example `https://wed-plan-server-inky.vercel.app`).
- `BETTER_AUTH_DB_URL` and `BETTER_AUTH_SECRET` — the shared MongoDB connection string and auth secret.
- `BETTER_AUTH_TRUSTED_ORIGINS` — the deployed client origin(s), comma-separated, when different from the Vercel deployment URL.

`NEXT_PUBLIC_BETTER_AUTH_URL` and `BETTER_AUTH_URL` can stay at their localhost defaults: the browser client calls the current page origin at runtime and the server falls back to Vercel's built-in `VERCEL_URL`. If you set `BETTER_AUTH_URL`, use the **deployed client origin** (never `localhost`) — otherwise Better Auth rejects the request `Origin` and sign-in/sign-up fail.

For Google sign-in, add `https://<your-client-domain>/api/auth/callback/google` to the OAuth client's authorized redirect URIs.

Live website: Add the production URL here.

Client repository: Add the production repository URL here.
