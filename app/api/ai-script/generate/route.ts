import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    // 验证用户认证
    const token =
      request.cookies.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ success: false, message: "请先登录" }, { status: 401 })
    }

    jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")

    const body = await request.json()
    const { theme, style, length, characters, setting } = body

    if (!theme) {
      return NextResponse.json({ success: false, message: "请提供剧本主题" }, { status: 400 })
    }

    // 构建提示词
    const prompt = `请创作一个${style || "现代"}风格的${length || "短"}剧本，主题是"${theme}"。

要求：
- 人物设定：${characters || "2-3个主要角色"}
- 场景设定：${setting || "现代都市"}
- 包含完整的对话和场景描述
- 体现中华文化元素
- 情节紧凑，富有戏剧冲突

请按以下格式输出：
标题：[剧本标题]
人物：[角色介绍]
场景：[场景描述]
剧本正文：[完整剧本内容]`

    // 调用AI生成剧本
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 2000,
      temperature: 0.8,
    })

    // 解析生成的内容
    const lines = text.split("\n")
    let title = "未命名剧本"
    let charactersInfo = ""
    let sceneInfo = ""
    const content = text

    // 简单解析标题和内容
    for (const line of lines) {
      if (line.startsWith("标题：")) {
        title = line.replace("标题：", "").trim()
      } else if (line.startsWith("人物：")) {
        charactersInfo = line.replace("人物：", "").trim()
      } else if (line.startsWith("场景：")) {
        sceneInfo = line.replace("场景：", "").trim()
      }
    }

    // 模拟保存到数据库
    const script = {
      id: Date.now().toString(),
      title,
      content,
      theme,
      style: style || "现代",
      length: length || "短剧",
      characters: charactersInfo,
      setting: sceneInfo,
      createdAt: new Date().toISOString(),
      wordCount: content.length,
      status: "draft",
    }

    return NextResponse.json({
      success: true,
      message: "剧本生成成功",
      data: { script },
    })
  } catch (error) {
    console.error("生成剧本错误:", error)

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ success: false, message: "认证失败" }, { status: 401 })
    }

    return NextResponse.json({ success: false, message: "生成剧本失败，请稍后重试" }, { status: 500 })
  }
}
