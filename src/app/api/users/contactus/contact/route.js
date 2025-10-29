import { getDB } from "@/lib/server/mongo";
import path from "path";
import fs from "fs";
export const runtime = "nodejs";
export async function GET() {
  try {
    const db = await getDB();
    const contact = await db.collection("contact").findOne({});
    return new Response(JSON.stringify(contact || {}), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch contact" }),
      {
        status: 500,
      }
    );
  }
}
export async function POST(req) {
  try {
    const body = await req.json();
    const db = await getDB();
    if (body.logoBase64) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const base64Data = body.logoBase64.replace(
        /^data:image\/\w+;base64,/,
        ""
      );
      const buffer = Buffer.from(base64Data, "base64");
      const fileName = `contact-logo-${Date.now()}.png`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);
      body.logo = `/uploads/${fileName}`;
      delete body.logoBase64;
    }
    const updatedContact = {
      office: {
        title: body.office?.title || "Visit Office",
        description:
          body.office?.description ||
          "You are most welcome to visit our office.",
        address: body.office?.address || "",
        mapUrl: body.office?.mapUrl || "",
      },
      phones: Array.isArray(body.phones)
        ? body.phones.map((p) => ({
            label: p.label,
            number: p.number,
            tel: p.tel || `tel:${p.number.replace(/[^0-9+]/g, "")}`,
          }))
        : [],
      emails: Array.isArray(body.emails)
        ? body.emails.map((e) => ({
            label: e.label,
            address: e.address,
            mailto: e.mailto || `mailto:${e.address}`,
          }))
        : [],
      logo: body.logo || null,
      updated_at: new Date(),
    };
    await db
      .collection("contact")
      .updateOne({}, { $set: updatedContact }, { upsert: true });
    return new Response(
      JSON.stringify({ message: "Contact updated successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating contact:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
