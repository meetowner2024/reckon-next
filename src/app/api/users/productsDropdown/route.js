import { getDB } from "@/lib/server/mongo";
export const runtime = "nodejs";
export async function GET() {
  try {
    const db = await getDB();
    const products = await db
      .collection("products")
      .find({})
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET products dropdown error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to load products" }),
      { status: 500 }
    );
  }
}