"use client"
import Image from "next/image"
import { motion } from "framer-motion"

interface CulturalImageGalleryProps {
  category: string
  layout: "grid" | "carousel"
  limit?: number
}

const imageData = {
  "cultural-gene": [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%89%AF%E6%A0%87%E9%A2%98.png-AzjqW3gR69o695uc8xrEariVS2XuV0.jpeg",
      alt: "Cultural Gene 1",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-H6aexriDuzAlhdhDbrnJwOTrCxh3j4.jpeg",
      alt: "Cultural Gene 2",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9.jpg-WWI0KFxCdPbbMDh7A266kOXjQ1Rpdx.jpeg",
      alt: "Cultural Gene 3",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5.jpg-MTuCnkcWOMfPsgrifp2jLAD3iMEiag.jpeg",
      alt: "Cultural Gene 4",
    },
  ],
  "social-system": [
    { src: "/placeholder.svg?height=400&width=600", alt: "Social System 1" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Social System 2" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Social System 3" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Social System 4" },
  ],
  "star-economy": [
    { src: "/placeholder.svg?height=400&width=600", alt: "Star Economy 1" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Star Economy 2" },
  ],
  "tech-path": [
    { src: "/placeholder.svg?height=400&width=600", alt: "Tech Path 1" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Tech Path 2" },
  ],
  "immersive-creation": [
    { src: "/placeholder.svg?height=400&width=600", alt: "Immersive Creation 1" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Immersive Creation 2" },
  ],
}

export default function CulturalImageGallery({ category, layout, limit }: CulturalImageGalleryProps) {
  const images = imageData[category] || []
  const limitedImages = limit ? images.slice(0, limit) : images

  if (layout === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {limitedImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative h-48 overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </motion.div>
        ))}
      </div>
    )
  }

  if (layout === "carousel") {
    return (
      <div className="flex overflow-x-auto space-x-4">
        {limitedImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative w-64 h-48 flex-shrink-0 overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
          </motion.div>
        ))}
      </div>
    )
  }

  return <div>Invalid layout</div>
}
