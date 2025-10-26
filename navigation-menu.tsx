"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Clock } from "lucide-react"

export default function NavigationMenu() {
  const [activeSection, setActiveSection] = useState<number | null>(null)

  const menuItems = [
    {
      title: "文化基因数字化重构",
      href: "#section-1",
      description: "",
      icon: null,
    },
    {
      title: "虚实共生社交体系",
      href: "#section-2",
      description: "",
      icon: null,
    },
    {
      title: "星值经济文化赋能",
      href: "#section-3",
      description: "",
      icon: null,
    },
    {
      title: "技术实现路径",
      href: "#section-4",
      description: "",
      icon: null,
    },
    {
      title: "沉漫式创作工具升级",
      href: "#section-5",
      description: "",
      icon: null,
    },
    {
      title: "文化裂变运营策略",
      href: "#section-6",
      description: "",
      icon: null,
    },
    {
      title: "数据智能中枢建设",
      href: "#section-7",
      description: "",
      icon: null,
    },
    {
      title: "可持续发展架构",
      href: "#section-8",
      description: "",
      icon: null,
    },
    {
      title: "阶段实施路线图",
      href: "#section-9",
      description: "",
      icon: null,
    },
    {
      title: "跨界融合创新模块",
      href: "#section-10",
      description: "",
      icon: null,
    },
    {
      title: "情感化体验升级",
      href: "#section-11",
      description: "",
      icon: null,
    },
    {
      title: "创作者成长生态",
      href: "#section-12",
      description: "",
      icon: null,
    },
    {
      title: "技术伦理防火墙",
      href: "#section-13",
      description: "",
      icon: null,
    },
    {
      title: "价值转化加速器",
      href: "#section-14",
      description: "",
      icon: null,
    },
    {
      title: "进化路线图2.0",
      href: "#section-15",
      description: "",
      icon: null,
    },
    {
      title: "文化认知深化工程",
      href: "#section-16",
      description: "",
      icon: null,
    },
    {
      title: "多维感知增强方案",
      href: "#section-17",
      description: "",
      icon: null,
    },
    {
      title: "全球化传播引擎",
      href: "#section-18",
      description: "",
      icon: null,
    },
    {
      title: "量子跃迁预备方案",
      href: "#section-19",
      description: "",
      icon: null,
    },
    {
      title: "永恒轮回生态机制",
      href: "#section-20",
      description: "",
      icon: null,
    },
    {
      title: "文化穿越",
      href: "/cultural-crossing",
      description: "体验时空折叠与数字演员的沉浸式创作",
      icon: <Clock className="h-5 w-5" />,
    },
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E4%BA%91%E7%BA%B9%E5%85%A8%E6%81%AF%E5%8F%B0%E4%B8%8A%E3%80%8A%E6%B4%9B%E7%A5%9E%E8%B5%8B%E5%9B%BE%E3%80%8B%E5%AE%9E%E6%97%B6%E8%A7%A3%E6%9E%84%E9%87%8D%E7%BB%84%EF%BC%8C%E7%94%A8%E6%88%B7%E8%99%9A%E6%8B%9F%E5%8C%96%E8%BA%AB%E7%A9%BF%E8%B6%8A%E6%97%B6%E8%A7%A6%E5%8F%91%E9%87%91%E8%89%B2%E6%95%B0%E6%8D%AE%E6%B6%9F%E6%BC%AA%EF%BC%8CAR%E7%9C%BC%E9%95%9C%E6%A1%86%E6%B5%81%E6%B7%8C%E7%94%B2%E9%AA%A8%E6%96%87%E5%BD%A2%E6%80%81%E5%BC%B9%E5%B9%95%E6%B5%81%EF%BC%8C%E9%9C%93%E8%A3%B3%E9%A3%98%E5%B8%A6%E8%BF%90%E7%94%A8%E6%9F%94%E4%BD%93%E5%8A%A8%E5%8A%9B%E5%AD%A6%E6%A8%A1%E6%8B%9F%EF%BC%8C%E4%B8%89%E7%BB%B4%E6%96%87%E7%89%A9%E6%89%AB%E6%8F%8F%E7%B2%BE%E5%BA%A6.png-fXy4fVKgVLmqxn5oM3Jc6a32AWu5Lc.jpeg"
          alt="云纹全息台上《洛神赋图》实时解构重组"
          fill
          className="object-cover brightness-[0.6]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </div>

      {/* Navigation Content */}
      <div className="relative z-10 flex flex-col items-start justify-center min-h-screen px-8 md:px-16 lg:px-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-300 mb-8 tracking-wider">
          『言语』逸品云享智能短剧·导演栈
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 w-full max-w-5xl">
          {menuItems.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="group flex items-center space-x-2 text-white/90 hover:text-amber-300 transition-colors duration-300"
              onMouseEnter={() => setActiveSection(index)}
              onMouseLeave={() => setActiveSection(null)}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-amber-500/70 text-amber-300 font-medium">
                {index + 1}
              </span>
              <span className={`text-lg md:text-xl ${activeSection === index ? "text-amber-300" : ""}`}>
                {item.title}
              </span>
              <ChevronRight
                className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${activeSection === index ? "text-amber-300" : "text-white"}`}
              />
            </Link>
          ))}
        </div>

        <div className="absolute bottom-8 left-8 md:left-16 lg:left-24 text-white/70 text-sm">
          © 2024 『言语』逸品云享 · 数字文化传承
        </div>
      </div>
    </div>
  )
}
