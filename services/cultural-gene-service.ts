// 类型定义
export interface CulturalGene {
  id: string
  name: string
  category: "architecture" | "literature" | "art" | "philosophy" | "custom"
  dynasty: string
  period: string
  location: string
  description: string
  significance: string
  relatedElements: string[]
  digitalAssets: {
    images: string[]
    models: string[]
    documents: string[]
  }
  metadata: {
    accuracy: number
    completeness: number
    lastUpdated: string
    sources: string[]
  }
}

export interface TimeSpaceScene {
  id: string
  name: string
  dynasty: string
  year: string
  description: string
  location: {
    latitude: number
    longitude: number
    address: string
  }
  culturalElements: Array<{
    name: string
    type: string
    significance: string
  }>
  reconstructionData: {
    accuracy: number
    method: string
    sources: string[]
  }
  visualAssets: {
    panorama: string
    models: string[]
    textures: string[]
  }
  interactiveFeatures: string[]
}

export interface CulturalGeneConnection {
  targetGeneId: string
  relationship: string
  strength: number
  evidence: string[]
}

export interface CulturalAnalysisResult {
  geneId: string
  connections: CulturalGeneConnection[]
  timeline: Array<{
    period: string
    significance: number
    events: string[]
  }>
  insights: string[]
  recommendations: string[]
}

export interface SearchFilters {
  category?: string
  dynasty?: string
  location?: string
  timeRange?: {
    start: string
    end: string
  }
}

// 模拟文化基因数据
const culturalGenesData: CulturalGene[] = [
  {
    id: "gene_longmen_grottoes",
    name: "龙门石窟",
    category: "architecture",
    dynasty: "北魏",
    period: "493-534年",
    location: "洛阳市洛龙区",
    description: "中国石刻艺术宝库之一，现存窟龛2345个，造像10万余尊，碑刻题记2800余品。",
    significance: "代表了中国石窟艺术的最高成就，体现了佛教艺术中国化的历程。",
    relatedElements: ["佛教文化", "石刻艺术", "建筑技术", "宗教哲学"],
    digitalAssets: {
      images: ["/cultural-assets/longmen-1.jpg", "/cultural-assets/longmen-2.jpg"],
      models: ["/cultural-assets/longmen-3d.glb"],
      documents: ["/cultural-assets/longmen-research.pdf"],
    },
    metadata: {
      accuracy: 0.95,
      completeness: 0.88,
      lastUpdated: "2024-01-15",
      sources: ["洛阳龙门石窟研究院", "中国石窟艺术研究所"],
    },
  },
  {
    id: "gene_white_horse_temple",
    name: "白马寺",
    category: "architecture",
    dynasty: "东汉",
    period: "68年",
    location: "洛阳市洛龙区",
    description: '中国第一座佛教寺院，被誉为"中国佛教祖庭"和"释源"。',
    significance: "标志着佛教正式传入中国，是中外文化交流的重要见证。",
    relatedElements: ["佛教传播", "中外交流", "宗教建筑", "文化融合"],
    digitalAssets: {
      images: ["/cultural-assets/baima-1.jpg", "/cultural-assets/baima-2.jpg"],
      models: ["/cultural-assets/baima-3d.glb"],
      documents: ["/cultural-assets/baima-history.pdf"],
    },
    metadata: {
      accuracy: 0.92,
      completeness: 0.85,
      lastUpdated: "2024-01-10",
      sources: ["白马寺文物保护研究所", "中国佛教协会"],
    },
  },
  {
    id: "gene_luoshen_fu",
    name: "洛神赋",
    category: "literature",
    dynasty: "魏",
    period: "222年",
    location: "洛阳",
    description: "曹植创作的辞赋名篇，描写了作者与洛水女神的邂逅和爱情故事。",
    significance: "中国古代文学史上的经典之作，影响了后世无数文学创作。",
    relatedElements: ["古典文学", "神话传说", "爱情主题", "洛水文化"],
    digitalAssets: {
      images: ["/cultural-assets/luoshen-1.jpg", "/cultural-assets/luoshen-2.jpg"],
      models: [],
      documents: ["/cultural-assets/luoshen-analysis.pdf"],
    },
    metadata: {
      accuracy: 0.98,
      completeness: 0.95,
      lastUpdated: "2024-01-20",
      sources: ["中国古典文学研究所", "洛阳师范学院"],
    },
  },
  {
    id: "gene_hetu_luoshu",
    name: "河图洛书",
    category: "philosophy",
    dynasty: "上古",
    period: "传说时代",
    location: "洛阳",
    description: "中国古代传说中的神秘图案，被认为是中华文明的源头之一。",
    significance: "奠定了中国古代哲学、数学、天文学的基础理论框架。",
    relatedElements: ["古代哲学", "数字文化", "天文历法", "易经八卦"],
    digitalAssets: {
      images: ["/cultural-assets/hetu-1.jpg", "/cultural-assets/luoshu-1.jpg"],
      models: ["/cultural-assets/hetu-luoshu-3d.glb"],
      documents: ["/cultural-assets/hetu-luoshu-study.pdf"],
    },
    metadata: {
      accuracy: 0.75,
      completeness: 0.7,
      lastUpdated: "2024-01-05",
      sources: ["中国哲学史研究会", "河洛文化研究院"],
    },
  },
  {
    id: "gene_tang_sancai",
    name: "唐三彩",
    category: "art",
    dynasty: "唐",
    period: "618-907年",
    location: "洛阳",
    description: "唐代彩色釉陶器，以黄、绿、白三色为主，是唐代艺术的代表。",
    significance: "体现了唐代开放包容的文化特色和高超的工艺技术。",
    relatedElements: ["陶瓷工艺", "唐代文化", "丝绸之路", "艺术审美"],
    digitalAssets: {
      images: ["/cultural-assets/sancai-1.jpg", "/cultural-assets/sancai-2.jpg"],
      models: ["/cultural-assets/sancai-3d.glb"],
      documents: ["/cultural-assets/sancai-craft.pdf"],
    },
    metadata: {
      accuracy: 0.9,
      completeness: 0.82,
      lastUpdated: "2024-01-12",
      sources: ["洛阳博物馆", "中国陶瓷研究所"],
    },
  },
  {
    id: "gene_peony_culture",
    name: "牡丹文化",
    category: "custom",
    dynasty: "隋唐",
    period: "581-907年",
    location: "洛阳",
    description: "洛阳牡丹栽培历史悠久，形成了独特的牡丹文化传统。",
    significance: "象征着富贵吉祥，是洛阳城市文化的重要标识。",
    relatedElements: ["园艺文化", "节庆习俗", "文学艺术", "城市象征"],
    digitalAssets: {
      images: ["/cultural-assets/peony-1.jpg", "/cultural-assets/peony-2.jpg"],
      models: [],
      documents: ["/cultural-assets/peony-culture.pdf"],
    },
    metadata: {
      accuracy: 0.88,
      completeness: 0.9,
      lastUpdated: "2024-01-18",
      sources: ["洛阳牡丹研究院", "洛阳市园林局"],
    },
  },
]

// 模拟时空场景数据
const timeSpaceScenesData: TimeSpaceScene[] = [
  {
    id: "scene_tang_luoyang",
    name: "盛唐洛阳城",
    dynasty: "唐",
    year: "618-907年",
    description: "唐代洛阳作为东都，是当时世界上最繁华的城市之一，宫殿巍峨，市井繁荣。",
    location: {
      latitude: 34.6197,
      longitude: 112.454,
      address: "洛阳市老城区",
    },
    culturalElements: [
      { name: "应天门", type: "宫殿建筑", significance: "洛阳宫正门，象征皇权威严" },
      { name: "天街", type: "城市道路", significance: "贯穿南北的主干道，商贾云集" },
      { name: "市井坊", type: "民居区域", significance: "展现唐代市民生活风貌" },
    ],
    reconstructionData: {
      accuracy: 0.85,
      method: "考古发掘+文献研究+数字重建",
      sources: ["中科院考古研究所", "洛阳市文物考古研究院"],
    },
    visualAssets: {
      panorama: "/scenes/tang-luoyang-panorama.jpg",
      models: ["/scenes/tang-luoyang-3d.glb"],
      textures: ["/scenes/tang-textures.zip"],
    },
    interactiveFeatures: ["虚拟漫游", "NPC对话", "历史事件重现", "AR拍照"],
  },
  {
    id: "scene_song_luoyang",
    name: "宋韵洛阳",
    dynasty: "宋",
    year: "960-1279年",
    description: "北宋时期洛阳为西京，文化艺术高度发达，是文人雅士聚集之地。",
    location: {
      latitude: 34.6197,
      longitude: 112.454,
      address: "洛阳市老城区",
    },
    culturalElements: [
      { name: "龙门石窟", type: "宗教艺术", significance: "宋代继续雕凿，风格更加细腻" },
      { name: "相国寺", type: "宗教建筑", significance: "文人雅士聚集之地" },
      { name: "汴河码头", type: "交通枢纽", significance: "连接汴京的重要水路" },
    ],
    reconstructionData: {
      accuracy: 0.78,
      method: "历史文献+艺术作品+数字建模",
      sources: ["宋史研究会", "洛阳师范学院历史系"],
    },
    visualAssets: {
      panorama: "/scenes/song-luoyang-panorama.jpg",
      models: ["/scenes/song-luoyang-3d.glb"],
      textures: ["/scenes/song-textures.zip"],
    },
    interactiveFeatures: ["文人雅集体验", "诗词创作", "书画欣赏", "茶艺体验"],
  },
]

// 获取所有文化基因
export async function getAllCulturalGenes(): Promise<CulturalGene[]> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...culturalGenesData]
}

// 搜索文化基因
export async function searchCulturalGenes(query: string, filters?: SearchFilters): Promise<CulturalGene[]> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 300))

  let results = [...culturalGenesData]

  // 文本搜索
  if (query.trim()) {
    const searchTerm = query.toLowerCase()
    results = results.filter(
      (gene) =>
        gene.name.toLowerCase().includes(searchTerm) ||
        gene.description.toLowerCase().includes(searchTerm) ||
        gene.significance.toLowerCase().includes(searchTerm) ||
        gene.relatedElements.some((element) => element.toLowerCase().includes(searchTerm)),
    )
  }

  // 应用过滤器
  if (filters) {
    if (filters.category) {
      results = results.filter((gene) => gene.category === filters.category)
    }

    if (filters.dynasty) {
      results = results.filter((gene) => gene.dynasty === filters.dynasty)
    }

    if (filters.location) {
      results = results.filter((gene) => gene.location.includes(filters.location))
    }
  }

  return results
}

// 获取时空场景
export async function getTimeSpaceScenes(): Promise<TimeSpaceScene[]> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 400))
  return [...timeSpaceScenesData]
}

// 计算文化基因相似度
function calculateGeneSimilarity(gene1: CulturalGene, gene2: CulturalGene): number {
  let similarity = 0

  // 朝代相似度 (30%)
  if (gene1.dynasty === gene2.dynasty) {
    similarity += 0.3
  } else {
    // 相邻朝代给予部分分数
    const dynastyOrder = [
      "上古",
      "夏",
      "商",
      "周",
      "春秋",
      "战国",
      "秦",
      "汉",
      "三国",
      "晋",
      "南北朝",
      "隋",
      "唐",
      "五代",
      "宋",
      "元",
      "明",
      "清",
    ]
    const index1 = dynastyOrder.indexOf(gene1.dynasty)
    const index2 = dynastyOrder.indexOf(gene2.dynasty)
    if (index1 !== -1 && index2 !== -1 && Math.abs(index1 - index2) <= 2) {
      similarity += 0.15
    }
  }

  // 类别相似度 (20%)
  if (gene1.category === gene2.category) {
    similarity += 0.2
  }

  // 地理位置相似度 (20%)
  if (gene1.location === gene2.location) {
    similarity += 0.2
  } else if (gene1.location.includes("洛阳") && gene2.location.includes("洛阳")) {
    similarity += 0.1
  }

  // 相关元素重叠度 (30%)
  const commonElements = gene1.relatedElements.filter((element) => gene2.relatedElements.includes(element))
  const elementSimilarity = commonElements.length / Math.max(gene1.relatedElements.length, gene2.relatedElements.length)
  similarity += elementSimilarity * 0.3

  return Math.min(similarity, 1.0)
}

// 分析文化基因关联性
export async function analyzeCulturalGeneConnections(geneId: string): Promise<CulturalAnalysisResult | null> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 800))

  const targetGene = culturalGenesData.find((gene) => gene.id === geneId)
  if (!targetGene) {
    return null
  }

  // 计算与其他基因的关联性
  const connections: CulturalGeneConnection[] = []

  for (const gene of culturalGenesData) {
    if (gene.id === geneId) continue

    const similarity = calculateGeneSimilarity(targetGene, gene)
    if (similarity > 0.3) {
      // 只保留相似度较高的连接
      let relationship = ""

      if (gene.dynasty === targetGene.dynasty) {
        relationship = "同时代文化"
      } else if (gene.category === targetGene.category) {
        relationship = "同类型文化"
      } else if (gene.location === targetGene.location) {
        relationship = "同地域文化"
      } else {
        relationship = "文化传承"
      }

      connections.push({
        targetGeneId: gene.id,
        relationship,
        strength: similarity,
        evidence: [
          `相似度: ${Math.round(similarity * 100)}%`,
          `共同元素: ${targetGene.relatedElements.filter((e) => gene.relatedElements.includes(e)).join("、")}`,
        ],
      })
    }
  }

  // 按相似度排序
  connections.sort((a, b) => b.strength - a.strength)

  // 生成时间线分析
  const timeline = [
    {
      period: "起源期",
      significance: 0.9,
      events: [`${targetGene.name}在${targetGene.dynasty}时期形成`, "奠定了基础文化特征"],
    },
    {
      period: "发展期",
      significance: 0.7,
      events: ["文化内涵不断丰富", "影响范围逐步扩大"],
    },
    {
      period: "传承期",
      significance: 0.8,
      events: ["与其他文化元素融合", "形成独特的文化体系"],
    },
    {
      period: "现代期",
      significance: 0.6,
      events: ["数字化保护与传承", "文化价值重新发现"],
    },
  ]

  // 生成洞察和建议
  const insights = [
    `${targetGene.name}与${connections.length}个文化基因存在显著关联`,
    `主要关联类型为${connections[0]?.relationship || "文化传承"}`,
    `文化影响力评分: ${Math.round(targetGene.metadata.accuracy * targetGene.metadata.completeness * 100)}分`,
  ]

  const recommendations = [
    "建议深入研究相关文化基因的历史联系",
    "可以开发跨文化主题的创作内容",
    "适合作为文化教育的核心素材",
  ]

  return {
    geneId,
    connections: connections.slice(0, 8), // 最多返回8个连接
    timeline,
    insights,
    recommendations,
  }
}

// 生成文化基因报告
export async function generateCulturalGeneReport(geneIds: string[]): Promise<{
  summary: string
  connections: Array<{
    gene1: string
    gene2: string
    relationship: string
    strength: number
  }>
  recommendations: string[]
  exportUrl: string
}> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const genes = culturalGenesData.filter((gene) => geneIds.includes(gene.id))

  // 分析基因间的连接
  const connections = []
  for (let i = 0; i < genes.length; i++) {
    for (let j = i + 1; j < genes.length; j++) {
      const similarity = calculateGeneSimilarity(genes[i], genes[j])
      if (similarity > 0.2) {
        connections.push({
          gene1: genes[i].name,
          gene2: genes[j].name,
          relationship: similarity > 0.6 ? "强关联" : similarity > 0.4 ? "中等关联" : "弱关联",
          strength: similarity,
        })
      }
    }
  }

  const summary = `本次分析了${genes.length}个文化基因，发现${connections.length}组关联关系。这些文化基因主要分布在${[...new Set(genes.map((g) => g.dynasty))].join("、")}等历史时期，体现了洛阳深厚的文化底蕴和历史传承。`

  const recommendations = [
    "建议将高关联度的文化基因组合开发文化产品",
    "可以基于时间线开发历史文化体验项目",
    "适合作为文化教育和旅游推广的核心内容",
    "建议进一步收集和完善相关文化资料",
  ]

  return {
    summary,
    connections: connections.sort((a, b) => b.strength - a.strength),
    recommendations,
    exportUrl: "/api/reports/cultural-gene-analysis.pdf",
  }
}

// 获取文化基因详情
export async function getCulturalGeneDetail(geneId: string): Promise<CulturalGene | null> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 200))

  return culturalGenesData.find((gene) => gene.id === geneId) || null
}

// 更新文化基因信息
export async function updateCulturalGene(
  geneId: string,
  updates: Partial<CulturalGene>,
): Promise<{ success: boolean; gene?: CulturalGene; error?: string }> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 500))

  const geneIndex = culturalGenesData.findIndex((gene) => gene.id === geneId)
  if (geneIndex === -1) {
    return {
      success: false,
      error: "GENE_NOT_FOUND",
    }
  }

  // 更新基因信息
  const updatedGene = {
    ...culturalGenesData[geneIndex],
    ...updates,
    metadata: {
      ...culturalGenesData[geneIndex].metadata,
      lastUpdated: new Date().toISOString(),
    },
  }

  culturalGenesData[geneIndex] = updatedGene

  return {
    success: true,
    gene: updatedGene,
  }
}

// 添加新的文化基因
export async function addCulturalGene(gene: Omit<CulturalGene, "id">): Promise<{
  success: boolean
  gene?: CulturalGene
  error?: string
}> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 600))

  const newGene: CulturalGene = {
    ...gene,
    id: `gene_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    metadata: {
      ...gene.metadata,
      lastUpdated: new Date().toISOString(),
    },
  }

  culturalGenesData.push(newGene)

  return {
    success: true,
    gene: newGene,
  }
}
