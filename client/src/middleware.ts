import { PROTECTED_ROUTES } from "./router/routes";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const loggedInCookie = request.cookies.get("logged_in")?.value;
  const protectedRoutes = Object.values(PROTECTED_ROUTES) as string[];
  if (protectedRoutes.includes(request.nextUrl.pathname) && !loggedInCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
