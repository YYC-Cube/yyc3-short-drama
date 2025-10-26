import type { Metadata } from "next"
import ProfileHeader from "@/components/profile/header"
import UserProfile from "@/components/profile/user-profile"
import CulturalFooter from "@/components/shared/cultural-footer"

export const metadata: Metadata = {
  title: "个人中心 | 『言语』逸品云享智能短剧·导演栈",
  description: "查看个人信息、创作作品和权益状态",
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black">
      <ProfileHeader />

      <div className="container mx-auto px-4 py-16">
        <UserProfile />
      </div>

      <CulturalFooter />
    </main>
  )
}
