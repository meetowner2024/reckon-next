import { getDB } from "@/lib/server/mongo";
export const runtime = "nodejs";
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
    console.error("Error fetching FAQs:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch FAQs" }), {
      status: 500,
    });
  }
}
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
    await db.collection("faqs").deleteMany({});
    const newFAQs = body.map((faq) => ({
      id: crypto.randomUUID(),
      question: faq.question,
      answer: faq.answer,
      created_at: new Date(),
    }));
    await db.collection("faqs").insertMany(newFAQs);
    return new Response(
      JSON.stringify({
        message: "FAQs added successfully",
        count: newFAQs.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting FAQs:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
