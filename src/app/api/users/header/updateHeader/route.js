import { getDB } from "@/lib/server/mongo";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const uploadDir = path.join(process.cwd(), "src/uploads/header");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export async function POST(req) {
  try {
    const formData = await req.formData();
    const db = await getDB();

    const existingHeader = await db.collection("header").findOne({});
    let updatedFields = {};
    let logoPath = existingHeader?.logo || null;

    const logoFile = formData.get("logo");
    const phone = formData.get("phone")?.toString();

    // ✅ If new logo uploaded
    if (logoFile && logoFile instanceof Blob) {
      // 🔹 Delete old logo file (if exists)
      if (existingHeader?.logo) {
        const oldFilePath = path.join(
          process.cwd(),
          "src/uploads",
          existingHeader.logo
        );
        if (fs.existsSync(oldFilePath)) {
          try {
            fs.unlinkSync(oldFilePath);
          } catch (delErr) {
            console.error("Failed to delete old logo:", delErr);
          }
        }
      }

      // 🔹 Save new logo
      const arrayBuffer = await logoFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filename = `${Date.now()}-${logoFile.name}`;
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, buffer);
      logoPath = `header/${filename}`;
      updatedFields.logo = logoPath;
    }

    // ✅ Update phone if provided
    if (phone) updatedFields.phone = phone;

    updatedFields.updated_at = new Date();

    // ✅ Insert new or update existing
    await db
      .collection("header")
      .updateOne({}, { $set: updatedFields }, { upsert: true });

    return new Response(
      JSON.stringify({
        message: existingHeader
          ? "Header updated successfully"
          : "Header created successfully",
        logo: logoPath,
        phone: phone || existingHeader?.phone || null,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating header:", err);
    return new Response(
      JSON.stringify({ message: "Failed to update header" }),
      { status: 500 }
    );
  }
}
