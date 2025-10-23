// src/app/api/form-config/route.js
import { getDB } from "@/lib/server/mongo";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body || !body.formFields || !Array.isArray(body.formFields)) {
      return new Response(
        JSON.stringify({ message: "Invalid form configuration" }),
        {
          status: 400,
        }
      );
    }

    const db = await getDB();

    // Replace existing config
    await db.collection("formConfig").deleteMany({});

    const result = await db.collection("formConfig").insertOne({
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return new Response(
      JSON.stringify({
        message: "Form configuration saved",
        id: result.insertedId,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error saving form config:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const db = await getDB();
    const config = await db
      .collection("formConfig")
      .findOne({}, { sort: { created_at: -1 } });

    if (!config) {
      return new Response(
        JSON.stringify({ message: "No form configuration found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(config), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching form config:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
