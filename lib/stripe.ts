// Säkerställer att den här filen bara körs på serversidan i Next.js
// (Stripe secret key får ALDRIG skickas till klienten)
import "server-only";

// Importerar Stripe-SDK:n som gör att vi kan prata med Stripes API
import Stripe from "stripe";

// Skapar en instans av Stripe-klienten med vår SECRET KEY
// SECRET KEY kommer från .env.local och kopplar upp oss mot vårt Stripe-konto
// Det är genom denna "stripe"-instans vi kan skapa sessions, betalningar m.m.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
