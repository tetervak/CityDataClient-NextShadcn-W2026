// middleware.ts
import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/api/auth") ||
    req.nextUrl.pathname.startsWith("/login")

  if (!isLoggedIn && !isAuthPage) {
    return Response.redirect(new URL("/login", req.nextUrl.origin))
  }
})

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
