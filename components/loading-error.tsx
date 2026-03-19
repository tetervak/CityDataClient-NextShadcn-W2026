import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { RedoIcon } from "lucide-react"

type ErrorProps = {
  message: string;
  retry?: () => void;
}

export function LoadingError({message, retry}: ErrorProps){
  return (
    <PageContainer>
      <p className="text-red-500 text-4xl italic">Error: {message}</p>
      { retry &&
        <p>
          <Button onClick={retry} variant="secondary" className="text-xl p-4 text-blue-600">
            <RedoIcon/>Retry
          </Button>
        </p>
      }
    </PageContainer>
  )
}