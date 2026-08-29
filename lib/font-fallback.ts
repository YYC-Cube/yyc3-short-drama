/**
 * @file 字体回退配置
 * @description 为各类文化字体提供浏览器回退字体栈（当自定义字体未加载时）
 */

export type FontFallbackKey =
  | "sanji-xiaozhuan"
  | "yinpin-zhuan"
  | "hanyi-zhuanyi"
  | "dot-braille"
  | "soul-dragon"
  | "huakan-seal"

/** 各字体的回退栈：自定义字体 → 通用中文衬线 → 系统默认 */
export const fontFallbackMap: Record<FontFallbackKey, string> = {
  "sanji-xiaozhuan": "'STKaiti', 'KaiTi', 'Noto Serif SC', serif",
  "yinpin-zhuan": "'STSong', 'SimSun', 'Noto Serif SC', serif",
  "hanyi-zhuanyi": "'STKaiti', 'KaiTi', 'Noto Serif SC', serif",
  "dot-braille": "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif",
  "soul-dragon": "'STXingkai', 'Xingkai SC', 'Noto Serif SC', serif",
  "huakan-seal": "'STSong', 'SimSun', 'Noto Serif SC', serif",
}
