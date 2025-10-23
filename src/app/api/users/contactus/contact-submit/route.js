// src/app/api/contact-submit/route.js
import { getDB } from "@/lib/server/mongo";

export async function POST(req) {
  try {
    const data = await req.json();
    const db = await getDB();
    await db
      .collection("contacts")
      .insertOne({ ...data, created_at: new Date() });
    return new Response(
      JSON.stringify({ message: "Form submitted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Failed to submit form" }), {
      status: 500,
    });
  }
}
