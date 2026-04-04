// lib/api/cities.ts
import api from "./axios-instance"
import { City } from "@/lib/api/types"

function dataUrl(id?: string): string{
  if(id){
    return `http://localhost:8080/api/cities/${id}`;
  }else{
    return 'http://localhost:8080/api/cities';
  }
}

// No token mentioned here! The interceptor adds it automatically.
export async function fetchCities (): Promise<City[]> {
  const { data } = await api.get(dataUrl())
  return data
}

export async function fetchCity(id: string): Promise<City> {
  const { data } = await api.get(dataUrl(id))
  return data
}

export async function deleteCity(id: string): Promise<void> {
  const { data } = await api.delete(dataUrl(id))
  return data
}

export async function addCity (city: City): Promise<City> {
  const { data } = await api.post(dataUrl(), city)
  return data
}

export async function updateCity(city: City): Promise<City> {
  const { data } = await api.put(dataUrl(city.cityId), city)
  return data
}
