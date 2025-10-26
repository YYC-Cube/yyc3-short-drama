"use client"

import UniversalHeader from "@/components/shared/universal-header"
import { User } from "lucide-react"

export default function ProfileHeader() {
  return (
    <UniversalHeader
      title="个人中心"
      subtitle="管理您的创作作品和个人设置"
      icon={User}
      backgroundImage="/cultural-artist-profile.png"
      accentColor="purple"
      height="sm"
    />
  )
}
