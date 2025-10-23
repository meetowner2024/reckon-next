import { getDB } from "@/lib/server/mongo";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

// Uploads folder inside src/
const uploadDir = path.join(process.cwd(), "src/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export async function POST(req) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");

    if (!imageFile || !(imageFile instanceof Blob)) {
      return new Response(JSON.stringify({ message: "Image file required" }), {
        status: 400,
      });
    }

    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const label = formData.get("label")?.toString() || title;
    const icon = formData.get("icon")?.toString() || "DoorClosed";

    // Convert Blob to buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer); // write file

    // Save slide info to MongoDB
    const db = await getDB();
    const slide = {
      title,
      description,
      label,
      icon,
      image: `/uploads/${filename}`, // this path will be served via API
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection("hero_slides").insertOne(slide);

    return new Response(
      JSON.stringify({ message: "Slide added", slideId: result.insertedId }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ message: "File upload failed" }), {
      status: 500,
    });
  }
}
