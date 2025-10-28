import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDB } from "@/lib/server/mongo";
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_PASSWORD = process.env.ADMIN_REGISTRATION_PASSWORD;
export async function POST(request) {
  try {
    const { name, mobile, email, password, adminPassword } =
      await request.json();
    if (!name || !mobile || !email || !password || !adminPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { message: "Mobile must be 10 digits" },
        { status: 400 }
      );
    }
    if (adminPassword !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Invalid admin password" },
        { status: 403 }
      );
    }
    const db = await getDB();
    const users = db.collection("admins");
    const existing = await users.findOne({
      $or: [{ email: email.toLowerCase() }, { mobile }],
    });
    if (existing) {
      return NextResponse.json(
        { message: "Admin with this email or mobile already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await users.insertOne({
      name: name.trim(),
      mobile,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const token = jwt.sign(
      {
        sub: result.insertedId.toString(),
        email: email.toLowerCase(),
        name: name.trim(),
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    const response = NextResponse.json(
      { message: "Admin created successfully", success: true },
      { status: 201 }
    );
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
