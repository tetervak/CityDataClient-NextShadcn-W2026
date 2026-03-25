import { City } from "@/lib/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"


export function CityDetailsCard({city}: {city: City}){
  
  return (
    <Card className="w-full p-6">
      <CardHeader>
        <CardTitle className="text-3xl text-orange-500">{city.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>
          <span className="text-xl font-bold">Country:</span>
          <span className="ml-2 text-xl text-indigo-500 italic">
            {city.country}
          </span>
        </p>
        <p>
          <span className="text-xl font-bold">Population:</span>
          <span className="ml-2 text-xl text-indigo-500 italic">
            {city.population.toLocaleString()}
          </span>
        </p>
        <p>
          <span className="text-xl font-bold">Area:</span>
          <span className="ml-2 text-xl text-indigo-500 italic">
            {city.area.toLocaleString()}
          </span>
        </p>
        <p>
          <span className="text-xl font-bold">Capital:</span>
          <span className="ml-2 text-xl text-indigo-500 italic">
            {city.capital ? "Yes" : "No"}
          </span>
        </p>
      </CardContent>
    </Card>
  )
  
}