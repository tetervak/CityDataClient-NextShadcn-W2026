import { Geist, Geist_Mono, Roboto } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const roboto = Roboto({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", roboto.variable)}
    >
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
            <div className="justify-top flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 bg-white px-16 py-16 sm:items-start dark:bg-black">
            {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
