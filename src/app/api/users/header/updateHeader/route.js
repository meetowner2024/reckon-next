import { getDB } from "@/lib/server/mongo";
import { put, del } from "@vercel/blob";
export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const db = await getDB();
    const existingHeader = await db.collection("header").findOne({});
        const logoFile = formData.get("logo");
    const phone = formData.get("phone")?.toString(); 

    let updatedFields = {};
    let logoPath = existingHeader?.logo || null;
   if (logoFile && logoFile instanceof Blob) {
      const buffer = Buffer.from(await logoFile.arrayBuffer());
      const filename = `${Date.now()}-${logoFile.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;

      if (existingHeader?.logo) {
        try {
          await del(existingHeader.logo);
        } catch (err) {
          console.error("Error deleting old blob:", err);
        }
      }

      const { url } = await put(`header/${filename}`, buffer, {
        access: "public",
      });

      logoPath = url;
      updatedFields.logo = url;
    }


    if (phone) updatedFields.phone = phone;
    updatedFields.updated_at = new Date();
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
