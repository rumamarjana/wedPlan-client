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

## Deployment

Set all environment variables in the hosting provider. `NEXT_PUBLIC_API_BASE_URL` must point to the deployed Express API and `BETTER_AUTH_URL` must point to the deployed client origin.

Live website: Add the production URL here.

Client repository: Add the production repository URL here.
