import { getDB } from "@/lib/server/mongo";

export async function GET(req) {
  try {
    const db = await getDB();
    const slides = await db
      .collection("hero_slides")
      .find({})
      .sort({ id: 1 })
      .toArray();
    return new Response(JSON.stringify(slides), { status: 200 });
  } catch (err) {
    console.error("GET /api/hero error", err);
    return new Response(
      JSON.stringify({ message: "Failed to fetch hero slides" }),
      { status: 500 }
    );
  }
}
