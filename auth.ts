// auth.ts
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    {
      id: "spring-auth",
      name: "Spring Academy",
      type: "oidc",
      issuer: "http://localhost:9000",
      clientId: "nextjs-client",
      clientSecret: "nextjs-secret",
      authorization: {
        params: { scope: "openid profile read offline_access" },
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: Math.floor(Date.now() / 1000 + (account.expires_in || 0)),
        }
      }

      // If the token hasn't expired yet, return it
      if (Date.now() < (token.expiresAt as number) * 1000) {
        return token
      }

      // If it HAS expired, trigger the refresh logic (Step C)
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
})

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    // 1. Type Guard: If we don't have a refresh token, we can't refresh!
    if (!token.refreshToken) {
      throw new Error("Missing refresh token")
    }

    const response = await fetch("http://localhost:9000/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: "nextjs-client",
        client_secret: "nextjs-secret",
        grant_type: "refresh_token",
        // 2. Explicitly cast to string now that we've guarded against undefined
        refresh_token: token.refreshToken as string,
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) throw refreshedTokens

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: Math.floor(Date.now() / 1000 + refreshedTokens.expires_in),
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error("RefreshAccessTokenError", error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}