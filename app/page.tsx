'use client';

import React from "react"
import { fetchCities } from "@/lib/api/cities"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { City } from "@/lib/api/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageContainer } from "@/components/page-container"
import { Loading } from "@/components/loading"
import { LoadingError } from "@/components/loading-error"
import { CirclePlusIcon } from "lucide-react"

export default function CityList() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  })

  if (isLoading) return <Loading/>
  if (error) return <LoadingError message={error.message} retry={refetch}/>

  return (
    <PageContainer>
      <h1 className="text-4xl text-green-700">City List</h1>
      <Card className="w-full">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Population</TableHead>
                <TableHead>Country</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((city: City) => (
                <TableRow key={city.cityId}>
                  <TableCell>
                    <Button variant="link" asChild>
                      <Link href={`/cities/${city.cityId}`}>{city.name}</Link>
                    </Button>
                  </TableCell>
                  <TableCell>{city.population.toLocaleString()}</TableCell>
                  <TableCell>{city.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <p>
        <Button className="mt-2" asChild>
          <Link href="/add-city"><CirclePlusIcon/>Add City</Link>
        </Button>
      </p>
    </PageContainer>
  )
}
