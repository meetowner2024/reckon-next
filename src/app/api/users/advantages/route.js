import { getDB } from "@/lib/server/mongo";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDB();
    const data = await db.collection("advantages").findOne({});

    if (!data) {
      return new Response(
        JSON.stringify({ message: "No advantages found", data: null }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate",
      },
    });
  } catch (err) {
    console.error("Error fetching advantages:", err);
    return new Response(
      JSON.stringify({ message: "Failed to fetch advantages" }),
      { status: 500 }
    );
  }
}
