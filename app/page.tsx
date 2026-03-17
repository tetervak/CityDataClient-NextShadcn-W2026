import { Button } from "@/components/ui/button"
import React from "react"

export default function Page() {
  return (
        <React.Fragment>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </React.Fragment>
  )
}
