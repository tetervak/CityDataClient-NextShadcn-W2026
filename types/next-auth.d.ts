import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  /**
   * This covers the session object used in auth() and useSession()
   */
  interface Session {
    accessToken?: string
  }

  /**
   * This covers the user object within the session
   */
  interface User {
    id?: string
  }
}

declare module "next-auth/jwt" {
  /**
   * This covers the token object in the jwt() callback
   */
  interface JWT {
    accessToken?: string
  }
}
