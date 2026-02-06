import { getDB } from "@/lib/server/mongo";
import fs from "fs";
import path from "path";
import { ObjectId } from "mongodb";
import { put, del } from "@vercel/blob";
export const runtime = "nodejs";


const safeName = (file) => file.name.replace(/[^a-zA-Z0-9.]/g, "_");

export async function PUT(req, { params }) {
  try {
    const { id } =await params;
    if (!ObjectId.isValid(id)) return new Response(JSON.stringify({ message: "Invalid ID" }), { status: 400 });
    const objectId = new ObjectId(id);
 const db = await getDB();

   
    const slide = await db.collection("hero_slides").findOne({ _id: objectId });
    if (!slide) {
      return new Response(JSON.stringify({ message: "Slide not found" }), { status: 404 });
    }
    const formData = await req.formData();
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const location = formData.get("location")?.toString().trim();   
    const heroFile = formData.get("hero_image");

    if (!title || !location) {
      return new Response(JSON.stringify({ message: "Title and location required" }), { status: 400 });
    }

    const updateData = { title, description, location, updated_at: new Date() };

    if (heroFile && heroFile instanceof Blob) {
      const buffer = Buffer.from(await heroFile.arrayBuffer());
    const filename = `${Date.now()}-${safeName(heroFile.name)}`;
    
     if (slide.image) {
        await del(slide.image);
      }
      const { url } = await put(`hero/${filename}`, buffer, {
        access: "public",
      });

      updateData.image = url;
    }

    
    const result = await db.collection("hero_slides").updateOne(
      { _id: objectId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Slide not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Slide updated" }), { status: 200 });
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
     if (!slide) {
      return new Response(JSON.stringify({ message: "Slide not found" }), { status: 404 });
    }

    if (slide.image) {
      await del(slide.image);
    }
    await db.collection("hero_slides").deleteOne({ _id: objectId });

    return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Delete failed" }), { status: 500 });
  }
}