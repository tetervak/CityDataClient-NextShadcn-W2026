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

import { toast } from "sonner"; // 1. Import toast

export default function DeleteCity() {

  const { id } = useParams()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["city", id],
    queryFn: () => fetchCity(id as string),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      // Success Toast
      toast.success(`City "${data?.name}" deleted successfully!`)

      void queryClient.invalidateQueries({ queryKey: ["cities"] })
      router.push("/cities")
    },
    onError: (err: Error) => {
      // 3. Error Toast - can show specific Spring error messages
      const errorMessage = err.message || "Failed to delete city."
      toast.error(errorMessage)

      // Professional tip: Check for 403 Forbidden specifically
      console.error(err)
    },
  })

  if (isLoading) return <Loading />
  if (error) return <LoadingError message={error.message} retry={refetch} />

  return (
    <PageContainer>
      <h1 className="text-4xl text-green-700">Delete City</h1>
      <h2 className="text-2xl text-red-700 italic">
        Do you really want to delete this city?
      </h2>
      {data && <CityDetailsCard city={data} />}
      <ButtonGroup>
        <Button
          disabled={isPending}
          className="bg-red-600 text-white hover:bg-red-500"
          onClick={() => mutate(id as string)}
        >
          <TrashIcon />
          {isPending ? "Deleting..." : "Delete"}
        </Button>
        <Button asChild variant="outline">
          <Link href="/cities">
            <XIcon />
            Cancel
          </Link>
        </Button>
      </ButtonGroup>
      <Button asChild>
        <Link href="/cities">
          <TableIcon />
          List Cities
        </Link>
      </Button>
    </PageContainer>
  )
}