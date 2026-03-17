export async function fetchCities() {
  const res = await fetch("http://localhost:8080/api/cities")
  if (!res.ok) throw new Error("Failed to fetch cities")
  return res.json()
}

export async function fetchCity(id: string) {
  const res = await fetch(`http://localhost:8080/api/cities/${id}`)
  if (!res.ok) throw new Error("Failed to fetch city")
  return res.json()
}