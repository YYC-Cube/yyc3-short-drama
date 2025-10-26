"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Phone,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Shield,
  MapPin,
  BadgeCheck,
  Sparkles,
  Crown,
  Star,
} from "lucide-react"
import {
  sendVerificationCode,
  loginUser,
  registerUser,
  type LoginRequest,
  type RegisterRequest,
} from "@/services/auth-service"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

// 背景图片轮播数据
const backgroundImages = [
  {
    id: 1,
    src: "/images/luoshen-11.png",
    title: "洛神赋·数字传承",
    description: "科技与传统的完美融合",
  },
  {
    id: 2,
    src: "/images/luoshen-9.png",
    title: "洛神赋·拍摄花絮",
    description: "现代技术重现古典美学",
  },
  {
    id: 3,
    src: "/images/luoshen-8.png",
    title: "应天门·夜景辉煌",
    description: "千年古都的现代光影",
  },
  {
    id: 4,
    src: "/images/luoshen-5.png",
    title: "洛邑古城·水韵流光",
    description: "古城新貌的诗意呈现",
  },
  {
    id: 5,
    src: "/images/yingtianmen-2.png",
    title: "洛邑古城·古韵新风",
    description: "传统建筑的现代诠释",
  },
]

// 用户权益展示
const userBenefits = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "本地用户特权",
    description: "洛阳本地用户专享权益",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: <BadgeCheck className="h-5 w-5" />,
    title: "创作者认证",
    description: "专业创作者身份认证",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: <Crown className="h-5 w-5" />,
    title: "VIP会员",
    description: "尊享会员专属服务",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "积分奖励",
    description: "多重积分奖励机制",
    color: "from-green-400 to-emerald-500",
  },
]

export default function SinglePageAuth() {
  const [activeTab, setActiveTab] = useState("login")
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // 登录表单状态
  const [loginForm, setLoginForm] = useState({
    phoneNumber: "",
    verificationCode: "",
    password: "",
  })

  // 注册表单状态
  const [registerForm, setRegisterForm] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    agreeTerms: false,
  })

  // 验证码状态
  const [codeStates, setCodeStates] = useState({
    login: { sent: false, countdown: 0 },
    register: { sent: false, countdown: 0 },
  })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // 背景图片轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // 验证码倒计时
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = []

    Object.entries(codeStates).forEach(([key, state]) => {
      if (state.countdown > 0) {
        const interval = setInterval(() => {
          setCodeStates((prev) => ({
            ...prev,
            [key]: { ...prev[key as keyof typeof prev], countdown: prev[key as keyof typeof prev].countdown - 1 },
          }))
        }, 1000)
        intervals.push(interval)
      }
    })

    return () => intervals.forEach(clearInterval)
  }, [codeStates])

  // 发送验证码
  const sendCode = async (type: "login" | "register") => {
    const phoneNumber = type === "login" ? loginForm.phoneNumber : registerForm.phoneNumber

    if (!phoneNumber || phoneNumber.length !== 11) {
      toast({
        title: "手机号格式错误",
        description: "请输入正确的11位手机号",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await sendVerificationCode({
        phoneNumber,
        purpose: type,
      })

      if (response.success) {
        setCodeStates((prev) => ({
          ...prev,
          [type]: { sent: true, countdown: 60 },
        }))

        toast({
          title: "验证码发送成功",
          description: response.message,
        })
      } else {
        toast({
          title: "验证码发送失败",
          description: response.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("发送验证码失败:", error)
      toast({
        title: "网络错误",
        description: "请检查网络连接后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 用户登录
  const handleLogin = async () => {
    if (!loginForm.phoneNumber || !loginForm.verificationCode) {
      toast({
        title: "信息不完整",
        description: "请输入手机号和验证码",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const loginRequest: LoginRequest = {
        phoneNumber: loginForm.phoneNumber,
        verificationCode: loginForm.verificationCode,
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
        },
      }

      const response = await loginUser(loginRequest)

      if (response.success && response.user && response.token) {
        const authSuccess = await login(loginForm.phoneNumber, loginForm.verificationCode)

        if (authSuccess) {
          toast({
            title: "登录成功！",
            description: response.isLocalUser ? "欢迎洛阳本地用户，您将享受专属权益" : "欢迎使用言语平台",
          })

          setTimeout(() => {
            router.push("/profile")
          }, 1500)
        }
      } else {
        toast({
          title: "登录失败",
          description: response.error || "请检查验证码是否正确",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("登录失败:", error)
      toast({
        title: "登录失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 用户注册
  const handleRegister = async () => {
    if (
      !registerForm.username ||
      !registerForm.phoneNumber ||
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.verificationCode
    ) {
      toast({
        title: "信息不完整",
        description: "请填写所有必填信息",
        variant: "destructive",
      })
      return
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "密码不匹配",
        description: "两次输入的密码不一致",
        variant: "destructive",
      })
      return
    }

    if (!registerForm.agreeTerms) {
      toast({
        title: "请同意服务条款",
        description: "请阅读并同意用户协议和隐私政策",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const registerRequest: RegisterRequest = {
        username: registerForm.username,
        phoneNumber: registerForm.phoneNumber,
        email: registerForm.email,
        password: registerForm.password,
        verificationCode: registerForm.verificationCode,
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
        },
      }

      const response = await registerUser(registerRequest)

      if (response.success) {
        toast({
          title: "注册成功！",
          description: "欢迎加入言语平台，请登录您的账户",
        })

        // 切换到登录页面
        setActiveTab("login")
        setLoginForm({
          phoneNumber: registerForm.phoneNumber,
          verificationCode: "",
          password: "",
        })
      } else {
        toast({
          title: "注册失败",
          description: response.error || "注册过程中出现错误",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("注册失败:", error)
      toast({
        title: "注册失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const currentBg = backgroundImages[currentBgIndex]

  return (
    <div ref={ref} className="min-h-screen relative overflow-hidden bg-black">
      {/* 背景图片轮播 */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={currentBg.src || "/placeholder.svg"}
              alt={currentBg.title}
              fill
              className="object-cover"
              priority={currentBgIndex === 0}
              quality={90}
            />

            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
          </motion.div>
        </AnimatePresence>

        {/* 背景信息 */}
        <div className="absolute bottom-8 left-8 z-10">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-white/80"
          >
            <h3 className="text-xl font-medium mb-2">{currentBg.title}</h3>
            <p className="text-sm text-white/60">{currentBg.description}</p>
          </motion.div>
        </div>

        {/* 背景指示器 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBgIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentBgIndex ? "bg-amber-400 w-6" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-20 min-h-screen flex">
        {/* 左侧：品牌信息和权益展示 */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="max-w-lg"
          >
            {/* 品牌标识 */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">言语逸品</h1>
                  <p className="text-amber-300 text-sm">河洛文化数字传承平台</p>
                </div>
              </div>

              <p className="text-white/80 text-lg leading-relaxed mb-8">
                融合AI技术与传统文化，打造全新的数字文化传承体验。 在这里，千年河洛文化与现代科技完美融合，
                为您开启文化创作的新纪元。
              </p>
            </div>

            {/* 用户权益展示 */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-6">平台特色权益</h3>
              {userBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center p-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-black/40 transition-all duration-300"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center mr-4`}
                  >
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{benefit.title}</h4>
                    <p className="text-white/60 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 右侧：登录注册表单 */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <Card className="bg-black/60 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-white">
                  {activeTab === "login" ? "用户登录" : "用户注册"}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {activeTab === "login"
                    ? "欢迎回到言语逸品，开启您的文化创作之旅"
                    : "加入言语逸品，探索河洛文化的无限可能"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/40">
                    <TabsTrigger
                      value="login"
                      className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      登录
                    </TabsTrigger>
                    <TabsTrigger
                      value="register"
                      className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      注册
                    </TabsTrigger>
                  </TabsList>

                  {/* 登录表单 */}
                  <TabsContent value="login" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-phone" className="text-white/80">
                        手机号
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                          id="login-phone"
                          type="tel"
                          placeholder="请输入手机号"
                          value={loginForm.phoneNumber}
                          onChange={(e) => setLoginForm((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                          className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-amber-500/50"
                          maxLength={11}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-code" className="text-white/80">
                        验证码
                      </Label>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                          <Input
                            id="login-code"
                            type="text"
                            placeholder="请输入验证码"
                            value={loginForm.verificationCode}
                            onChange={(e) => setLoginForm((prev) => ({ ...prev, verificationCode: e.target.value }))}
                            className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-amber-500/50"
                            maxLength={6}
                          />
                        </div>
                        <Button
                          onClick={() => sendCode("login")}
                          disabled={
                            !loginForm.phoneNumber ||
                            loginForm.phoneNumber.length !== 11 ||
                            codeStates.login.countdown > 0 ||
                            isLoading
                          }
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0"
                        >
                          {codeStates.login.countdown > 0 ? `${codeStates.login.countdown}s` : "发送验证码"}
                        </Button>
                      </div>
                    </div>

                    <Button
                      onClick={handleLogin}
                      disabled={!loginForm.phoneNumber || !loginForm.verificationCode || isLoading}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-12 text-lg font-medium"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          登录中...
                        </div>
                      ) : (
                        <>
                          <LogIn className="h-5 w-5 mr-2" />
                          立即登录
                        </>
                      )}
                    </Button>
                  </TabsContent>

                  {/* 注册表单 */}
                  <TabsContent value="register" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username" className="text-white/80">
                        用户名
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                          id="register-username"
                          type="text"
                          placeholder="请输入用户名"
                          value={registerForm.username}
                          onChange={(e) => setRegisterForm((prev) => ({ ...prev, username: e.target.value }))}
                          className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-amber-500/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-phone" className="text-white/80">
                        手机号
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                          id="register-phone"
                          type="tel"
                          placeholder="请输入手机号"
                          value={registerForm.phoneNumber}
                          onChange={(e) => setRegisterForm((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                          className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-amber-500/50"
                          maxLength={11}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-white/80">
                        邮箱
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="请输入邮箱地址"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
                          className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-amber-500/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-white/80">
                        密码
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="请输入密码"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
                          className="pl-10 pr-10 bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-amber-500/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password" className="text-white/80">
                        确认密码
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                        <Input
                          id="register-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="请再次输入密码"
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          className="pl-10 pr-10 bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-amber-500/50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-code" className="text-white/80">
                        验证码
                      </Label>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                          <Input
                            id="register-code"
                            type="text"
                            placeholder="请输入验证码"
                            value={registerForm.verificationCode}
                            onChange={(e) => setRegisterForm((prev) => ({ ...prev, verificationCode: e.target.value }))}
                            className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-white/50 focus:border-amber-500/50"
                            maxLength={6}
                          />
                        </div>
                        <Button
                          onClick={() => sendCode("register")}
                          disabled={
                            !registerForm.phoneNumber ||
                            registerForm.phoneNumber.length !== 11 ||
                            codeStates.register.countdown > 0 ||
                            isLoading
                          }
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0"
                        >
                          {codeStates.register.countdown > 0 ? `${codeStates.register.countdown}s` : "发送验证码"}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agree-terms"
                        checked={registerForm.agreeTerms}
                        onCheckedChange={(checked) =>
                          setRegisterForm((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                        }
                        className="border-white/30 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                      <Label htmlFor="agree-terms" className="text-sm text-white/70 cursor-pointer">
                        我已阅读并同意
                        <span className="text-amber-400 hover:text-amber-300 mx-1 cursor-pointer">《用户协议》</span>和
                        <span className="text-amber-400 hover:text-amber-300 ml-1 cursor-pointer">《隐私政策》</span>
                      </Label>
                    </div>

                    <Button
                      onClick={handleRegister}
                      disabled={
                        !registerForm.username ||
                        !registerForm.phoneNumber ||
                        !registerForm.email ||
                        !registerForm.password ||
                        !registerForm.verificationCode ||
                        !registerForm.agreeTerms ||
                        isLoading
                      }
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-12 text-lg font-medium"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          注册中...
                        </div>
                      ) : (
                        <>
                          <UserPlus className="h-5 w-5 mr-2" />
                          立即注册
                        </>
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>

                {/* 底部提示 */}
                <div className="mt-6 text-center">
                  <p className="text-white/50 text-sm">
                    {activeTab === "login" ? "还没有账户？" : "已有账户？"}
                    <button
                      onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
                      className="text-amber-400 hover:text-amber-300 ml-1 font-medium"
                    >
                      {activeTab === "login" ? "立即注册" : "立即登录"}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
