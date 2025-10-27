import { getDB } from "@/lib/server/mongo";
import fs from "fs";
import path from "path";
export const runtime = "nodejs";
import { ObjectId } from "mongodb";

const resumesDir = path.join(process.cwd(), "public", "uploads", "resumes");
if (!fs.existsSync(resumesDir)) fs.mkdirSync(resumesDir, { recursive: true });
const safeName = (fileName) => fileName.replace(/[^a-zA-Z0-9.]/g, "_");
export async function GET() {
  try {
    const db = await getDB();
    const applications = await db
      .collection("careerApplications")
      .find({})
      .sort({ created_at: -1 })
      .toArray();
    return new Response(JSON.stringify(applications), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    return new Response(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
}
export async function POST(req) {
  try {
    const formData = await req.formData();
    const data = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "resume") data[key] = value.toString().trim();
    }
    const resumeFile = formData.get("resume");
    let resumePath = null;
    if (resumeFile && resumeFile instanceof Blob) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      const fileName = `${Date.now()}-${safeName(resumeFile.name)}`;
      const filePath = path.join(resumesDir, fileName);
      fs.writeFileSync(filePath, buffer);
      resumePath = `/uploads/resumes/${fileName}`;
    }
    const db = await getDB();
    const result = await db.collection("careerApplications").insertOne({
      ...data,
      resume: resumePath,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return new Response(
      JSON.stringify({
        message: "Application submitted successfully",
        id: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error submitting application:", error);
    return new Response(JSON.stringify({ message: "Upload failed" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ message: "Missing application ID" }),
        { status: 400 }
      );
    }

    const db = await getDB();
    const application = await db
      .collection("careerApplications")
      .findOne({ _id: new ObjectId(id) });

    if (!application) {
      return new Response(
        JSON.stringify({ message: "Application not found" }),
        { status: 404 }
      );
    }

    // Delete file if exists
    if (application.resume) {
      const filePath = path.join(process.cwd(), "public", application.resume);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from DB
    await db
      .collection("careerApplications")
      .deleteOne({ _id: new ObjectId(id) });

    return new Response(
      JSON.stringify({ message: "Application deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting application:", error);
    return new Response(JSON.stringify({ message: "Delete failed" }), {
      status: 500,
    });
  }
}
