import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth/session";

const publicRoutes = ["/entrar", "/registar"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await decrypt(req.cookies.get("session")?.value);
  const isAuthenticated = Boolean(session?.userId);

  if (pathname === "/") {
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/recibos", req.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/entrar", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)",
  ],
};
