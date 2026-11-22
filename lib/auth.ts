import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db('wedplandb');

const isLoopbackURL = (value: string) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(?:\/|$)/i.test(value);

const toOrigin = (value?: string) => {
  if (!value) return undefined;
  try {
    return new URL(value).origin;
  } catch {
    return undefined;
  }
};

/**
 * Vercel exposes the real deployment host through `VERCEL_URL`, so it is used
 * whenever BETTER_AUTH_URL is missing or still points at localhost. Without
 * this, Better Auth builds callbacks/cookies for localhost and rejects the
 * Origin header sent by the deployed client, breaking sign-in and sign-up.
 */
function resolveBaseURL() {
  const configured = process.env.BETTER_AUTH_URL;
  if (configured && !isLoopbackURL(configured)) return configured;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return configured;
}

const staticTrustedOrigins = [
  ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  toOrigin(process.env.NEXT_PUBLIC_BETTER_AUTH_URL),
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
].filter((origin): origin is string => Boolean(origin));

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: resolveBaseURL(),
    // Better Auth always trusts the base URL origin. Also trust a request whose
    // Origin matches its own host (Vercel custom domains / preview aliases)
    // without trusting arbitrary cross-site origins.
    trustedOrigins: (request) => {
      const origins = [...staticTrustedOrigins];
      const origin = request?.headers.get("origin");
      const host =
        request?.headers.get("x-forwarded-host") ||
        request?.headers.get("host");
      const protocol =
        (request?.headers.get("x-forwarded-proto") || "https")
          .split(",")[0]
          .trim();
      if (origin && host && origin === `${protocol}://${host}`) {
        origins.push(origin);
      }
      return origins;
    },
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },
      user: {
       additionalFields: {
          role: {
              type: ['admin','customer','vendor'],
              input: true,
              required: false,
              defaultValue: 'customer',
            }
        }
    },
    socialProviders: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    } : undefined,

    database: mongodbAdapter(db, {
            client,
        }),
    });
