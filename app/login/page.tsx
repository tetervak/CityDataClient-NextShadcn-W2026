"use client"

import { signIn } from "next-auth/react"
import { useEffect } from "react"
import { Loading } from "@/components/loading"

export default function LoginPage() {
  useEffect(() => {
    // This triggers the redirect to Spring (9000) automatically
    signIn("spring-auth", { callbackUrl: "/" })
  }, [])

  return <Loading /> // Show your spinner while the redirect happens
}
