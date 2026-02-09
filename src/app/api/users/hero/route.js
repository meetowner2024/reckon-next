import { getDB } from "@/lib/server/mongo";
import { put } from "@vercel/blob";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

export const runtime = "nodejs";


export async function GET() {
  try {
    const db = await getDB();
    const slides = await db
      .collection("hero_slides")
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    const serialized = slides.map((s) => ({
      ...s,
      _id: s._id.toString(),
    }));

    return new Response(JSON.stringify(serialized), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("GET /api/hero error:", err);
    return new Response(JSON.stringify({ message: "Failed to fetch slides" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}

const safeName = (name) => name.replace(/[^a-zA-Z0-9.]/g, "_");

async function uploadFile(file, name) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { url } = await put(name, file, { access: "public" });
    return url;
  } else {
    // Local fallback
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignore if exists
    }

    // Use only filename part to avoid directory issues
    const filename = path.basename(name);
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    return `/uploads/${filename}`;
  }
}

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

    const heroFilename = `${Date.now()}-${safeName(heroFile.name)}`;
    const url = await uploadFile(heroFile, `hero/${heroFilename}`);

    let mobileUrl = null;
    if (mobileFile && mobileFile instanceof Blob) {
      const mobileFilename = `mobile-${Date.now()}-${safeName(mobileFile.name)}`;
      const mUrl = await uploadFile(mobileFile, `hero/${mobileFilename}`);
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
