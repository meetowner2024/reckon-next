
import { getDB } from "@/lib/server/mongo";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json({ exists: false });
  }

  try {
    const db = await getDB();
    const existing = await db.collection("hero_slides").findOne({
      title: { $regex: `^${title.trim()}$`, $options: "i" } 
    });

    return NextResponse.json({ exists: !!existing },{
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Title check error:", err);
    return NextResponse.json({ exists: false }, { status: 500 });
  }
}