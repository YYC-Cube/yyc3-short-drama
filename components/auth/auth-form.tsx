"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Phone, LogIn, QrCode, Shield, MapPin, BadgeCheck, AppWindow, AlertCircle, CheckCircle } from "lucide-react"
import { sendVerificationCode, loginUser, type LoginRequest } from "@/services/auth-service"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

// 关联应用数据
const relatedApps = [
  {
    id: 1,
    name: "洛阳文旅",
    icon: "/placeholder.svg?height=80&width=80&text=洛阳文旅",
    description: "洛阳官方文旅平台，提供景点导览和文化活动信息",
  },
  {
    id: 2,
    name: "河洛文创",
    icon: "/placeholder.svg?height=80&width=80&text=河洛文创",
    description: "河洛文化创意产品展示和销售平台",
  },
  {
    id: 3,
    name: "牡丹云集",
    icon: "/placeholder.svg?height=80&width=80&text=牡丹云集",
    description: "洛阳本地生活服务和社交平台",
  },
]

// 用户权益数据
const userBenefits = [
  {
    title: "本地用户专属权益",
    items: ["洛阳历史场景优先体验权", "文物数字化参与权", "本地文化活动优先报名", "实景拍摄场地预约特权"],
    icon: <MapPin className="h-6 w-6" />,
    color: "from-amber-400 to-amber-600",
  },
  {
    title: "认证创作者权益",
    items: ["专属创作者徽章展示", "作品优先推荐曝光", "创作资源优先分配", "参与平台决策投票"],
    icon: <BadgeCheck className="h-6 w-6" />,
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "应用互通权益",
    items: ["一键登录关联应用", "跨平台积分互通", "多平台作品展示", "联合活动优先参与"],
    icon: <AppWindow className="h-6 w-6" />,
    color: "from-green-400 to-green-600",
  },
]

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isLocalNumber, setIsLocalNumber] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginStatus, setLoginStatus] = useState<"idle" | "sending" | "logging" | "success" | "error">("idle")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // 倒计时效果
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [countdown])

  // 发送验证码
  const sendCode = async () => {
    if (!phoneNumber || phoneNumber.length !== 11) {
      toast({
        title: "手机号格式错误",
        description: "请输入正确的11位手机号",
        variant: "destructive",
      })
      return
    }

    setLoginStatus("sending")
    setIsLoading(true)

    try {
      const response = await sendVerificationCode({
        phoneNumber,
        purpose: "login",
      })

      if (response.success) {
        setIsCodeSent(true)
        setCountdown(60)

        // 检查是否为洛阳本地号码（从响应消息中判断）
        const isLocal = response.message.includes("洛阳本地用户")
        setIsLocalNumber(isLocal)

        toast({
          title: "验证码发送成功",
          description: response.message,
        })

        setLoginStatus("idle")
      } else {
        toast({
          title: "验证码发送失败",
          description: response.message,
          variant: "destructive",
        })
        setLoginStatus("error")
      }
    } catch (error) {
      console.error("发送验证码失败:", error)
      toast({
        title: "网络错误",
        description: "请检查网络连接后重试",
        variant: "destructive",
      })
      setLoginStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  // 用户登录
  const handleLogin = async () => {
    if (!phoneNumber || !verificationCode) {
      toast({
        title: "信息不完整",
        description: "请输入手机号和验证码",
        variant: "destructive",
      })
      return
    }

    setLoginStatus("logging")
    setIsLoading(true)

    try {
      const loginRequest: LoginRequest = {
        phoneNumber,
        verificationCode,
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
        },
      }

      const response = await loginUser(loginRequest)

      if (response.success && response.user && response.token) {
        // 使用认证上下文的登录方法
        const authSuccess = await login(phoneNumber, verificationCode)

        if (authSuccess) {
          setLoginStatus("success")

          toast({
            title: "登录成功！",
            description: response.isLocalUser ? "欢迎洛阳本地用户，您将享受专属权益" : "欢迎使用言语平台",
          })

          // 延迟跳转，让用户看到成功状态
          setTimeout(() => {
            router.push("/profile")
          }, 1500)
        } else {
          throw new Error("认证上下文登录失败")
        }
      } else {
        toast({
          title: "登录失败",
          description: response.error || "请检查验证码是否正确",
          variant: "destructive",
        })
        setLoginStatus("error")
      }
    } catch (error) {
      console.error("登录失败:", error)
      toast({
        title: "登录失败",
        description: "请稍后重试",
        variant: "destructive",
      })
      setLoginStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  // 重置表单
  const resetForm = () => {
    setPhoneNumber("")
    setVerificationCode("")
    setIsCodeSent(false)
    setCountdown(0)
    setIsLocalNumber(null)
    setLoginStatus("idle")
  }

  return (
    <section ref={ref} className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 左侧：登录表单 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-black/40 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">用户登录</h2>

            <Tabs defaultValue="phone" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="phone" className="data-[state=active]:bg-blue-600">
                  <Phone className="h-4 w-4 mr-2" />
                  手机号登录
                </TabsTrigger>
                <TabsTrigger value="qrcode" className="data-[state=active]:bg-blue-600">
                  <QrCode className="h-4 w-4 mr-2" />
                  扫码登录
                </TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-4">
                {/* 登录状态指示器 */}
                {loginStatus !== "idle" && (
                  <div
                    className={`p-3 rounded-md flex items-center ${
                      loginStatus === "success"
                        ? "bg-green-900/20 border border-green-500/30 text-green-300"
                        : loginStatus === "error"
                          ? "bg-red-900/20 border border-red-500/30 text-red-300"
                          : "bg-blue-900/20 border border-blue-500/30 text-blue-300"
                    }`}
                  >
                    {loginStatus === "success" ? (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    ) : loginStatus === "error" ? (
                      <AlertCircle className="h-5 w-5 mr-2" />
                    ) : (
                      <div className="h-5 w-5 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    )}
                    <span>
                      {loginStatus === "sending" && "正在发送验证码..."}
                      {loginStatus === "logging" && "正在登录..."}
                      {loginStatus === "success" && "登录成功，即将跳转..."}
                      {loginStatus === "error" && "操作失败，请重试"}
                    </span>
                  </div>
                )}

                <div>
                  <label className="text-white/70 text-sm block mb-2">手机号</label>
                  <div className="flex">
                    <div className="flex items-center bg-black/60 border border-blue-500/30 rounded-l-md px-3">
                      <span className="text-white">+86</span>
                    </div>
                    <Input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value)
                        // 重置状态
                        if (isCodeSent) {
                          setIsCodeSent(false)
                          setVerificationCode("")
                          setIsLocalNumber(null)
                        }
                      }}
                      placeholder="请输入手机号"
                      maxLength={11}
                      disabled={isLoading}
                      className="flex-grow bg-black/60 border-blue-500/30 focus-visible:ring-blue-500/50 text-white rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm block mb-2">验证码</label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="请输入验证码"
                      maxLength={6}
                      disabled={isLoading}
                      className="flex-grow bg-black/60 border-blue-500/30 focus-visible:ring-blue-500/50 text-white"
                    />
                    <Button
                      onClick={sendCode}
                      disabled={!phoneNumber || phoneNumber.length !== 11 || countdown > 0 || isLoading}
                      className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 whitespace-nowrap"
                    >
                      {countdown > 0 ? `${countdown}秒后重发` : "发送验证码"}
                    </Button>
                  </div>
                </div>

                {/* 本地用户提示 */}
                {isLocalNumber !== null && (
                  <div
                    className={`p-3 rounded-md ${
                      isLocalNumber
                        ? "bg-green-900/20 border border-green-500/30 text-green-300"
                        : "bg-amber-900/20 border border-amber-500/30 text-amber-300"
                    }`}
                  >
                    <div className="flex items-center">
                      {isLocalNumber ? (
                        <>
                          <BadgeCheck className="h-5 w-5 mr-2" />
                          <span>检测到洛阳本地手机号，您将获得本地用户专属权益</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>非洛阳本地手机号，建议使用本地手机号获取更多权益</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleLogin}
                  disabled={!isCodeSent || !verificationCode || isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {isLoading ? "登录中..." : "登录"}
                </Button>

                {/* 重置按钮 */}
                {(isCodeSent || loginStatus === "error") && (
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/10 bg-transparent"
                  >
                    重新开始
                  </Button>
                )}

                <div className="text-center text-white/50 text-sm">登录即表示您同意《用户协议》和《隐私政策》</div>
              </TabsContent>

              <TabsContent value="qrcode" className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg mb-4">
                  <div className="w-48 h-48 relative">
                    <Image
                      src="/placeholder.svg?height=200&width=200&text=登录二维码"
                      alt="登录二维码"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="text-white/70 text-center mb-6">请使用『言语』APP扫描二维码登录</div>

                <div className="flex items-center space-x-4">
                  {relatedApps.map((app) => (
                    <div key={app.id} className="flex flex-col items-center">
                      <div className="w-10 h-10 relative mb-2">
                        <Image
                          src={app.icon || "/placeholder.svg"}
                          alt={app.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <span className="text-white/80 text-xs">{app.name}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* 关联应用一键登录 */}
            <div className="mt-8 pt-6 border-t border-blue-500/20">
              <h3 className="text-lg font-medium text-white mb-4">关联应用一键登录</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedApps.map((app) => (
                  <motion.div
                    key={app.id}
                    className="bg-black/60 border border-blue-500/10 rounded-lg p-4 cursor-pointer"
                    whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.3)" }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 relative">
                        <Image
                          src={app.icon || "/placeholder.svg"}
                          alt={app.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <div className="text-white font-medium">{app.name}</div>
                        <div className="text-white/60 text-xs">一键登录</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 右侧：用户权益 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-black/40 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">用户权益</h2>

            <div className="space-y-6">
              {userBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-black/60 border border-blue-500/10 rounded-lg p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center mb-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${benefit.color} mr-3`}
                    >
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-medium text-white">{benefit.title}</h3>
                  </div>

                  <ul className="space-y-2">
                    {benefit.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        <span className="text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* 认证系统说明 */}
            <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 text-blue-400 mr-2" />
                <h3 className="text-lg font-medium text-white">认证系统说明</h3>
              </div>

              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>基于手机号区域识别的本地用户认证，洛阳本地用户将获得专属权益</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>一次认证，多平台互通，无需重复注册登录关联应用</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>用户数据安全加密存储，严格保护隐私信息</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>创作者认证需提交相关资质，审核通过后获得创作者徽章</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
