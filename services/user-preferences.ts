import { generateSecureId } from "@/lib/crypto-utils"

// 用户偏好类型定义
export interface UserPreferences {
  id: string
  userId: string
  theme: "light" | "dark" | "auto"
  language: "zh-CN" | "en-US"
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
    marketing: boolean
  }
  privacy: {
    profileVisibility: "public" | "friends" | "private"
    showLocation: boolean
    showActivity: boolean
    allowDataCollection: boolean
  }
  content: {
    preferredCategories: string[]
    contentFilter: "all" | "family" | "mature"
    autoplay: boolean
    qualityPreference: "auto" | "high" | "medium" | "low"
  }
  accessibility: {
    fontSize: "small" | "medium" | "large" | "extra-large"
    highContrast: boolean
    reduceMotion: boolean
    screenReader: boolean
  }
  cultural: {
    favoriteEras: string[]
    interestedTopics: string[]
    preferredNarrativeStyle: "classical" | "modern" | "fantasy"
    culturalBackground: string
  }
  creativeTools: {
    defaultScriptLength: "short" | "medium" | "long"
    preferredGenres: string[]
    collaborationMode: boolean
    autoSave: boolean
  }
  lastUpdated: string
}

// 默认偏好设置
const defaultPreferences: Omit<UserPreferences, "id" | "userId"> = {
  theme: "auto",
  language: "zh-CN",
  notifications: {
    email: true,
    push: true,
    sms: false,
    marketing: false,
  },
  privacy: {
    profileVisibility: "public",
    showLocation: true,
    showActivity: true,
    allowDataCollection: true,
  },
  content: {
    preferredCategories: [],
    contentFilter: "all",
    autoplay: true,
    qualityPreference: "auto",
  },
  accessibility: {
    fontSize: "medium",
    highContrast: false,
    reduceMotion: false,
    screenReader: false,
  },
  cultural: {
    favoriteEras: [],
    interestedTopics: [],
    preferredNarrativeStyle: "modern",
    culturalBackground: "",
  },
  creativeTools: {
    defaultScriptLength: "medium",
    preferredGenres: [],
    collaborationMode: false,
    autoSave: true,
  },
  lastUpdated: new Date().toISOString(),
}

// 模拟用户偏好存储
const userPreferencesStore = new Map<string, UserPreferences>()

// 获取用户偏好
export async function getUserPreferences(userId: string): Promise<UserPreferences> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 200))

  let preferences = userPreferencesStore.get(userId)

  if (!preferences) {
    // 创建默认偏好
    preferences = {
      id: generateSecureId("pref"),
      userId,
      ...defaultPreferences,
    }
    userPreferencesStore.set(userId, preferences)
  }

  return preferences
}

// 更新用户偏好
export async function updateUserPreferences(
  userId: string,
  updates: Partial<Omit<UserPreferences, "id" | "userId">>,
): Promise<{ success: boolean; preferences?: UserPreferences; error?: string }> {
  try {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 300))

    const currentPreferences = await getUserPreferences(userId)

    const updatedPreferences: UserPreferences = {
      ...currentPreferences,
      ...updates,
      lastUpdated: new Date().toISOString(),
    }

    userPreferencesStore.set(userId, updatedPreferences)

    return {
      success: true,
      preferences: updatedPreferences,
    }
  } catch (error) {
    console.error("更新用户偏好失败:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "更新失败",
    }
  }
}

// 重置用户偏好
export async function resetUserPreferences(userId: string): Promise<{
  success: boolean
  preferences?: UserPreferences
  error?: string
}> {
  try {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 200))

    const resetPreferences: UserPreferences = {
      id: generateSecureId("pref"),
      userId,
      ...defaultPreferences,
      lastUpdated: new Date().toISOString(),
    }

    userPreferencesStore.set(userId, resetPreferences)

    return {
      success: true,
      preferences: resetPreferences,
    }
  } catch (error) {
    console.error("重置用户偏好失败:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "重置失败",
    }
  }
}

// 获取推荐的文化内容
export async function getRecommendedContent(userId: string): Promise<{
  culturalGenes: string[]
  timeSpaceScenes: string[]
  scriptThemes: string[]
}> {
  try {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 400))

    const preferences = await getUserPreferences(userId)

    // 基于用户偏好生成推荐
    const recommendations = {
      culturalGenes: [],
      timeSpaceScenes: [],
      scriptThemes: [],
    }

    // 根据喜欢的时代推荐文化基因
    if (preferences.cultural.favoriteEras.length > 0) {
      recommendations.culturalGenes = preferences.cultural.favoriteEras.flatMap((era) => {
        switch (era) {
          case "唐朝":
            return ["gene_tang_sancai", "gene_longmen_grottoes"]
          case "宋朝":
            return ["gene_luoshen_fu"]
          case "上古":
            return ["gene_hetu_luoshu"]
          default:
            return []
        }
      })
    }

    // 根据兴趣话题推荐时空场景
    if (preferences.cultural.interestedTopics.length > 0) {
      recommendations.timeSpaceScenes = preferences.cultural.interestedTopics.flatMap((topic) => {
        switch (topic) {
          case "古代建筑":
            return ["scene_tang_luoyang"]
          case "文学艺术":
            return ["scene_song_luoyang"]
          default:
            return []
        }
      })
    }

    // 根据叙事风格推荐剧本主题
    const narrativeStyle = preferences.cultural.preferredNarrativeStyle
    switch (narrativeStyle) {
      case "classical":
        recommendations.scriptThemes = ["洛神赋新传", "白马寺的守护者"]
        break
      case "modern":
        recommendations.scriptThemes = ["洛阳古都探秘", "龙门石窟传奇"]
        break
      case "fantasy":
        recommendations.scriptThemes = ["河图洛书奇遇", "时空穿越洛阳"]
        break
    }

    return recommendations
  } catch (error) {
    console.error("获取推荐内容失败:", error)
    return {
      culturalGenes: [],
      timeSpaceScenes: [],
      scriptThemes: [],
    }
  }
}

// 记录用户行为
export async function recordUserBehavior(
  userId: string,
  action: string,
  target: string,
  metadata?: Record<string, any>,
): Promise<{ success: boolean; error?: string }> {
  try {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 100))

    // 记录用户行为用于改进推荐算法
    const behaviorRecord = {
      userId,
      action,
      target,
      metadata,
      timestamp: new Date().toISOString(),
    }

    // 实际项目中会存储到数据库
    console.log("用户行为记录:", behaviorRecord)

    // 基于行为更新用户偏好
    if (action === "view_cultural_gene") {
      const preferences = await getUserPreferences(userId)
      // 可以根据查看的文化基因类型更新兴趣话题
    }

    return { success: true }
  } catch (error) {
    console.error("记录用户行为失败:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "记录失败",
    }
  }
}

// 导出用户偏好
export async function exportUserPreferences(userId: string): Promise<{
  success: boolean
  data?: string
  error?: string
}> {
  try {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 500))

    const preferences = await getUserPreferences(userId)
    const exportData = JSON.stringify(preferences, null, 2)

    return {
      success: true,
      data: exportData,
    }
  } catch (error) {
    console.error("导出用户偏好失败:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "导出失败",
    }
  }
}

// 导入用户偏好
export async function importUserPreferences(
  userId: string,
  data: string,
): Promise<{ success: boolean; preferences?: UserPreferences; error?: string }> {
  try {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 400))

    const importedPreferences = JSON.parse(data) as UserPreferences

    // 验证数据格式
    if (!importedPreferences.id || !importedPreferences.userId) {
      throw new Error("无效的偏好数据格式")
    }

    // 更新用户ID并保存
    const updatedPreferences: UserPreferences = {
      ...importedPreferences,
      userId,
      lastUpdated: new Date().toISOString(),
    }

    userPreferencesStore.set(userId, updatedPreferences)

    return {
      success: true,
      preferences: updatedPreferences,
    }
  } catch (error) {
    console.error("导入用户偏好失败:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "导入失败",
    }
  }
}

// 获取偏好统计
export async function getPreferencesAnalytics(userId: string): Promise<{
  totalInteractions: number
  favoriteCategories: Array<{ category: string; count: number }>
  activityTrend: Array<{ date: string; actions: number }>
  recommendations: {
    accuracy: number
    clickThrough: number
  }
}> {
  try {
    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 600))

    // 模拟统计数据
    return {
      totalInteractions: 156,
      favoriteCategories: [
        { category: "古代建筑", count: 45 },
        { category: "文学艺术", count: 38 },
        { category: "宗教文化", count: 32 },
        { category: "民俗传统", count: 25 },
        { category: "哲学思想", count: 16 },
      ],
      activityTrend: [
        { date: "2024-01-01", actions: 12 },
        { date: "2024-01-02", actions: 18 },
        { date: "2024-01-03", actions: 15 },
        { date: "2024-01-04", actions: 22 },
        { date: "2024-01-05", actions: 19 },
        { date: "2024-01-06", actions: 25 },
        { date: "2024-01-07", actions: 21 },
      ],
      recommendations: {
        accuracy: 0.78,
        clickThrough: 0.34,
      },
    }
  } catch (error) {
    console.error("获取偏好统计失败:", error)
    return {
      totalInteractions: 0,
      favoriteCategories: [],
      activityTrend: [],
      recommendations: {
        accuracy: 0,
        clickThrough: 0,
      },
    }
  }
}
