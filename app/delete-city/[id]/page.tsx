'use client'
import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/page-container"
import { TableIcon, TrashIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { ButtonGroup } from "@/components/ui/button-group"
import React from "react"
import { useParams, useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCity, fetchCity } from "@/lib/api/cities"
import { Loading } from "@/components/loading"
import { LoadingError } from "@/components/loading-error"
import { CityDetailsCard } from "@/components/city-details-card"
import { useSession } from "next-auth/react"

export default function DeleteCity() {
  const { data: session } = useSession()

  // Get the session on the client
  const token = session?.accessToken

  const { id } = useParams()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["city", id],
    queryFn: () => fetchCity(id as string, token),
    enabled: !!token, // Only fetch if we actually have a token
  })

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteCity(id, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["cities"] })
      router.push("/")
    },
    onError: (err: Error) => {
      // Professional tip: Check for 403 Forbidden specifically
      console.error(err)
    },
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingError message={error.message} retry={refetch} />

  // Optional: Prevent the content from even showing if there's no token
  if (!token) return null

  return (
    <PageContainer>
      <h1 className="text-4xl text-green-700">Delete City</h1>
      <h2 className="text-2xl text-red-700 italic">
        Do you really want to delete this city?
      </h2>
      {data && <CityDetailsCard city={data} />}
      <ButtonGroup>
        <Button
          className="bg-red-600 text-white hover:bg-red-500"
          onClick={() => mutate(id as string)}
        >
          <TrashIcon />
          Delete
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <XIcon />
            Cancel
          </Link>
        </Button>
      </ButtonGroup>
      <Button asChild>
        <Link href="/">
          <TableIcon />
          List Cities
        </Link>
      </Button>
    </PageContainer>
  )
}