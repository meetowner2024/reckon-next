import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
export const runtime = "nodejs";
async function ensureUploadDir() {
  const dir = path.join(process.cwd(), "public", "uploads", "products");
  await mkdir(dir, { recursive: true });
}
export async function POST(req) {
  try {
    await ensureUploadDir();
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
      return new Response(JSON.stringify({ message: "No file uploaded" }), {
        status: 400,
      });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name);
    const filename = `${uuidv4()}${ext}`;
    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "products",
      filename
    );
    await writeFile(filePath, buffer);
    const imageUrl = `/uploads/products/${filename}`;
    return new Response(JSON.stringify({ url: imageUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("File Upload Error:", error);
    return new Response(JSON.stringify({ message: "Failed to upload file" }), {
      status: 500,
    });
  }
}
