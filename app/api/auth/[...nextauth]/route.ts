// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth" // This imports from your auth.ts factory
export const { GET, POST } = handlers
