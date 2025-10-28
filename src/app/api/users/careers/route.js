import { getDB } from "@/lib/server/mongo";
export async function POST(req) {
  try {
    const body = await req.json();
    const db = await getDB();
    await db.collection("careersConfig").deleteMany({});
    const result = await db.collection("careersConfig").insertOne({
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return new Response(
      JSON.stringify({
        message: "Careers config saved",
        id: result.insertedId,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving careers config:", error);
    return new Response(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
}
export async function GET() {
  try {
    const db = await getDB();
    const config = await db
      .collection("careersConfig")
      .findOne({}, { sort: { created_at: -1 } });
    if (!config) {
      return new Response(
        JSON.stringify({ message: "No careers config found" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(config), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching careers config:", error);
    return new Response(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
}
