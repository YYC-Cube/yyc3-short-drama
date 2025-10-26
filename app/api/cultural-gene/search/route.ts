import { type NextRequest, NextResponse } from "next/server"

// 模拟文化基因数据
const culturalGenes = [
  {
    id: "1",
    name: "洛神赋",
    category: "文学",
    dynasty: "魏晋",
    description: "曹植创作的辞赋名篇，描述洛水女神的美丽与哀愁",
    content: "翩若惊鸿，婉若游龙，荣曜秋菊，华茂春松...",
    tags: ["曹植", "辞赋", "爱情", "神话"],
    imageUrl: "/images/luoshen-1.png",
    popularity: 95,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "武则天",
    category: "历史人物",
    dynasty: "唐朝",
    description: "中国历史上唯一的女皇帝，政治家、诗人",
    content: "无字碑前石狮子，不言功过任评说...",
    tags: ["女皇", "政治", "诗词", "传奇"],
    imageUrl: "/images/wuzetian-1.png",
    popularity: 88,
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "应天门",
    category: "建筑",
    dynasty: "隋唐",
    description: "洛阳宫城正门，象征皇权威严的重要建筑",
    content: "巍峨应天门，千年帝王梦...",
    tags: ["宫殿", "建筑", "皇权", "洛阳"],
    imageUrl: "/images/yingtianmen.png",
    popularity: 76,
    createdAt: "2024-01-03T00:00:00Z",
  },
]

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const keyword = searchParams.get("keyword") || ""
    const category = searchParams.get("category") || ""
    const dynasty = searchParams.get("dynasty") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // 过滤数据
    let filteredGenes = culturalGenes

    if (keyword) {
      filteredGenes = filteredGenes.filter(
        (gene) =>
          gene.name.includes(keyword) ||
          gene.description.includes(keyword) ||
          gene.tags.some((tag) => tag.includes(keyword)),
      )
    }

    if (category) {
      filteredGenes = filteredGenes.filter((gene) => gene.category === category)
    }

    if (dynasty) {
      filteredGenes = filteredGenes.filter((gene) => gene.dynasty === dynasty)
    }

    // 分页
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedGenes = filteredGenes.slice(startIndex, endIndex)

    // 统计信息
    const categories = [...new Set(culturalGenes.map((gene) => gene.category))]
    const dynasties = [...new Set(culturalGenes.map((gene) => gene.dynasty))]

    return NextResponse.json({
      success: true,
      data: {
        genes: paginatedGenes,
        pagination: {
          page,
          limit,
          total: filteredGenes.length,
          totalPages: Math.ceil(filteredGenes.length / limit),
        },
        filters: {
          categories,
          dynasties,
        },
      },
    })
  } catch (error) {
    console.error("搜索文化基因错误:", error)
    return NextResponse.json({ success: false, message: "搜索失败，请稍后重试" }, { status: 500 })
  }
}
