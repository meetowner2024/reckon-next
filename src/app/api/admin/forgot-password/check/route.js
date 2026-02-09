import { NextResponse } from "next/server";
import { getDB } from "@/lib/server/mongo";

export async function POST(request) {
  try {
    const { identifier } = await request.json();

    if (!identifier) {
      return NextResponse.json({ message: "Identifier required" }, { status: 400 });
    }

    const db = await getDB();
    const admins = db.collection("admins");

    let query = {};
    if (/^\d{10}$/.test(identifier)) {
      query.mobile = identifier;
    } else if (identifier.includes("@")) {
      query.email = identifier.toLowerCase();
    } else {
      return NextResponse.json({ message: "Invalid identifier" }, { status: 400 });
    }

    const admin = await admins.findOne(query);

    if (!admin) {
      return NextResponse.json({ message: "Account not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Account verified" }, { status: 200 });
  } catch (error) {
    console.error("Forgot password check error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
