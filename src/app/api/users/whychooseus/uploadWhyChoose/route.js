import { getDB } from "@/lib/server/mongo";

export const runtime = "nodejs";
export async function POST(req) {
  try {
    const body = await req.json();

    if (!Array.isArray(body) || body.length === 0) {
      return new Response(
        JSON.stringify({ message: "Array of features is required" }),
        { status: 400 }
      );
    }

    const db = await getDB();

    // Clean existing records and insert new ones
    await db.collection("whychooseus").deleteMany({});
    await db.collection("whychooseus").insertMany(
      body.map((feature) => ({
        id: feature.id || crypto.randomUUID(),
        title: feature.title,
        description: feature.description,
        icon: feature.icon || null,
        updated_at: new Date(),
      }))
    );

    return new Response(
      JSON.stringify({ message: "Why Choose Us data updated successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating WhyChooseUs:", err);
    return new Response(JSON.stringify({ message: "Failed to update data" }), {
      status: 500,
    });
  }
}
