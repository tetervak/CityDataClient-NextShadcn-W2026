'use client';

import { Button } from "@/components/ui/button"
import React from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { fetchCity } from "@/lib/api/cities"
import { TableIcon } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PageContainer } from "@/components/page-container"
import { Loading } from "@/components/loading"
import { LoadingError } from "@/components/loading-error"

export default function CityDetails() {
  const { id } = useParams()
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["city", id],
    queryFn: () => fetchCity(id as string),
  })

  console.log('City details data:', data)

  if (isLoading) return <Loading />
  if (error) return <LoadingError message={error.message} retry={refetch}/>

  return (
    <PageContainer>
      <h1 className="text-4xl text-green-700">City Details</h1>
      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle className="text-3xl text-orange-500">{data?.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>
            <span className="text-xl font-bold">Country:</span>
            <span className="ml-2 text-xl text-indigo-500 italic">
              {data?.country}
            </span>
          </p>
          <p>
            <span className="text-xl font-bold">Population:</span>
            <span className="ml-2 text-xl text-indigo-500 italic">
              {data?.population.toLocaleString()}
            </span>
          </p>
          <p>
            <span className="text-xl font-bold">Area:</span>
            <span className="ml-2 text-xl text-indigo-500 italic">
              {data?.area.toLocaleString()}
            </span>
          </p>
          <p>
            <span className="text-xl font-bold">Capital:</span>
            <span className="ml-2 text-xl text-indigo-500 italic">
              {(data?.capital) ? "Yes" : "No"}
            </span>
          </p>
        </CardContent>
      </Card>
      <Button className="mt-2" asChild>
        <Link href="/">
          <TableIcon />
          List Cities
        </Link>
      </Button>
    </PageContainer>
  )
}
