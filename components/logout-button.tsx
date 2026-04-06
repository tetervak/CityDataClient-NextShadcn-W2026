// app/components/logout-button.tsx

"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { clearCookie, handleGlobalLogout } from "@/app/actions/auth-actions"

export function LogoutButton() {

  const handleLogout = async () => {
    const logoutUrl = await handleGlobalLogout()
    // This physically moves the user to Spring to kill the master session
    window.location.href = logoutUrl
  }

  // const handleLogout = () => {
  //   void clearCookie()
  //   // This clears the Next.js session and redirects to the home page or login
  //   void signOut({ callbackUrl: "/" })
  // }

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
