'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageContainer } from "@/components/page-container"
import { Checkbox } from "@/components/ui/checkbox"
import { ButtonGroup } from "@/components/ui/button-group"
import { CheckIcon, TableIcon, XIcon } from "lucide-react"
import Link from "next/link"
import React from "react"

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

export default function EditCity() {
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

  return (
    <PageContainer>
      <h1 className="text-4xl text-green-700">Edit City</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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