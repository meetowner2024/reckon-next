// src/app/api/products/images/[filename]/route.js
import path from "path";
import { readFile } from "fs/promises";

export async function GET(req, { params }) {
  try {
    const { filename } = params;
    const filePath = path.join(
      process.cwd(),
      "src",
      "uploads",
      "products",
      filename
    );
    const fileBuffer = await readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: { "Content-Type": "image/jpeg" }, // adjust MIME type if needed
    });
  } catch (err) {
    return new Response("Not found", { status: 404 });
  }
}
