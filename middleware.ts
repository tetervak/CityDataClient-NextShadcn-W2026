// middleware.ts
import { auth } from "@/auth"

// 1. Define your "Safe Zones"
const PUBLIC_ROUTES = [
  "/",               // The Home Page
  "/about",          // About Page
  "/contact",        // Contact Page
  "/public",         // Matches exactly /public
];


export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/api/auth") ||
    req.nextUrl.pathname.startsWith("/login")

  // 2. Check if the current path starts with any of our public strings
  // This handles both "/" and nested paths like "/public/images/logo.png"
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      nextUrl.pathname === route || nextUrl.pathname.startsWith("/public/")
  )

  if (!isLoggedIn && !isAuthPage && !isPublicRoute) {
    // If not logged in and NOT on a public page, force login
    return Response.redirect(new URL("/api/auth/signin", nextUrl))
  }

  // Otherwise, allow the request to proceed
  return
})

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
