import { getDB } from "@/lib/server/mongo";

export async function GET() {
  try {
    const db = await getDB();
    const header = await db.collection("header").findOne({});
    return new Response(
      JSON.stringify({
        phone: header?.phone || "+91 88860 77745",
        icon: header?.icon || "Phone",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (err) {
    console.error("GET /api/header error", err);
    return new Response(JSON.stringify({ message: "Failed to fetch header" }), {
      status: 500,
    });
  }
}
