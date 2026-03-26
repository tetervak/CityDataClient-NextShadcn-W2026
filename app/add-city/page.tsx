'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageContainer } from "@/components/page-container"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { CheckIcon, TableIcon, XIcon } from "lucide-react"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCity } from "@/lib/api/cities"
import { useRouter } from "next/navigation"

const addCityFormSchema = z.object({
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

const defaultCityInputValues = {
  cityId: "",
  name: "",
  population: 10000,
  capital: false,
  area: 0,
  country: "Canada",
};

type AddCityFormData = z.infer<typeof addCityFormSchema>

export default function AddCity() {
  const form = useForm<AddCityFormData>({
    resolver: zodResolver(addCityFormSchema),
    defaultValues: defaultCityInputValues,
    mode: "onTouched",
  })

  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn: addCity,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["cities"] })
      router.push("/")
    },
    onError: (err: Error) => {
      console.error(err)
    },
  })

  function onSubmit(values: AddCityFormData) {
    console.log(values)
    mutate(values)
  }

  return (
    <PageContainer>
      <h1 className="text-4xl text-green-700">Add City</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-8">
        <FieldGroup>
          <Controller
            name="cityId"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Field orientation="responsive">
                <FieldLabel htmlFor="add-city-id">City ID</FieldLabel>
                <Input
                  {...field}
                  id="add-city-id"
                  name={field.name}
                  type="text"
                  placeholder="Enter city ID"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>
                  This is the unique identifier for the city.
                </FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="add-city-name">City Name</FieldLabel>
                <Input
                  {...field}
                  id="add-city-name"
                  name={field.name}
                  type="text"
                  placeholder="Enter city Name"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>
                  This is the name of the city.
                </FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="population"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="add-city-population">
                  Population
                </FieldLabel>
                <Input
                  {...field}
                  id="add-city-population"
                  name={field.name}
                  type="number"
                  step={10000}
                  placeholder="Enter city Population"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>
                  This is the population of the city.
                </FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="capital"
            control={form.control}
            render={({ field }) => (
              <FieldSet className="flex gap-2">
                <Field orientation="horizontal">
                  <Checkbox
                    id="add-city-capital"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel htmlFor="add-city-capital">Capital</FieldLabel>
                </Field>
                <FieldDescription>
                  This is whether the city is a capital or not.
                </FieldDescription>
              </FieldSet>
            )}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="area"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="add-city-area">Area</FieldLabel>
                <Input
                  {...field}
                  id="add-city-area"
                  name={field.name}
                  type="number"
                  step={1}
                  placeholder="Enter city Area"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>
                  This is the area of the city.
                </FieldDescription>
              </Field>
            )}
            />
        </FieldGroup>
        <FieldGroup>
          <Controller
            name="country"
            control={form.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="add-city-country">Country</FieldLabel>
                <Input
                  {...field}
                  id="add-city-country"
                  name={field.name}
                  type="text"
                  placeholder="Enter city Country"
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <FieldDescription>
                  This is the country of the city.
                </FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>
        <ButtonGroup>
          <Button type="submit">
            <CheckIcon />
            Submit
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <XIcon />
              Cancel
            </Link>
          </Button>
        </ButtonGroup>
      </form>
      <Button className="mt-2" asChild>
        <Link href="/">
          <TableIcon />
          List Cities
        </Link>
      </Button>
    </PageContainer>
  )
}