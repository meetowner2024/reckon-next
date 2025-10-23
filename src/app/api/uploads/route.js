import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("file");
    if (!fileName) {
      return new Response(
        JSON.stringify({ message: "File query parameter is required" }),
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "src/uploads");
    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ message: "File not found" }), {
        status: 404,
      });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(fileName).toLowerCase();
    let contentType = "application/octet-stream";

    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".gif") contentType = "image/gif";

    return new Response(fileBuffer, {
      status: 200,
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    console.error("Error fetching file:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
