import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDB } from "@/lib/server/mongo";
import { ObjectId } from "mongodb";
const JWT_SECRET = process.env.JWT_SECRET;
export async function GET(request) {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token" },
        { status: 401 }
      );
    }
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }
    const db = await getDB();
    const user = await db.collection("admins").findOne({
      _id: new ObjectId(decoded.sub),
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          mobile: user.mobile,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Auth/me error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
