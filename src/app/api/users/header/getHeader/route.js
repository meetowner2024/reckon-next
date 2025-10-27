import { getDB } from "@/lib/server/mongo";
export async function GET(req) {
  try {
    const db = await getDB();
    const header = await db.collection("header").findOne({});
    if (!header) {
      return new Response(JSON.stringify({ message: "Header not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });
    }
    return new Response(
      JSON.stringify({
        logo: header.logo,
        phone: header.phone || null,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "public, s-maxage=86400, max-age=3600, stale-while-revalidate=60",
        },
      }
    );
  } catch (err) {
    console.error("Error fetching header:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}
