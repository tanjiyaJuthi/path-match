import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.AUTH_DB_NAME);

const googleClient = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: { 
        enabled: true, 
    },
    socialProviders: {
        google: { 
            clientId: googleClient, 
            clientSecret: googleSecret, 
        }, 
    },
    user: {
       additionalFields: {
          role: {
              default: 'seeker'
            } 
        }
    }
});