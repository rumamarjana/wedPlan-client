import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db('wedplandb');

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: (process.env.BETTER_AUTH_TRUSTED_ORIGINS || "").split(",").filter(Boolean),
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