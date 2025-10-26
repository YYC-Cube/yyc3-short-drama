import type { Viewport } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6b7280" },
    { media: "(prefers-color-scheme: dark)", color: "#4b5563" },
  ],
  colorScheme: "dark light",
}
