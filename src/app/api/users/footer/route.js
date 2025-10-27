import { getDB } from "@/lib/server/mongo";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";

/* ---------- GET ---------- */
export async function GET() {
  try {
    const db = await getDB();
    const footer = await db.collection("footer").findOne({});
    return new Response(JSON.stringify(footer || {}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching footer:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch footer" }), {
      status: 500,
    });
  }
}

/* ---------- POST (full update) ---------- */
export async function POST(req) {
  try {
    const body = await req.json();
    const db = await getDB();

    // ----- LOGO -----
    if (body.logoBase64) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });

      const base64Data = body.logoBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const fileName = `footer-logo-${Date.now()}.png`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);

      body.logo = `/uploads/${fileName}`;
      delete body.logoBase64;
    }

    const updatedFooter = { ...body, updated_at: new Date() };
    await db
      .collection("footer")
      .updateOne({}, { $set: updatedFooter }, { upsert: true });

    return new Response(
      JSON.stringify({ message: "Footer updated successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating footer:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

/* ---------- DELETE (single item) ---------- */
export async function DELETE(req) {
  try {
    const { type, index, key } = await req.json();

    const db = await getDB();
    const footer = await db.collection("footer").findOne({});

    if (!footer) {
      return new Response(JSON.stringify({ message: "Footer not found" }), { status: 404 });
    }

    if (type === "locations" && typeof index === "number" && footer.locations?.[index] !== undefined) {
      footer.locations.splice(index, 1);
      await db.collection("footer").updateOne(
        {},
        { $set: { locations: footer.locations, updated_at: new Date() } },
        { upsert: true }
      );
    }
    else if (type === "quickLinks" && typeof index === "number" && footer.quickLinks?.[index] !== undefined) {
      footer.quickLinks.splice(index, 1);
      await db.collection("footer").updateOne(
        {},
        { $set: { quickLinks: footer.quickLinks, updated_at: new Date() } },
        { upsert: true }
      );
    }
    else if (type === "socialLinks" && key && footer.socialLinks?.[key] !== undefined) {
      delete footer.socialLinks[key];
      await db.collection("footer").updateOne(
        {},
        { $set: { socialLinks: footer.socialLinks, updated_at: new Date() } },
        { upsert: true }
      );
    }
    else {
      return new Response(JSON.stringify({ message: "Invalid request" }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: "Item deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    return new Response(JSON.stringify({ message: "Failed to delete" }), { status: 500 });
  }
}