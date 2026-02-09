import { getDB } from "@/lib/server/mongo";
import { put } from "@vercel/blob";
export const runtime = "nodejs";

const safeName = (file) => file.name.replace(/[^a-zA-Z0-9.]/g, "_");

export async function POST(req) {
  try {
    const formData = await req.formData();

    const heroFile = formData.get("hero_image");
    const mobileFile = formData.get("mobile_image");
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const location = formData.get("location")?.toString().trim();

    if (!heroFile || !(heroFile instanceof Blob)) {
      return new Response(JSON.stringify({ message: "Hero image required" }), { status: 400 });
    }
    if (!title || !location) {
      return new Response(JSON.stringify({ message: "Title and location required" }), { status: 400 });
    }

    const heroBuffer = Buffer.from(await heroFile.arrayBuffer());
    const heroFilename = `${Date.now()}-${safeName(heroFile.name)}`;
    const { url } = await put(`hero/${heroFilename}`, heroBuffer, {
      access: "public",
    });

    let mobileUrl = null;
    if (mobileFile && mobileFile instanceof Blob) {
      const mobileBuffer = Buffer.from(await mobileFile.arrayBuffer());
      const mobileFilename = `mobile-${Date.now()}-${safeName(mobileFile.name)}`;
      const { url: mUrl } = await put(`hero/${mobileFilename}`, mobileBuffer, {
        access: "public",
      });
      mobileUrl = mUrl;
    }

    const db = await getDB();
    const slide = {
      title,
      description,
      location,
      image: url,
      mobile_image: mobileUrl,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection("hero_slides").insertOne(slide);

    return new Response(
      JSON.stringify({ message: "Slide added", slideId: result.insertedId.toString() }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ message: "Upload failed" }), { status: 500 });
  }
}