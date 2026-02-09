import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDB } from "@/lib/server/mongo";

export async function POST(request) {
  try {
    const { identifier, newPassword, adminPassword } = await request.json();

    if (!identifier || !newPassword || !adminPassword) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (adminPassword !== process.env.ADMIN_REGISTRATION_PASSWORD) {
      return NextResponse.json({ message: "Invalid admin secret key" }, { status: 403 });
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

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await admins.updateOne(
      query,
      { $set: { password: hashedNewPassword, updated_at: new Date() } }
    );

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
  } catch (error) {
    console.error("Forgot password reset error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
