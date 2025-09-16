import "server-only";
import { NextResponse } from "next/server";
import { CartItem } from "@/types/product"; // dina typer
import { stripe } from "@/lib/stripe";

export const POST = async (request: Request) => {
  try {
    // 2️⃣ Läs cart-data från frontend
    const { products }: { products: CartItem[] } = await request.json();

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 3️⃣ Skapa line_items för Stripe
    const lineItems = products.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.product.price * 100), // cent
        product_data: {
          name: item.product.name,
        },
      },
      quantity: item.quantity,
    }));

    // 4️⃣ Skapa Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/`,
      // `https://lily-gem-a9mk.vercel.app/sucess`
      // `https://lily-gem-a9mk.vercel.app/`
    });

    if (!session.url) throw new Error("Failed to create Stripe session");

    // 5️⃣ Returnera URL till frontend
    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Failed to create checkout session",
      },
      { status: 500 }
    );
  }
};
