import { getDB } from "@/lib/server/mongo";

export const runtime = "nodejs";
export async function GET() {
  try {
    const db = await getDB();
    const features = await db
      .collection("whychooseus")
      .find({})
      .sort({ updated_at: -1 })
      .toArray();
    return new Response(JSON.stringify(features), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "public, s-maxage=86400, max-age=3600, stale-while-revalidate=60",
      },
    });
  } catch (err) {
    console.error("Error fetching WhyChooseUs:", err);
    return new Response(JSON.stringify({ message: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
