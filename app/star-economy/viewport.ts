import type { Viewport } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eab308" },
    { media: "(prefers-color-scheme: dark)", color: "#ca8a04" },
  ],
  colorScheme: "dark light",
}
