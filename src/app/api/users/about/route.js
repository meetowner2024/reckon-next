import { getDB } from "@/lib/server/mongo";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const uploadDir = path.join(process.cwd(), "public", "uploads", "about");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });


function deleteFileIfExists(filePath) {
  if (!filePath) return;
  const fullPath = path.join(process.cwd(), "public", filePath);
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (e) {
      console.warn("Failed to delete:", fullPath, e);
    }
  }
}


export async function GET() {
  try {
    const db = await getDB();
    const doc = await db.collection("about").findOne({});
    return NextResponse.json(doc || {},{
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}


export async function POST(req) { return await handleSave(req, false); }
export async function PUT(req) { return await handleSave(req, true); }

async function handleSave(req, isUpdate) {
  try {
    const formData = await req.formData();
    const db = await getDB();
    const existing = isUpdate ? await db.collection("about").findOne({}) : null;

    const title = formData.get("title") || "";
    const description = formData.get("description") || "";
    const mainImageFile = formData.get("mainImage");

    const expertsInputTitle = formData.get("expertsInputTitle") || "";
    const expertsInputDescription = formData.get("expertsInputDescription") || "";

    // === CARDS ===
    const cardCount = parseInt(formData.get("cardCount") || "0", 10);
    const cards = [];
    for (let i = 0; i < cardCount; i++) {
      const img = formData.get(`cardImage_${i}`);
      const t = formData.get(`cardTitle_${i}`) || "";
      const d = formData.get(`cardDesc_${i}`) || "";
      cards.push({ img, title: t, desc: d });
    }

    // === EXPERTS ===
    const expCount = parseInt(formData.get("expCount") || "0", 10);
    const experts = [];
    for (let i = 0; i < expCount; i++) {
      const img = formData.get(`expImage_${i}`);
      const name = formData.get(`expName_${i}`) || "";
      const role = formData.get(`expRole_${i}`) || "";
      experts.push({ img, name, role });
    }

    // === MAIN IMAGE ===
    let mainImagePath = existing?.mainImage || "";
    if (mainImageFile && mainImageFile instanceof File) {
      // User uploaded a new image → replace
      if (existing?.mainImage) deleteFileIfExists(existing.mainImage);
      const buffer = Buffer.from(await mainImageFile.arrayBuffer());
      const filename = `${Date.now()}-${mainImageFile.name}`;
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, buffer);
      mainImagePath = `/uploads/about/${filename}`;
    }
    // else → keep existing main image

    // === CARDS IMAGES ===
    const cardImagePaths = await Promise.all(
      cards.map(async (c, i) => {
        const oldPath = existing?.cards?.[i]?.image || "";
        const newFile = c.img;

        // ✅ Case 1: user didn't upload new file → keep old
        if (!newFile) return oldPath;

        // ✅ Case 2: user removed image manually
        if (typeof newFile === "string" && newFile === "REMOVE") {
          deleteFileIfExists(oldPath);
          return "";
        }

        // ✅ Case 3: user uploaded new image
        if (newFile instanceof File) {
          if (oldPath) deleteFileIfExists(oldPath);
          const buffer = Buffer.from(await newFile.arrayBuffer());
          const filename = `${Date.now()}-card-${i}-${newFile.name}`;
          const filePath = path.join(uploadDir, filename);
          fs.writeFileSync(filePath, buffer);
          return `/uploads/about/${filename}`;
        }

        return oldPath;
      })
    );

    // === EXPERT IMAGES ===
    const expImagePaths = await Promise.all(
      experts.map(async (ex, i) => {
        const oldPath = existing?.experts?.[i]?.image || "";
        const newFile = ex.img;

        if (!newFile) return oldPath;
        if (typeof newFile === "string" && newFile === "REMOVE") {
          deleteFileIfExists(oldPath);
          return "";
        }

        if (newFile instanceof File) {
          if (oldPath) deleteFileIfExists(oldPath);
          const buffer = Buffer.from(await newFile.arrayBuffer());
          const filename = `${Date.now()}-exp-${i}-${newFile.name}`;
          const filePath = path.join(uploadDir, filename);
          fs.writeFileSync(filePath, buffer);
          return `/uploads/about/${filename}`;
        }

        return oldPath;
      })
    );

    // === FINAL PAYLOAD ===
    const payload = {
      title,
      description,
      mainImage: mainImagePath,
      expertsInputTitle,
      expertsInputDescription,
      cards: cards.map((c, i) => ({
        image: cardImagePaths[i],
        title: c.title,
        description: c.desc,
      })),
      experts: experts.map((ex, i) => ({
        image: expImagePaths[i],
        name: ex.name,
        role: ex.role,
      })),
      updated_at: new Date(),
    };

    await db.collection("about").replaceOne({}, payload, { upsert: true });
    return NextResponse.json({ message: "Saved successfully" });
  } catch (err) {
    console.error("Save error:", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
