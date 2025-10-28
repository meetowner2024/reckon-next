import { getDB } from "@/lib/server/mongo";
export const runtime = "nodejs";
export async function GET() {
  try {
    const db = await getDB();


    const products = await db.collection("products").find({}).toArray();

    const productList = products.map((p) => ({
      id: p._id,
      title: p.title,
    }));

    return new Response(JSON.stringify(productList),{
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "public, s-maxage=86400, max-age=3600, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("GET products dropdown error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to load products" }),
      { status: 500 }
    );
  }
}
