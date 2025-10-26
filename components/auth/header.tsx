"use client"

import UniversalHeader from "@/components/shared/universal-header"
import { Shield } from "lucide-react"

export default function AuthHeader() {
  return (
    <UniversalHeader
      title="用户认证"
      subtitle="安全登录，开启您的文化创作之旅"
      icon={Shield}
      backgroundImage="/cultural-digital-authentication.png"
      accentColor="green"
      height="sm"
    />
  )
}
