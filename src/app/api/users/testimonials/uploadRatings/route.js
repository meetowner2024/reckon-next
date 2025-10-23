import { getDB } from "@/lib/server/mongo";

export const runtime = "nodejs";

// Random sample Pexels profile images
const sampleImages = [
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
  "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=150",
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
  "https://images.pexels.com/photos/428339/pexels-photo-428339.jpeg?auto=compress&cs=tinysrgb&w=150",
  "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150",
  "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
  "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150",
];

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
      image: sampleImages[index % sampleImages.length], // rotate through sample Pexels images
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
