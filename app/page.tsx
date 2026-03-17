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

export default function CityList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <React.Fragment>
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
              {data.map((city: City) => (
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
    </React.Fragment>
  )
}
