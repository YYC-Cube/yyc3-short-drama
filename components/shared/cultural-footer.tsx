"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function CulturalFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-t from-black to-gray-900 border-t border-white/10 py-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">言</span>
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">言语逸品</h3>
                <p className="text-amber-300">河洛文化数字传承平台</p>
              </div>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              致力于运用现代科技手段传承和弘扬河洛文化，让千年文明在数字时代重新绽放光彩。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/ai-script" className="text-white/70 hover:text-amber-300 transition-colors">
                  AI编剧
                </Link>
              </li>
              <li>
                <Link href="/cultural-gene" className="text-white/70 hover:text-amber-300 transition-colors">
                  文化基因
                </Link>
              </li>
              <li>
                <Link href="/social-system" className="text-white/70 hover:text-amber-300 transition-colors">
                  社交体系
                </Link>
              </li>
              <li>
                <Link href="/star-economy" className="text-white/70 hover:text-amber-300 transition-colors">
                  星值经济
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">联系我们</h4>
            <ul className="space-y-2 text-white/70">
              <li>邮箱：contact@yanyu.com</li>
              <li>电话：400-888-8888</li>
              <li>地址：河南省洛阳市</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/60">© 2024 言语逸品. 保留所有权利.</p>
        </div>
      </div>
    </motion.footer>
  )
}

export { CulturalFooter }
