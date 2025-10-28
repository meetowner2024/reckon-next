import { getDB } from "@/lib/server/mongo";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const heroDir = path.join(process.cwd(), "public", "uploads", "hero");
if (!fs.existsSync(heroDir)) fs.mkdirSync(heroDir, { recursive: true });

const safeName = (file) => file.name.replace(/[^a-zA-Z0-9.]/g, "_");

export async function POST(req) {
  try {
    const formData = await req.formData();

    const heroFile = formData.get("hero_image");
    const title = formData.get("title")?.toString().trim();
const description=formData.get("description")?.toString().trim();

    if (!heroFile || !(heroFile instanceof Blob)) {
      return new Response(JSON.stringify({ message: "Hero image required" }), { status: 400 });
    }
    
    if (!title) {
      return new Response(JSON.stringify({ message: "Title required" }), { status: 400 });
    }

    const heroBuffer = Buffer.from(await heroFile.arrayBuffer());
    const heroFilename = `${Date.now()}-${safeName(heroFile)}`;
    fs.writeFileSync(path.join(heroDir, heroFilename), heroBuffer);

    const db = await getDB();
    const slide = {
      title,
      description,   
      image: `/uploads/hero/${heroFilename}`,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection("hero_slides").insertOne(slide);

    return new Response(
      JSON.stringify({ message: "Slide added successfully", slideId: result.insertedId.toString() }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ message: "Upload failed" }), { status: 500 });
  }
}
