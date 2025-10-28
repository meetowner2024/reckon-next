import { getDB } from "@/lib/server/mongo";
import fs from "fs";
import path from "path";
const uploadDir = path.join(process.cwd(), "public", "uploads", "profiles");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const safeName = (name) => name.replace(/[^a-zA-Z0-9.]/g, "_");
const deleteFile = (filePath) => {
  if (!filePath) return;
  const fullPath = path.join(process.cwd(), "public", filePath);
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (err) {
      console.warn("Failed to delete:", fullPath, err);
    }
  }
};
export const runtime = "nodejs";
export async function POST(req) {
  return handleSave(req);
}
export async function PUT(req) {
  return handleSave(req);
}
async function handleSave(req) {
  try {
    const formData = await req.formData();
    const db = await getDB();
    const currentConfig = await db
      .collection("profileConfig")
      .findOne({}, { sort: { updated_at: -1 } });

    const sections = JSON.parse(formData.get("sections") || "[]");
    const files = formData.getAll("files");
    const fileMap = JSON.parse(formData.get("fileMap") || "[]");
    const fileIndexMap = new Map();
    fileMap.forEach(([secIdx, diagIdx], idx) => {
      fileIndexMap.set(`${secIdx}-${diagIdx}`, idx);
    });
    const processedSections = await Promise.all(
      sections.map(async (section, secIdx) => {
        const processedDiagrams = await Promise.all(
          section.diagrams.map(async (diag, diagIdx) => {
            const oldDbPath =
              currentConfig?.sections?.[secIdx]?.diagrams?.[diagIdx]?.src ||
              null;
            const key = `${secIdx}-${diagIdx}`;
            const fileIdx = fileIndexMap.get(key);
            if (fileIdx !== undefined && files[fileIdx]) {
              const file = files[fileIdx];
              if (oldDbPath && oldDbPath.startsWith("/uploads/profiles/")) {
                deleteFile(oldDbPath);
              }
              const buffer = Buffer.from(await file.arrayBuffer());
              const fileName = `${Date.now()}-diag-${safeName(file.name)}`;
              const filePath = path.join(uploadDir, fileName);
              fs.writeFileSync(filePath, buffer);
              return {
                title: diag.title.trim(),
                src: `/uploads/profiles/${fileName}`,
              };
            }
            return {
              title: diag.title.trim(),
              src: oldDbPath || "",
            };
          })
        );
        return { title: section.title.trim(), diagrams: processedDiagrams };
      })
    );
    await db.collection("profileConfig").deleteMany({});
    const result = await db.collection("profileConfig").insertOne({
      sections: processedSections,
      updated_at: new Date(),
    });
    return new Response(
      JSON.stringify({ message: "Saved", id: result.insertedId }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile save error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
export async function GET() {
  try {
    const db = await getDB();
    const config = await db
      .collection("profileConfig")
      .findOne({}, { sort: { updated_at: -1 } });
    return new Response(
      JSON.stringify(config || { banner: null, sections: [] }),
     {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "public, s-maxage=86400, max-age=3600, stale-while-revalidate=60",
      },
    }
    );
  } catch (error) {
    console.error("Profile fetch error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
