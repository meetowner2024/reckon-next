import { getDB } from "@/lib/server/mongo";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import fs from "fs";
import path from "path";
const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");
    const title = formData.get("title");
    const orderStr = formData.get("order");
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(
      /[^a-zA-Z0-9.]/g,
      "_"
    )}`;
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
    const order = orderStr ? parseInt(orderStr) : 999;
    const db = await getDB();
    const result = await db.collection("gallery").insertOne({
      url: `/uploads/gallery/${filename}`,
      title: title || file.name,
      order,
      uploaded_at: new Date(),
    });
    return NextResponse.json(
      {
        _id: result.insertedId,
        url: `/uploads/gallery/${filename}`,
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
export async function GET() {
  try {
    const db = await getDB();
    const images = await db
      .collection("gallery")
      .find({})
      .sort({ order: 1 })
      .toArray();
    const response = NextResponse.json(images);
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=3600"
    );
    const etag = `"${images.length}-${Date.now()}"`;
    response.headers.set("ETag", etag);
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Valid ID is required" },
        { status: 400 }
      );
    }
    const db = await getDB();
    const image = await db
      .collection("gallery")
      .findOne({ _id: new ObjectId(id) });
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    const filePath = path.join(process.cwd(), "public", image.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await db.collection("gallery").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
