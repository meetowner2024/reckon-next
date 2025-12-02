import { getDB } from "@/lib/server/mongo";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!Array.isArray(body) || body.length === 0) {
      return new Response(
        JSON.stringify({ message: "Array of testimonials required" }),
        { status: 400 }
      );
    }

    const db = await getDB();

    // Clear existing testimonials
    await db.collection("testimonials").deleteMany({});

    // Insert new testimonials with random images
    const newTestimonials = body.map((item, index) => ({
      id: crypto.randomUUID(),
      name: item.name,
      role: item.role,
      content: item.content,
      rating: item.rating,
      created_at: new Date(),
    }));

    await db.collection("testimonials").insertMany(newTestimonials);

    return new Response(
      JSON.stringify({
        message: "Testimonials added successfully",
        count: newTestimonials.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting testimonials:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const db = await getDB();
    const testimonials = await db
      .collection("testimonials")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return new Response(JSON.stringify(testimonials), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch testimonials" }),
      { status: 500 }
    );
  }
}
