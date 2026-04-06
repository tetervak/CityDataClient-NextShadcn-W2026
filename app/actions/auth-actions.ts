// app/actions/auth-actions.tsx

"use server"
import { cookies } from "next/headers"

import { signOut } from "@/auth"

export async function handleGlobalLogout() {
  // 1. Clear Next.js Session
  await signOut({ redirect: false })

  // 2. Return the URL for the "Global" logout
  return "http://localhost:9000/logout"
}

// this work only when the authorization server is on the same domain with the client
export async function clearCookie() {
  const cookieStore = await cookies()
  // This sends a 'Set-Cookie' header to the browser with an expired date
  cookieStore.delete("JSESSIONID")
}
