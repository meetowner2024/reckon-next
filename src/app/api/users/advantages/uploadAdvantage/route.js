import { getDB } from "@/lib/server/mongo";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { main_title, advantages } = body;

    if (!main_title || !Array.isArray(advantages)) {
      return new Response(
        JSON.stringify({ message: "main_title and advantages are required" }),
        { status: 400 }
      );
    }

    const db = await getDB();
    const existing = await db.collection("advantages").findOne({});

    const data = {
      main_title,
      advantages,
      updated_at: new Date(),
    };

    if (existing) {
      await db.collection("advantages").updateOne({}, { $set: data });
    } else {
      data.created_at = new Date();
      await db.collection("advantages").insertOne(data);
    }

    return new Response(
      JSON.stringify({
        message: existing
          ? "Advantages updated successfully"
          : "Advantages added successfully",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error uploading advantages:", err);
    return new Response(
      JSON.stringify({ message: "Failed to upload advantages" }),
      { status: 500 }
    );
  }
}
