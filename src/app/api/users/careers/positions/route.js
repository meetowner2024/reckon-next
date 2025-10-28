import { getDB } from "@/lib/server/mongo";
import { ObjectId } from "mongodb";
export const runtime = "nodejs";
export async function GET() {
  try {
    const db = await getDB();
    const careers = await db
      .collection("careers")
      .find({})
      .sort({ created_at: -1 })
      .toArray();
    return new Response(JSON.stringify(careers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching careers:", error);
    return new Response(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
}
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, location, type, description, tags } = body;
    if (!title || !location || !type || !description) {
      return new Response(
        JSON.stringify({
          message:
            "Missing required fields: title, location, type, description",
        }),
        { status: 400 }
      );
    }
    const normalizedTags = Array.isArray(tags)
      ? tags.map((t) => t.trim()).filter(Boolean)
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];
    const db = await getDB();
    const result = await db.collection("careers").insertOne({
      title: title.trim(),
      location: location.trim(),
      type: type.trim(),
      description: description.trim(),
      tags: normalizedTags,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return new Response(
      JSON.stringify({
        message: "Job opening created successfully",
        id: result.insertedId,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating career:", error);
    return new Response(JSON.stringify({ message: "Creation failed" }), {
      status: 500,
    });
  }
}
export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return new Response(JSON.stringify({ message: "ID required" }), {
      status: 400,
    });

  const body = await req.json();
  const db = await getDB();

  const result = await db
    .collection("careers")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...body, updated_at: new Date() } }
    );

  if (result.matchedCount === 0)
    return new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
    });

  return new Response(JSON.stringify({ message: "Updated" }), { status: 200 });
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ message: "Missing career ID" }), {
        status: 400,
      });
    }
    const db = await getDB();
    const career = await db
      .collection("careers")
      .findOne({ _id: new ObjectId(id) });
    if (!career) {
      return new Response(
        JSON.stringify({ message: "Job opening not found" }),
        { status: 404 }
      );
    }
    await db.collection("careers").deleteOne({ _id: new ObjectId(id) });
    return new Response(
      JSON.stringify({ message: "Job opening deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting career:", error);
    return new Response(JSON.stringify({ message: "Delete failed" }), {
      status: 500,
    });
  }
}
