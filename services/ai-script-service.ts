import { generateText, streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// 类型定义
export interface ScriptGenerationRequest {
  theme: string
  style: "classical" | "modern" | "fantasy"
  length: "short" | "medium" | "long"
  culturalElements: string[]
  targetAudience: string
}

export interface BaguaElement {
  name: string
  meaning: string
  description: string
  position: string
  color: string
  content?: string
}

export interface ScriptGenerationResponse {
  success: boolean
  script: BaguaElement[]
  metadata: {
    wordCount: number
    estimatedDuration: number
    generatedAt: string
    theme: string
    style: string
  }
  error?: string
}

// 八卦元素基础结构
const baguaElements: BaguaElement[] = [
  {
    name: "乾（天）",
    meaning: "冲突引入",
    description: "剧情的开端，引入主要冲突和人物",
    position: "top-left",
    color: "from-amber-400 to-amber-600",
  },
  {
    name: "坤（地）",
    meaning: "情境铺垫",
    description: "展开背景设定，建立世界观",
    position: "top-center",
    color: "from-green-400 to-green-600",
  },
  {
    name: "震（雷）",
    meaning: "剧情转折",
    description: "突发事件，改变主角的生活轨迹",
    position: "top-right",
    color: "from-purple-400 to-purple-600",
  },
  {
    name: "巽（风）",
    meaning: "关系变化",
    description: "人物关系发生微妙变化",
    position: "middle-left",
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "中宫",
    meaning: "核心主题",
    description: "贯穿全剧的中心思想",
    position: "middle-center",
    color: "from-red-400 to-red-600",
  },
  {
    name: "坎（水）",
    meaning: "困境挑战",
    description: "主角面临重大考验",
    position: "middle-right",
    color: "from-cyan-400 to-cyan-600",
  },
  {
    name: "艮（山）",
    meaning: "阻碍克服",
    description: "战胜最大的障碍",
    position: "bottom-left",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    name: "离（火）",
    meaning: "顿悟启示",
    description: "获得关键信息或能力",
    position: "bottom-center",
    color: "from-orange-400 to-orange-600",
  },
  {
    name: "兑（泽）",
    meaning: "圆满结局",
    description: "故事达到高潮并解决",
    position: "bottom-right",
    color: "from-pink-400 to-pink-600",
  },
]

// 生成八卦剧本
export async function generateBaguaScript(request: ScriptGenerationRequest): Promise<ScriptGenerationResponse> {
  try {
    const { theme, style, length, culturalElements, targetAudience } = request

    // 构建提示词
    const systemPrompt = `你是一位专业的中华文化编剧，精通河图洛书和八卦理论。你需要根据用户提供的主题，创作一个基于九宫格结构的短剧剧本。

剧本要求：
1. 严格按照八卦九宫格结构，每个位置对应特定的剧情功能
2. 融入中华传统文化元素，特别是洛阳历史文化
3. 语言风格要符合${style === "classical" ? "古典文学" : style === "modern" ? "现代叙事" : "奇幻"}风格
4. 每段内容长度控制在${length === "short" ? "100-150" : length === "medium" ? "150-200" : "200-300"}字
5. 面向${targetAudience}群体

八卦九宫格对应关系：
- 乾（天）：冲突引入 - 剧情开端，引入主要冲突和人物
- 坤（地）：情境铺垫 - 展开背景设定，建立世界观
- 震（雷）：剧情转折 - 突发事件，改变主角轨迹
- 巽（风）：关系变化 - 人物关系发生微妙变化
- 中宫：核心主题 - 贯穿全剧的中心思想
- 坎（水）：困境挑战 - 主角面临重大考验
- 艮（山）：阻碍克服 - 战胜最大的障碍
- 离（火）：顿悟启示 - 获得关键信息或能力
- 兑（泽）：圆满结局 - 故事达到高潮并解决

请为每个位置创作具体的剧情内容，确保逻辑连贯，情节紧凑。`

    const userPrompt = `主题：${theme}
文化元素：${culturalElements.join("、")}
目标观众：${targetAudience}

请按照八卦九宫格结构，为每个位置创作具体的剧情内容。返回格式为JSON，包含9个元素，每个元素包含position（位置）和content（内容）字段。`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.8,
      maxTokens: 2000,
    })

    // 解析AI返回的内容
    let scriptContent: Array<{ position: string; content: string }>
    try {
      scriptContent = JSON.parse(text)
    } catch {
      // 如果JSON解析失败，使用文本分割方式
      const sections = text.split(/\d+\.|[一二三四五六七八九]\./).filter((s) => s.trim())
      scriptContent = baguaElements.map((element, index) => ({
        position: element.position,
        content: sections[index]?.trim() || `${element.meaning}相关内容待完善...`,
      }))
    }

    // 构建完整的剧本结构
    const script = baguaElements.map((element, index) => {
      const content =
        scriptContent.find((c) => c.position === element.position)?.content ||
        scriptContent[index]?.content ||
        `${element.meaning}相关内容待完善...`

      return {
        ...element,
        content: content.substring(0, length === "short" ? 150 : length === "medium" ? 200 : 300),
      }
    })

    // 计算元数据
    const wordCount = script.reduce((total, element) => total + (element.content?.length || 0), 0)
    const estimatedDuration = Math.ceil(wordCount / 200) // 假设每分钟200字

    return {
      success: true,
      script,
      metadata: {
        wordCount,
        estimatedDuration,
        generatedAt: new Date().toISOString(),
        theme,
        style,
      },
    }
  } catch (error) {
    console.error("剧本生成失败:", error)
    return {
      success: false,
      script: [],
      metadata: {
        wordCount: 0,
        estimatedDuration: 0,
        generatedAt: new Date().toISOString(),
        theme: request.theme,
        style: request.style,
      },
      error: error instanceof Error ? error.message : "未知错误",
    }
  }
}

// 生成剧本标题建议
export async function generateScriptTitles(theme: string): Promise<string[]> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: "你是一位专业的文案策划师，擅长创作吸引人的标题。请为给定的剧本主题生成5个富有创意和吸引力的标题。",
      prompt: `剧本主题：${theme}

请生成5个标题，要求：
1. 体现中华文化特色
2. 朗朗上口，易于记忆
3. 具有视觉冲击力
4. 适合短视频传播

返回格式为JSON数组，只包含标题字符串。`,
      temperature: 0.9,
      maxTokens: 200,
    })

    try {
      return JSON.parse(text)
    } catch {
      // 如果JSON解析失败，使用文本分割
      return text
        .split("\n")
        .filter((line) => line.trim())
        .slice(0, 5)
    }
  } catch (error) {
    console.error("标题生成失败:", error)
    return [`${theme}传奇`, `${theme}新篇`, `${theme}风云录`, `${theme}奇遇记`, `${theme}传说`]
  }
}

// 优化剧本内容
export async function optimizeScriptContent(
  content: string,
  type: "enhance" | "simplify" | "culturalize",
): Promise<string> {
  try {
    const optimizationPrompts = {
      enhance: "请增强这段剧本内容的戏剧张力和情感表达，使其更加引人入胜，但保持原有的核心情节。",
      simplify: "请简化这段剧本内容的语言表达，使其更通俗易懂，适合大众观看，但保持故事的完整性。",
      culturalize: "请为这段剧本内容增加更多中华传统文化元素，特别是洛阳历史文化，使其更具文化底蕴。",
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `你是一位专业的剧本编辑，擅长优化剧本内容。${optimizationPrompts[type]}`,
      prompt: `原始内容：${content}

请优化这段内容，保持字数相近，确保逻辑连贯。`,
      temperature: 0.7,
      maxTokens: 500,
    })

    return text.trim()
  } catch (error) {
    console.error("内容优化失败:", error)
    return content // 返回原内容
  }
}

// 流式生成剧本（用于实时预览）
export async function streamScriptGeneration(
  request: ScriptGenerationRequest,
  onChunk: (chunk: string) => void,
): Promise<void> {
  try {
    const systemPrompt = `你是一位专业的中华文化编剧，正在为用户创作基于八卦九宫格结构的剧本。请逐步生成每个部分的内容。`

    const userPrompt = `主题：${request.theme}，请开始创作...`

    const result = streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.8,
    })

    for await (const chunk of result.textStream) {
      onChunk(chunk)
    }
  } catch (error) {
    console.error("流式生成失败:", error)
    throw error
  }
}

// 剧本质量评估
export async function evaluateScriptQuality(script: BaguaElement[]): Promise<{
  score: number
  feedback: string[]
  suggestions: string[]
}> {
  try {
    const scriptText = script.map((element) => `${element.name}: ${element.content}`).join("\n\n")

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: "你是一位专业的剧本评审专家，请从剧情连贯性、文化内涵、观赏性等方面评估剧本质量。",
      prompt: `请评估以下剧本：

${scriptText}

请从以下维度评分（1-10分）：
1. 剧情连贯性
2. 文化内涵深度
3. 观赏性和吸引力
4. 语言表达质量

返回JSON格式：
{
  "score": 总分,
  "feedback": ["评价1", "评价2"],
  "suggestions": ["建议1", "建议2"]
}`,
      temperature: 0.3,
      maxTokens: 500,
    })

    try {
      return JSON.parse(text)
    } catch {
      return {
        score: 7.5,
        feedback: ["剧本结构完整", "文化元素丰富"],
        suggestions: ["可以增强人物性格描写", "建议加强情节冲突"],
      }
    }
  } catch (error) {
    console.error("剧本评估失败:", error)
    return {
      score: 7.0,
      feedback: ["评估暂时不可用"],
      suggestions: ["请稍后重试评估功能"],
    }
  }
}
