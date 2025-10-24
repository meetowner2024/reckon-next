// app/api/faqs/route.js
import { getDB } from "@/lib/server/mongo";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

/* ---------- GET ALL ---------- */
export async function GET() {
  try {
    const db = await getDB();
    const faqs = await db
      .collection("faqs")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return new Response(JSON.stringify(faqs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET FAQs error:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch FAQs" }), {
      status: 500,
    });
  }
}

/* ---------- BULK POST (seed) ---------- */
export async function POST(req) {
  try {
    const body = await req.json();

    if (!Array.isArray(body) || body.length === 0) {
      return new Response(
        JSON.stringify({ message: "Array of FAQs required" }),
        { status: 400 }
      );
    }

    const db = await getDB();
    await db.collection("faqs").deleteMany({}); // wipe old seed

    const newFAQs = body.map((faq) => ({
      id: crypto.randomUUID(),
      question: faq.question,
      answer: faq.answer,
      created_at: new Date(),
    }));

    await db.collection("faqs").insertMany(newFAQs);

    return new Response(
      JSON.stringify({ message: "FAQs added successfully", count: newFAQs.length }),
      { status: 200 }
    );
  } catch (error) {
    console.error("POST FAQs error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

/* ---------- CREATE SINGLE ---------- */
export async function PUT(req) {
  try {
    const { _id, question, answer } = await req.json();

    if (!question?.trim() || !answer?.trim()) {
      return new Response(
        JSON.stringify({ message: "question and answer are required" }),
        { status: 400 }
      );
    }

    const db = await getDB();
    const payload = {
      question: question.trim(),
      answer: answer.trim(),
      updated_at: new Date(),
    };

    let result;
    if (_id) {
      // ----- UPDATE -----
      result = await db
        .collection("faqs")
        .updateOne({ _id: new ObjectId(_id) }, { $set: payload });
    } else {
      // ----- INSERT -----
      payload.id = crypto.randomUUID();
      payload.created_at = new Date();
      result = await db.collection("faqs").insertOne(payload);
      payload._id = result.insertedId;
    }

    return new Response(JSON.stringify(payload), { status: 200 });
  } catch (error) {
    console.error("PUT FAQ error:", error);
    return new Response(JSON.stringify({ message: "Failed to save FAQ" }), {
      status: 500,
    });
  }
}

/* ---------- DELETE SINGLE ---------- */
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("_id");

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Missing _id query param" }),
        { status: 400 }
      );
    }

    const db = await getDB();
    const result = await db
      .collection("faqs")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: "FAQ not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
  } catch (error) {
    console.error("DELETE FAQ error:", error);
    return new Response(JSON.stringify({ message: "Delete failed" }), {
      status: 500,
    });
  }
}