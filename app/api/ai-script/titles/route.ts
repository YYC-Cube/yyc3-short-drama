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
    const { content, theme, style } = body

    if (!content && !theme) {
      return NextResponse.json({ success: false, message: "请提供剧本内容或主题" }, { status: 400 })
    }

    // 构建提示词
    const prompt = content
      ? `请为以下剧本内容生成5个吸引人的标题：\n\n${content.substring(0, 500)}...`
      : `请为主题"${theme}"、风格"${style || "现代"}"的剧本生成5个吸引人的标题`

    const fullPrompt = `${prompt}

要求：
- 标题要简洁有力，富有吸引力
- 体现剧本的核心主题和情感
- 适合短视频平台传播
- 每个标题不超过20个字
- 按吸引力排序

请按以下格式输出：
1. [标题1]
2. [标题2]
3. [标题3]
4. [标题4]
5. [标题5]`

    // 调用AI生成标题
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: fullPrompt,
      maxTokens: 500,
      temperature: 0.9,
    })

    // 解析生成的标题
    const titles = text
      .split("\n")
      .filter((line) => /^\d+\./.test(line.trim()))
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter((title) => title.length > 0)

    return NextResponse.json({
      success: true,
      message: "标题生成成功",
      data: { titles },
    })
  } catch (error) {
    console.error("生成标题错误:", error)

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ success: false, message: "认证失败" }, { status: 401 })
    }

    return NextResponse.json({ success: false, message: "生成标题失败，请稍后重试" }, { status: 500 })
  }
}
