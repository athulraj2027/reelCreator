import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export default async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;
  const isPublicPath = pathname === "/";
  const isProtectedPath = pathname.startsWith("/dashboard");
  let hasValidToken = !!token;
  let response;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   hasValidToken = true;
    } catch (error) {
    //   hasValidToken = false;
    }
  }
  if (isPublicPath && hasValidToken) {
    response = NextResponse.redirect(new URL("/dashboard", req.url));
    applyCacheHeaders(response);
    return response;
  }

  if (isProtectedPath && !hasValidToken) {
    const response = NextResponse.redirect(new URL("/", req.url));
    applyCacheHeaders(response);
    return response;
  }
  response = NextResponse.next();
  applyCacheHeaders(response);
  return response;
}
function applyCacheHeaders(res) {
  res.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
}
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/"],
};
