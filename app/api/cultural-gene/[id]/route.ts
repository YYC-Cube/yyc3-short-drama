import { type NextRequest, NextResponse } from "next/server"

// 模拟文化基因详细数据
const culturalGenesDetail = {
  "1": {
    id: "1",
    name: "洛神赋",
    category: "文学",
    dynasty: "魏晋",
    author: "曹植",
    description: "曹植创作的辞赋名篇，描述洛水女神的美丽与哀愁，是中国古代文学史上的经典之作",
    content: `翩若惊鸿，婉若游龙。荣曜秋菊，华茂春松。
髣髴兮若轻云之蔽月，飘飖兮若流风之回雪。
远而望之，皎若太阳升朝霞；迫而察之，灼若芙蕖出渌波。`,
    fullText: "完整的洛神赋原文...",
    tags: ["曹植", "辞赋", "爱情", "神话", "洛水"],
    imageUrl: "/images/luoshen-1.png",
    gallery: ["/images/luoshen-1.png", "/images/luoshen-2.png", "/images/luoshen-3.png"],
    popularity: 95,
    views: 12580,
    likes: 1024,
    shares: 256,
    culturalValue: {
      literaryValue: "极高的文学艺术价值，被誉为辞赋典范",
      historicalValue: "反映魏晋时期的文化风貌和审美情趣",
      artisticValue: "语言优美，意境深远，影响后世文学创作",
      educationalValue: "是学习古代文学的重要教材",
    },
    relatedWorks: [
      { id: "2", name: "洛神图", type: "绘画" },
      { id: "3", name: "洛神水赋", type: "音乐" },
    ],
    modernAdaptations: ["电视剧《洛神》", "舞剧《洛神水赋》", "动画《洛神赋》"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const gene = culturalGenesDetail[id as keyof typeof culturalGenesDetail]

    if (!gene) {
      return NextResponse.json({ success: false, message: "文化基因不存在" }, { status: 404 })
    }

    // 模拟增加浏览量
    gene.views += 1

    return NextResponse.json({
      success: true,
      data: { gene },
    })
  } catch (error) {
    console.error("获取文化基因详情错误:", error)
    return NextResponse.json({ success: false, message: "获取详情失败，请稍后重试" }, { status: 500 })
  }
}
