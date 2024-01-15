import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "./router/routes";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const loggedInCookie = request.cookies.get("logged_in")?.value;
  const protectedRoutes = Object.values(PROTECTED_ROUTES) as string[];
  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    loggedInCookie === "false"
  ) {
    return NextResponse.redirect(new URL(PUBLIC_ROUTES.LOGIN, request.url));
  }
}
