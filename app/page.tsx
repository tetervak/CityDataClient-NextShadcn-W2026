"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/page-container"
import {
  LogInIcon,
  TableIcon,
} from "lucide-react"
import { useRoles } from "@/hooks/use-roles"
import { LogoutButton } from "@/components/logout-button"
import { signIn } from "next-auth/react"

export default function HomePage() {

  const { isAuthenticated } = useRoles() // Single line of "Identity" logic

  const handleLogin = () => {
    void signIn("spring-auth", { callbackUrl: "/cities" })
  }

  return (
    <PageContainer>
      {isAuthenticated && <LogoutButton />}
      <h1 className="text-4xl text-green-700">City Data Client</h1>
      <p className="mb-8 max-w-md text-center text-xl text-slate-600">
        Programming Example.
      </p>

      {isAuthenticated ? (
        <Button className="mt-2" asChild>
          <Link href="/cities">
            <TableIcon />
            List Cities
          </Link>
        </Button>
      ) : (
        <Button onClick={handleLogin} size="lg" className="bg-blue-600 hover:bg-blue-700">
            <LogInIcon /> Login
        </Button>
      )}
    </PageContainer>
  )
}
