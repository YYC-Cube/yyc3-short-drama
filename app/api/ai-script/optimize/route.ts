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
    const { content, optimizationType } = body

    if (!content) {
      return NextResponse.json({ success: false, message: "请提供要优化的剧本内容" }, { status: 400 })
    }

    // 根据优化类型构建不同的提示词
    let prompt = ""
    let optimizationName = ""

    switch (optimizationType) {
      case "dialogue":
        optimizationName = "对话优化"
        prompt = `请优化以下剧本的对话部分，使其更加自然、生动、符合人物性格：\n\n${content}\n\n要求：\n- 对话要符合人物身份和性格\n- 语言要自然流畅\n- 增强戏剧张力\n- 保持原有故事结构`
        break
      case "structure":
        optimizationName = "结构优化"
        prompt = `请优化以下剧本的结构，使其更加紧凑、有节奏感：\n\n${content}\n\n要求：\n- 优化场景转换\n- 增强戏剧冲突\n- 改善节奏把控\n- 保持故事完整性`
        break
      case "emotion":
        optimizationName = "情感优化"
        prompt = `请优化以下剧本的情感表达，使其更加感人、有感染力：\n\n${content}\n\n要求：\n- 深化人物情感\n- 增强情感共鸣\n- 优化情感递进\n- 保持情感真实性`
        break
      case "cultural":
        optimizationName = "文化优化"
        prompt = `请优化以下剧本的文化内涵，融入更多中华文化元素：\n\n${content}\n\n要求：\n- 融入传统文化元素\n- 体现文化价值观\n- 增强文化认同感\n- 保持现代表达方式`
        break
      default:
        optimizationName = "综合优化"
        prompt = `请全面优化以下剧本，提升其整体质量：\n\n${content}\n\n要求：\n- 优化对话和叙述\n- 改善结构和节奏\n- 增强情感表达\n- 融入文化元素`
    }

    // 调用AI优化剧本
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 2500,
      temperature: 0.7,
    })

    return NextResponse.json({
      success: true,
      message: `${optimizationName}完成`,
      data: {
        originalContent: content,
        optimizedContent: text,
        optimizationType,
        optimizationName,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("优化剧本错误:", error)

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ success: false, message: "认证失败" }, { status: 401 })
    }

    return NextResponse.json({ success: false, message: "优化剧本失败，请稍后重试" }, { status: 500 })
  }
}
