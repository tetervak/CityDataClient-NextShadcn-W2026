'use client';
import { Button } from "@/components/ui/button"
import React from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { fetchCity } from "@/lib/api/cities"
import { CheckIcon, TableIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { PageContainer } from "@/components/page-container"
import { Loading } from "@/components/loading"
import { LoadingError } from "@/components/loading-error"
import { ButtonGroup } from "@/components/ui/button-group"
import { CityDetailsCard } from "@/components/city-details-card"
import { useSession } from "next-auth/react"

export default function CityDetails() {

  const { data: session } = useSession()

  // Get the session on the client
  const token = session?.accessToken

  const { id } = useParams()
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["city", id],
    queryFn: () => fetchCity(id as string, token),
    enabled: !!token, // Only fetch if we actually have a token
  })

  console.log('City details data:', data)

  if (isLoading) return <Loading />
  if (error) return <LoadingError message={error.message} retry={refetch}/>

  // Optional: Prevent the content from even showing if there's no token
  if (!token) return null

  return (
    <PageContainer>
      <h1 className="text-4xl text-green-700">City Details</h1>
      {data && <CityDetailsCard city={data} />}
      <ButtonGroup>
        <ButtonGroup>
          <Button asChild>
            <Link href="/">
              <TableIcon />
              List Cities
            </Link>
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button asChild className="bg-cyan-700 hover:bg-cyan-500">
            <Link href={`/edit-city/${id}`}>
              <CheckIcon />
              Edit
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-red-500 hover:text-red-600"
          >
            <Link href={`/delete-city/${id}`}>
              <TrashIcon />
              Delete
            </Link>
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </PageContainer>
  )
}
