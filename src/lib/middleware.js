import { NextResponse } from "next/server";
export function middleware(req) {
  const path = req.nextUrl.pathname;
  if (path.startsWith("/admin-portal")) {
    const token = req.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin-portal/login", req.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/admin-portal/:path*"],
};
