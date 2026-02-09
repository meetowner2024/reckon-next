import { getDB } from "@/lib/server/mongo";
import { put, del } from "@vercel/blob";
import path from "path";
import { writeFile, mkdir, unlink } from "fs/promises";
import fs from "fs";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";


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

    try { await mkdir(uploadDir, { recursive: true }); } catch (e) { }

    const filename = path.basename(name);
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    return `/uploads/${filename}`;
  }
}

async function deleteFile(url) {
  if (!url) return;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try { await del(url); } catch (e) { console.error("Blob delete error", e); }
  } else {
    // Local delete
    try {
      if (url.startsWith("/uploads/")) {
        const filename = path.basename(url);
        const filepath = path.join(process.cwd(), "public", "uploads", filename);
        if (fs.existsSync(filepath)) {
          await unlink(filepath);
        }
      }
    } catch (e) {
      console.error("Local delete error", e);
    }
  }
}

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
      const filename = `${Date.now()}-${safeName(heroFile.name)}`;
      
      if (slide.image) await deleteFile(slide.image);
      updateData.image = await uploadFile(heroFile, `hero/${filename}`);
    }

    const mobileFile = formData.get("mobile_image");
    const deleteMobile = formData.get("delete_mobile_image") === "true";

    if (deleteMobile) {
      if (slide.mobile_image) await deleteFile(slide.mobile_image);
      updateData.mobile_image = null;
    }

    if (mobileFile && mobileFile instanceof Blob) {
      const mobileFilename = `mobile-${Date.now()}-${safeName(mobileFile.name)}`;

      if (slide.mobile_image) await deleteFile(slide.mobile_image);
      updateData.mobile_image = await uploadFile(mobileFile, `hero/${mobileFilename}`);
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


    if (slide.image) await deleteFile(slide.image);
    if (slide.mobile_image) await deleteFile(slide.mobile_image);
    await db.collection("hero_slides").deleteOne({ _id: objectId });

    return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Delete failed" }), { status: 500 });
  }
}