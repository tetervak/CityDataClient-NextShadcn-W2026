
import { z } from "zod"

export const defaultCityFormValues = {
  cityId: "",
  name: "",
  population: 10000,
  capital: false,
  area: 0,
  country: "Canada",
}

export const cityFormSchema = z.object({
  cityId: z.string().min(1, {
    message: "ID must be at least 1 character.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  population: z.coerce // Coerces the input string from the form field to a number
    .number<number>("Population must be a number")
    .int("Population must be a whole number")
    .min(0, "Population cannot be negative"),
  capital: z.boolean(),
  area: z.coerce
    .number<number>("Area must be a number")
    .min(0, "Area cannot be negative"),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
})

export type CityFormData = z.infer<typeof cityFormSchema>