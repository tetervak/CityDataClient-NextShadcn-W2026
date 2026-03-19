import axios from "axios"
import { City } from "@/lib/api/types"

export async function fetchCities(): Promise<City[]> {
  const res = await axios.get<City[]>("http://localhost:8080/api/cities")
  return res.data
}

export async function fetchCity(id: string): Promise<City> {
  const res = await axios.get<City>(`http://localhost:8080/api/cities/${id}`)
  return res.data
}