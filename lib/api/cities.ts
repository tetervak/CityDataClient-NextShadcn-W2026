import axios from "axios"
import { City } from "@/lib/api/types"

function dataUrl(id?: string): string{
  if(id){
    return `http://localhost:8080/api/cities/${id}`;
  }else{
    return 'http://localhost:8080/api/cities';
  }
}

function requestConfig(token?: string){
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  }
}

export async function fetchCities (token?: string): Promise<City[]> {
  const response =
    await axios.get(dataUrl(), requestConfig(token))
  return response.data
}

export async function fetchCity(id: string, token?: string): Promise<City> {
  const res =
    await axios.get<City>(dataUrl(id), requestConfig(token))
  return res.data
}

export async function deleteCity(id: string, token?: string): Promise<void> {
  const res =
    await axios.delete(dataUrl(id), requestConfig(token))
  return res.data
}

export async function addCity (city: City, token?: string): Promise<City> {
  const response =
    await axios.post(dataUrl(), city, requestConfig(token))
  return response.data
}

export async function updateCity(city: City, token?: string): Promise<City> {
  const response =
    await axios.put(dataUrl(city.cityId), city, requestConfig(token))

  return response.data
}


// export async function updateCity(city: City): Promise<City> {
//   const response = await axios.put(
//     dataUrl(city.cityId),
//     city,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     }
//   )
//
//   return response.data
// }
