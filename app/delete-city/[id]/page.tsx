'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageContainer } from "@/components/page-container"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckIcon, TableIcon, TrashIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { ButtonGroup } from "@/components/ui/button-group"
import React from "react"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { fetchCity } from "@/lib/api/cities"
import { Loading } from "@/components/loading"
import { LoadingError } from "@/components/loading-error"
import { CityDetailsCard } from "@/components/city-details-card"


export default function DeleteCity() {

  const { id } = useParams()
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["city", id],
    queryFn: () => fetchCity(id as string),
  })

  console.log("City details data:", data)

  if (isLoading) return <Loading />
  if (error) return <LoadingError message={error.message} retry={refetch} />


  return (
    <PageContainer>
      <h1 className="text-4xl text-green-700">Delete City</h1>
      <h2 className="text-2xl text-red-700 italic">
        Do you really want to delete this city?
      </h2>
      {data && <CityDetailsCard city={data}/>}
      <ButtonGroup>
        <Button className="bg-red-500 text-white">
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