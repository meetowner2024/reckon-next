import { getDB } from "@/lib/server/mongo";
import path from "path";
import fs from "fs";
export const runtime = "nodejs";
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
export async function POST(req) {
  try {
    const body = await req.json();
    const db = await getDB();
    if (body.logoBase64) {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });
      const base64Data = body.logoBase64.replace(
        /^data:image\/\w+;base64,/,
        ""
      );
      const buffer = Buffer.from(base64Data, "base64");
      const fileName = `footer-logo-${Date.now()}.png`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);
      body.logo = `/uploads/${fileName}`;
      delete body.logoBase64;
    }
    const updatedFooter = {
      ...body,
      updated_at: new Date(),
    };
    await db
      .collection("footer")
      .updateOne({}, { $set: updatedFooter }, { upsert: true });
    return new Response(
      JSON.stringify({ message: "Footer updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating footer:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
