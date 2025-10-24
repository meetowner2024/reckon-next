// app/api/hero/[id]/route.js
import { getDB } from "@/lib/server/mongo";
import { unlink, writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

const heroDir = path.join(process.cwd(), "public", "uploads", "hero");
const iconDir = path.join(process.cwd(), "public", "uploads", "icons");

await Promise.all([
  mkdir(heroDir, { recursive: true }).catch(() => {}),
  mkdir(iconDir, { recursive: true }).catch(() => {}),
]);

const safeName = (file) => file.name.replace(/[^a-zA-Z0-9.]/g, "_");

export async function DELETE(request, { params }) {
  const { id } =await params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

  try {
    const db = await getDB();
    const slide = await db.collection("hero_slides").findOne({ _id: new ObjectId(id) });
    if (!slide) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const unlinkPromises = [];
    if (slide.image) unlinkPromises.push(unlink(path.join(process.cwd(), "public", slide.image)).catch(() => {}));
    if (slide.icon_image) unlinkPromises.push(unlink(path.join(process.cwd(), "public", slide.icon_image)).catch(() => {}));
    await Promise.all(unlinkPromises);

    await db.collection("hero_slides").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}


export async function PATCH(request, { params }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

  try {
    const formData = await request.formData();
    const heroFile = formData.get("hero_image");
    const iconFile = formData.get("icon_image");
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const label = formData.get("label")?.toString().trim();
    const iconKey = formData.get("icon")?.toString().trim();

    const db = await getDB();
    const existing = await db.collection("hero_slides").findOne({ _id: new ObjectId(id) });
    if (!existing) return NextResponse.json({ message: "Not found" }, { status: 404 });

    const update = { updated_at: new Date() };
    let heroPath = existing.image;
    let iconPath = existing.icon_image;

    // Hero image
    if (heroFile && heroFile instanceof Blob && heroFile.size > 0) {
      if (existing.image) await unlink(path.join(process.cwd(), "public", existing.image)).catch(() => {});
      const buffer = Buffer.from(await heroFile.arrayBuffer());
      const filename = `${Date.now()}-${safeName(heroFile)}`;
      await writeFile(path.join(heroDir, filename), buffer);
      heroPath = `/uploads/hero/${filename}`;
      update.image = heroPath;
    }

    // Icon image
    if (iconFile && iconFile instanceof Blob && iconFile.size > 0) {
      if (existing.icon_image) await unlink(path.join(process.cwd(), "public", existing.icon_image)).catch(() => {});
      const buffer = Buffer.from(await iconFile.arrayBuffer());
      const filename = `${Date.now()}-${safeName(iconFile)}`;
      await writeFile(path.join(iconDir, filename), buffer);
      iconPath = `/uploads/icons/${filename}`;
      update.icon_image = iconPath;
    }

    if (title) update.title = title;
    if (description !== undefined) update.description = description;
    if (label) update.label = label;
    if (iconKey) update.icon = iconKey;

    if (Object.keys(update).length === 1) {
      return NextResponse.json({ message: "No changes" }, { status: 200 });
    }

    await db.collection("hero_slides").updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    return NextResponse.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}