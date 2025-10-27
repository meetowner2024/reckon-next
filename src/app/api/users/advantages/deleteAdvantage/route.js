import { getDB } from "@/lib/server/mongo";

export const runtime = "nodejs";

export async function DELETE(req) {
  try {
    const { index } = await req.json();
    if (index === undefined) {
      return new Response(
        JSON.stringify({ message: "Index is required" }),
        { status: 400 }
      );
    }

    const db = await getDB();
    const existing = await db.collection("advantages").findOne({});

    if (!existing) {
      return new Response(
        JSON.stringify({ message: "No advantages found" }),
        { status: 404 }
      );
    }

    if (!Array.isArray(existing.advantages) || index >= existing.advantages.length) {
      return new Response(
        JSON.stringify({ message: "Invalid advantage index" }),
        { status: 400 }
      );
    }

    existing.advantages.splice(index, 1);

    await db.collection("advantages").updateOne(
      {},
      {
        $set: {
          advantages: existing.advantages,
          updated_at: new Date(),
        },
      }
    );

    return new Response(
      JSON.stringify({ message: "Advantage deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting advantage:", err);
    return new Response(
      JSON.stringify({ message: "Failed to delete advantage" }),
      { status: 500 }
    );
  }
}
