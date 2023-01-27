import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "cookies-next";
import JWT from "./lib/backendHelpers/JWT";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access-token")?.value;
  const validToken = await JWT.verifyToken(token);
  // const validToken = token ? await JWT.verifyToken(token) : false;

  // console.log("PATHNAME", request.nextUrl.pathname);
  // console.log("TOKEN", token);
  // console.log("VERIFICATION", validToken);
  if (request.nextUrl.pathname === "/api/auth/logout" && !validToken) {
    return NextResponse.redirect(
      new URL("/api/auth/unauthorized", request.url)
    );
  } else if (
    request.nextUrl.pathname.startsWith("/api") &&
    !request.nextUrl.pathname.startsWith("/api/auth") &&
    !validToken
  ) {
    return NextResponse.redirect(
      new URL("/api/auth/unauthorized", request.url)
    );
  } else if (request.nextUrl.pathname.startsWith("/dashboard") && !validToken) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (request.nextUrl.pathname === "/" && validToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (
    request.nextUrl.pathname.startsWith("/api") &&
    !request.nextUrl.pathname.startsWith("/api/auth") &&
    validToken
  ) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("payload", JSON.stringify(validToken));
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/api/:path*", "/dashboard/:path*"],
};
