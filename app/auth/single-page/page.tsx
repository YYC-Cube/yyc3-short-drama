import type { Metadata } from "next"
import SinglePageAuth from "@/components/auth/single-page-auth"

export const metadata: Metadata = {
  title: "用户登录注册 | 言语逸品 - 河洛文化数字传承平台",
  description: "加入言语逸品，探索河洛文化的无限可能。融合AI技术与传统文化，开启您的文化创作之旅。",
  keywords: "用户登录,用户注册,河洛文化,数字传承,AI创作,文化平台",
}

export default function SinglePageAuthPage() {
  return <SinglePageAuth />
}
