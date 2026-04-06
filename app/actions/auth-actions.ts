"use server"
import { cookies } from "next/headers"

export async function clearCookie() {
  const cookieStore = await cookies()
  // This sends a 'Set-Cookie' header to the browser with an expired date
  cookieStore.delete("JSESSIONID")
}
