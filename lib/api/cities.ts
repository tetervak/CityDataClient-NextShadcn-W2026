import axios from "axios"
import { City } from "@/lib/api/types"

function dataUrl(id?: string): string{
  if(id){
    return `http://localhost:8080/api/cities/${id}`;
  }else{
    return 'http://localhost:8080/api/cities';
  }
}

export async function fetchCities(): Promise<City[]> {
  const res = await axios.get<City[]>(dataUrl())
  return res.data
}

export async function fetchCity(id: string): Promise<City> {
  const res = await axios.get<City>(dataUrl(id))
  return res.data
}

export async function deleteCity(id: string): Promise<void> {
  const res = await axios.delete(dataUrl(id))
  return res.data
}

export async function addCity(city: City): Promise<City> {
  const res = await axios.post(
    dataUrl(),
    city,
    {
      headers: { "Content-Type": "application/json" }
    }
  )

  return res.data
}

export async function updateCity(city: City): Promise<City> {
  const response = await axios.put(
    dataUrl(city.cityId),
    city,
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  )

  return response.data
}
