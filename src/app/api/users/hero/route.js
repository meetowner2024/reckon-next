import { getDB } from "@/lib/server/mongo";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDB();
    const slides = await db
      .collection("hero_slides")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    const serialized = slides.map((s) => ({
      ...s,
      _id: s._id.toString(),
    }));

    return new Response(JSON.stringify(serialized), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("GET /api/hero error:", err);
    return new Response(JSON.stringify({ message: "Failed to fetch slides" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}
