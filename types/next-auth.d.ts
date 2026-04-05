import "next-auth"
import "next-auth/jwt"

import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      roles?: string[]
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
    roles?: string[]
    error?: "RefreshAccessTokenError"
  }
}
