// auth.ts
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import { jwtDecode } from "jwt-decode" // 1. Import decoder

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    {
      id: "spring-auth",
      name: "City Data Authorization Server",
      type: "oidc",
      issuer: "http://localhost:9000",
      clientId: "nextjs-client",
      clientSecret: "nextjs-secret",
      authorization: {
        params: { scope: "openid profile read write delete offline_access" },
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // 2. Decode the roles during the initial login
        const decoded: JWT = jwtDecode(account.access_token!)

        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          roles: decoded.roles, // Save the roles into the JWT cookie
          expiresAt: Math.floor(
            Date.now() / 1000 + (account.expires_in || 0) - 30
          ),
        }
      }

      if (Date.now() < (token.expiresAt as number) * 1000) {
        return token
      }

      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      // 3. Pass the token data into the session so components can see it
      session.accessToken = token.accessToken
      session.user.roles = token.roles as string[]
      return session
    },
  },
})

async function refreshAccessToken(token: JWT): Promise<JWT> {
  console.log("Refreshing token at", new Date().toLocaleTimeString())
  try {
    if (!token.refreshToken) throw new Error("Missing refresh token")

    const basicAuth = Buffer.from("nextjs-client:nextjs-secret").toString(
      "base64"
    )

    const response = await fetch("http://localhost:9000/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
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

    // 4. Decode the NEW access token to get updated roles
    const decoded: JWT = jwtDecode(refreshedTokens.access_token)

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: Math.floor(Date.now() / 1000 + refreshedTokens.expires_in),
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      roles: decoded.roles, // Ensure roles are updated on refresh
    }
  } catch (error) {
    console.error("RefreshAccessTokenError", error)
    return { ...token, error: "RefreshAccessTokenError" }
  }
}
