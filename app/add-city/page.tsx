'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageContainer } from "@/components/page-container"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  population: z.number().int().positive({
    message: "Population must be a positive number.",
  }),
  capital: z.boolean(),
})

type FormData = z.infer<typeof formSchema>;

export function AddCity() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      population: 0,
      capital: false,
    },
  })

  function onSubmit(values: FormData) {
    console.log(values)
  }

  return(
    <PageContainer>
      <h1 className="text-4xl text-green-700">Add City</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">



        <Button type="submit">Submit</Button>
      </form>
    </PageContainer>
  )
}