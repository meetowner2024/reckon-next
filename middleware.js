import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (
    pathname.startsWith("/uploads/") &&
    /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(pathname)
  ) {
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return response;
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*", "/uploads/:path*"],
};
