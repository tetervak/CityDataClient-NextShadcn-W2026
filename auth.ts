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
        params: { scope: "openid profile read write offline_access" },
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
    if (!token.refreshToken) throw new Error("Missing refresh token")

    // Create the Basic Auth header: base64(client_id:client_secret)
    const basicAuth = Buffer.from("nextjs-client:nextjs-secret").toString(
      "base64"
    )

    const response = await fetch("http://localhost:9000/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`, // Add this header
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      console.error("Spring Auth Server Error:", refreshedTokens)
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: Math.floor(Date.now() / 1000 + refreshedTokens.expires_in),
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error("RefreshAccessTokenError", error)
    return { ...token, error: "RefreshAccessTokenError" }
  }
}