import { getDB } from "@/lib/server/mongo";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await getDB();
    const forms = await db
      .collection("contacts")
      .find({})
      .sort({ created_at: -1 })
      .toArray();
    return new Response(
      JSON.stringify({
        success: true,
        count: forms.length,
        data: forms,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("❌ GET /contact-submit error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch submitted forms",
        error: err.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    if (!data || Object.keys(data).length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Form data is required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const newForm = {
      _id: uuidv4(),
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const db = await getDB();
    await db.collection("contacts").insertOne(newForm);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Form submitted successfully",
        form_id: newForm._id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ POST /contact-submit error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to submit form",
        error: err.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ message: "ID required" }), {
        status: 400,
      });
    }

    const db = await getDB();
    const query = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { _id: id };

    const contact = await db.collection("contacts").findOne(query);
    if (!contact) {
      return new Response(JSON.stringify({ message: "Contact not found" }), {
        status: 404,
      });
    }

    const deleteResult = await db.collection("contacts").deleteOne(query);
    if (deleteResult.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Failed to delete contact" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Contact deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /contact-submit Error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
