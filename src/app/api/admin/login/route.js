import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDB } from "@/lib/server/mongo";
const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(request) {
  try {
    const { identifier, password } = await request.json();
    if (!identifier || !password) {
      return NextResponse.json(
        { message: "Mobile/Email and password required" },
        { status: 400 }
      );
    }
    const db = await getDB();
    const users = db.collection("admins");
    let query = {};
    if (/^\d{10}$/.test(identifier)) {
      query.mobile = identifier;
    } else if (identifier.includes("@")) {
      query.email = identifier.toLowerCase();
    } else {
      return NextResponse.json(
        { message: "Enter valid mobile (10 digits) or email" },
        { status: 400 }
      );
    }
    const user = await users.findOne(query);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    const res = NextResponse.json(
      { message: "Login successful", success: true },
      { status: 200 }
    );
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
