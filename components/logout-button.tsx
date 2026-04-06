// app/components/logout-button.tsx

"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"

const handleLogout = async () => {
  // 1. Clear local Auth.js session
  await signOut({ redirect: false })

  // 2. Redirect to Spring with OIDC parameters
  const baseUrl = "http://localhost:9000/logout"
  const clientId = "nextjs-client" // Must match Spring config

  //const returnTo = window.location.origin // http://localhost:3000
  const returnTo = "http://localhost:3000"

  // Standard OIDC Logout Query
  const logoutUrl = `${baseUrl}?post_logout_redirect_uri=${encodeURIComponent(returnTo)}&client_id=${clientId}`

  // This physically moves the user to Spring to kill the master session
  window.location.href = logoutUrl
}

export function LogoutButton() {

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="text-red-600 hover:bg-red-50 hover:text-red-700 self-end"
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      Logout
    </Button>
  )
}
