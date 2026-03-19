import { PageContainer } from "@/components/page-container"

type ErrorProps = {
  message: string;
}

export function LoadingError({message}: ErrorProps){
  return (
    <PageContainer>
      <span className="text-red-500 text-4xl italic">Error: {message}</span>
    </PageContainer>
  )
}