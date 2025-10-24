import { getDB } from "@/lib/server/mongo";
import fs from "fs";
import path from "path";
import { ObjectId } from "mongodb";
const heroDir = path.join(process.cwd(), "public", "uploads", "hero");

const safeName = (file) => file.name.replace(/[^a-zA-Z0-9.]/g, "_");

export async function PUT(req, { params }) {
  try {
    const { id } =await  params;

    if (!ObjectId.isValid(id)) {
  return new Response(JSON.stringify({ message: "Invalid ID format" }), { status: 400 });
}

const objectId = new ObjectId(id);
    const formData = await req.formData();

    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const label = formData.get("label")?.toString().trim() || title;
    const iconKey = formData.get("icon")?.toString().trim();
    const heroFile = formData.get("hero_image");

    if (!title || !iconKey) {
      return new Response(JSON.stringify({ message: "Title and icon required" }), { status: 400 });
    }

    const updateData = {
      title,
      description,
      label,
      icon: iconKey,
      updated_at: new Date(),
    };

    let newImagePath = null;

    if (heroFile && heroFile instanceof Blob) {
      const buffer = Buffer.from(await heroFile.arrayBuffer());
      const filename = `${Date.now()}-${safeName(heroFile)}`;
      fs.writeFileSync(path.join(heroDir, filename), buffer);
      newImagePath = `/uploads/hero/${filename}`;
      updateData.image = newImagePath;
    }

    const db = await getDB();
    const result = await db.collection("hero_slides").updateOne(
      { _id: objectId},
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Slide not found" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: "Slide updated", image: newImagePath }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Update error:", err);
    return new Response(JSON.stringify({ message: "Update failed" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } =await params;

      if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID" }), { status: 400 });
    }

    const objectId = new ObjectId(id);
    const db = await getDB();
    const slide = await db.collection("hero_slides").findOne({ _id: objectId });
    if (slide?.image) {
      const filePath = path.join(process.cwd(), "public", slide.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await db.collection("hero_slides").deleteOne({ _id: objectId });

    return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Delete failed" }), { status: 500 });
  }
}