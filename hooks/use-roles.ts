import { useSession } from "next-auth/react"

export function useRoles() {
  const { data: session, status } = useSession()

  const roles = session?.user?.roles || []

  return {
    // Boolean flags for easy UI gating
    isAdmin: roles.includes("ROLE_ADMIN"),
    isUser: roles.includes("ROLE_USER"),

    // Status helpers
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",

    // Raw roles if needed
    roles,
  }
}
