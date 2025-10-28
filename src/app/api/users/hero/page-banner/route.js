import { getDB } from "@/lib/server/mongo";
export const runtime = "nodejs";
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    if (!title) {
      return new Response(
        JSON.stringify({ message: "Missing 'title' query parameter" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const db = await getDB();
    const slide = await db.collection("hero_slides").findOne({ title });
    if (!slide) {
      return new Response(JSON.stringify({ message: "Slide not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    slide._id = slide._id.toString();
    return new Response(JSON.stringify(slide), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("GET /api/hero/single error:", err);
    return new Response(JSON.stringify({ message: "Failed to fetch image" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}
