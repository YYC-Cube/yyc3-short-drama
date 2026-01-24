---
@file: 090-YYC3-Short-Drama-类型定义-跨端-小程序-APP数据类型适配.md
@description: YYC3-Short-Drama 小程序、APP多端数据类型的适配规则与约束，保障兼容性
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [类型定义],[跨端],[数据适配]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 090-YYC3-Short-Drama-类型定义-跨端-小程序-APP数据类型适配

## 概述

本文档详细描述YYC3-Short-Drama-类型定义-跨端-小程序-APP数据类型适配相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范跨端-小程序-APP数据类型适配相关的业务标准与技术落地要求
- 为项目相关人员提供清晰的参考依据
- 保障相关模块开发、实施、运维的一致性与规范性

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：确保系统7x24小时稳定运行，保障用户体验
- **高性能**：优化响应时间和处理能力，提升系统效率
- **高安全性**：保护用户数据和隐私安全，建立多层次安全防护
- **高扩展性**：支持业务快速扩展，适应未来发展需求
- **高可维护性**：便于后续维护和升级，降低运维成本

#### 2.2 五标体系
- **标准化**：统一的技术和流程标准，确保项目质量
- **规范化**：严格的开发和管理规范，提高开发效率
- **自动化**：提高开发效率和质量，减少人为错误
- **智能化**：利用AI技术提升能力，实现智能决策
- **可视化**：直观的监控和管理界面，便于系统运维

#### 2.3 五化架构
- **流程化**：标准化的开发流程，确保项目有序进行
- **文档化**：完善的文档体系，提高项目可追溯性
- **工具化**：高效的开发工具链，提升开发效率
- **数字化**：数据驱动的决策，提高决策准确性
- **生态化**：开放的生态系统，促进项目可持续发展

### 3. 跨端数据类型适配

#### 3.1 平台概述

**支持平台**

| 平台 | 平台标识 | 技术栈 | 版本要求 | 特点 |
|------|----------|---------|----------|------|
| 微信小程序 | wechat | 原生小程序框架 | 基础库 2.0+ | 用户量大，生态完善 |
| 支付宝小程序 | alipay | 原生小程序框架 | 基础库 10.0+ | 支付能力强 |
| 百度小程序 | baidu | 原生小程序框架 | 基础库 3.0+ | AI能力强 |
| 抖音小程序 | douyin | 原生小程序框架 | 基础库 1.0+ | 短视频生态 |
| iOS APP | ios | React Native / Swift | iOS 13.0+ | 性能优异 |
| Android APP | android | React Native / Kotlin | Android 8.0+ | 兼容性好 |
| H5 | h5 | Vue / React | 现代浏览器 | 跨平台通用 |

#### 3.2 基础数据类型适配

**数字类型适配**

```typescript
/**
 * 数字类型适配规则
 */
interface NumberTypeAdapter {
  platform: Platform;
  type: 'number' | 'bigint' | 'decimal';
  maxSafeInteger: number;
  precision: number;
  description: string;
}

const NUMBER_TYPE_ADAPTERS: Record<Platform, NumberTypeAdapter> = {
  wechat: {
    platform: 'wechat',
    type: 'number',
    maxSafeInteger: 9007199254740991,
    precision: 16,
    description: '微信小程序使用JavaScript Number类型'
  },
  alipay: {
    platform: 'alipay',
    type: 'number',
    maxSafeInteger: 9007199254740991,
    precision: 16,
    description: '支付宝小程序使用JavaScript Number类型'
  },
  baidu: {
    platform: 'baidu',
    type: 'number',
    maxSafeInteger: 9007199254740991,
    precision: 16,
    description: '百度小程序使用JavaScript Number类型'
  },
  douyin: {
    platform: 'douyin',
    type: 'number',
    maxSafeInteger: 9007199254740991,
    precision: 16,
    description: '抖音小程序使用JavaScript Number类型'
  },
  ios: {
    platform: 'ios',
    type: 'number',
    maxSafeInteger: 9007199254740991,
    precision: 16,
    description: 'iOS APP使用JavaScript Number类型'
  },
  android: {
    platform: 'android',
    type: 'number',
    maxSafeInteger: 9007199254740991,
    precision: 16,
    description: 'Android APP使用JavaScript Number类型'
  },
  h5: {
    platform: 'h5',
    type: 'number',
    maxSafeInteger: 9007199254740991,
    precision: 16,
    description: 'H5使用JavaScript Number类型'
  }
};

/**
 * 安全数字转换
 * @param value 原始值
 * @param platform 目标平台
 * @returns 转换后的安全数字
 */
function safeNumberConvert(value: number | string, platform: Platform): number {
  const adapter = NUMBER_TYPE_ADAPTERS[platform];
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (numValue > adapter.maxSafeInteger) {
    console.warn(`数值超过平台${platform}的安全整数范围`);
    return adapter.maxSafeInteger;
  }
  
  return numValue;
}

/**
 * 星币金额转换
 * @param amount 星币金额
 * @param platform 目标平台
 * @returns 转换后的金额（保留2位小数）
 */
function starCoinAmountConvert(amount: number | string, platform: Platform): number {
  const numValue = safeNumberConvert(amount, platform);
  return Math.round(numValue * 100) / 100;
}
```

**字符串类型适配**

```typescript
/**
 * 字符串类型适配规则
 */
interface StringTypeAdapter {
  platform: Platform;
  encoding: string;
  maxLength: number;
  emojiSupport: boolean;
  description: string;
}

const STRING_TYPE_ADAPTERS: Record<Platform, StringTypeAdapter> = {
  wechat: {
    platform: 'wechat',
    encoding: 'UTF-8',
    maxLength: 50000,
    emojiSupport: true,
    description: '微信小程序支持UTF-8编码和Emoji'
  },
  alipay: {
    platform: 'alipay',
    encoding: 'UTF-8',
    maxLength: 50000,
    emojiSupport: true,
    description: '支付宝小程序支持UTF-8编码和Emoji'
  },
  baidu: {
    platform: 'baidu',
    encoding: 'UTF-8',
    maxLength: 50000,
    emojiSupport: true,
    description: '百度小程序支持UTF-8编码和Emoji'
  },
  douyin: {
    platform: 'douyin',
    encoding: 'UTF-8',
    maxLength: 50000,
    emojiSupport: true,
    description: '抖音小程序支持UTF-8编码和Emoji'
  },
  ios: {
    platform: 'ios',
    encoding: 'UTF-8',
    maxLength: 100000,
    emojiSupport: true,
    description: 'iOS APP支持UTF-8编码和Emoji'
  },
  android: {
    platform: 'android',
    encoding: 'UTF-8',
    maxLength: 100000,
    emojiSupport: true,
    description: 'Android APP支持UTF-8编码和Emoji'
  },
  h5: {
    platform: 'h5',
    encoding: 'UTF-8',
    maxLength: 100000,
    emojiSupport: true,
    description: 'H5支持UTF-8编码和Emoji'
  }
};

/**
 * 字符串长度计算（支持Emoji）
 * @param str 字符串
 * @returns 实际字符长度
 */
function getStringLength(str: string): number {
  return [...str].length;
}

/**
 * 字符串截断（支持Emoji）
 * @param str 字符串
 * @param maxLength 最大长度
 * @param suffix 后缀
 * @returns 截断后的字符串
 */
function truncateString(str: string, maxLength: number, suffix: string = '...'): string {
  const chars = [...str];
  if (chars.length <= maxLength) {
    return str;
  }
  return chars.slice(0, maxLength - suffix.length).join('') + suffix;
}
```

**日期时间类型适配**

```typescript
/**
 * 日期时间类型适配规则
 */
interface DateTimeTypeAdapter {
  platform: Platform;
  format: string;
  timezone: string;
  timestampUnit: 'ms' | 's';
  description: string;
}

const DATE_TIME_TYPE_ADAPTERS: Record<Platform, DateTimeTypeAdapter> = {
  wechat: {
    platform: 'wechat',
    format: 'YYYY-MM-DD HH:mm:ss',
    timezone: 'Asia/Shanghai',
    timestampUnit: 'ms',
    description: '微信小程序使用毫秒时间戳'
  },
  alipay: {
    platform: 'alipay',
    format: 'YYYY-MM-DD HH:mm:ss',
    timezone: 'Asia/Shanghai',
    timestampUnit: 'ms',
    description: '支付宝小程序使用毫秒时间戳'
  },
  baidu: {
    platform: 'baidu',
    format: 'YYYY-MM-DD HH:mm:ss',
    timezone: 'Asia/Shanghai',
    timestampUnit: 'ms',
    description: '百度小程序使用毫秒时间戳'
  },
  douyin: {
    platform: 'douyin',
    format: 'YYYY-MM-DD HH:mm:ss',
    timezone: 'Asia/Shanghai',
    timestampUnit: 'ms',
    description: '抖音小程序使用毫秒时间戳'
  },
  ios: {
    platform: 'ios',
    format: 'YYYY-MM-DD HH:mm:ss',
    timezone: 'Asia/Shanghai',
    timestampUnit: 'ms',
    description: 'iOS APP使用毫秒时间戳'
  },
  android: {
    platform: 'android',
    format: 'YYYY-MM-DD HH:mm:ss',
    timezone: 'Asia/Shanghai',
    timestampUnit: 'ms',
    description: 'Android APP使用毫秒时间戳'
  },
  h5: {
    platform: 'h5',
    format: 'YYYY-MM-DD HH:mm:ss',
    timezone: 'Asia/Shanghai',
    timestampUnit: 'ms',
    description: 'H5使用毫秒时间戳'
  }
};

/**
 * 日期时间格式化
 * @param timestamp 时间戳
 * @param platform 目标平台
 * @param format 格式字符串
 * @returns 格式化后的日期时间字符串
 */
function formatDateTime(timestamp: number, platform: Platform, format?: string): string {
  const adapter = DATE_TIME_TYPE_ADAPTERS[platform];
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  const formatStr = format || adapter.format;
  return formatStr
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 日期时间解析
 * @param dateTimeStr 日期时间字符串
 * @param platform 目标平台
 * @returns 时间戳
 */
function parseDateTime(dateTimeStr: string, platform: Platform): number {
  const adapter = DATE_TIME_TYPE_ADAPTERS[platform];
  const date = new Date(dateTimeStr);
  return date.getTime();
}
```

#### 3.3 业务数据类型适配

**用户数据类型适配**

```typescript
/**
 * 用户数据类型适配
 */
interface UserDataAdapter {
  platform: Platform;
  userIdType: 'string' | 'number';
  userIdLength: number;
  avatarFormat: string[];
  nicknameMaxLength: number;
  description: string;
}

const USER_DATA_ADAPTERS: Record<Platform, UserDataAdapter> = {
  wechat: {
    platform: 'wechat',
    userIdType: 'string',
    userIdLength: 32,
    avatarFormat: ['jpg', 'png', 'webp'],
    nicknameMaxLength: 30,
    description: '微信小程序用户数据规范'
  },
  alipay: {
    platform: 'alipay',
    userIdType: 'string',
    userIdLength: 32,
    avatarFormat: ['jpg', 'png', 'webp'],
    nicknameMaxLength: 30,
    description: '支付宝小程序用户数据规范'
  },
  baidu: {
    platform: 'baidu',
    userIdType: 'string',
    userIdLength: 32,
    avatarFormat: ['jpg', 'png', 'webp'],
    nicknameMaxLength: 30,
    description: '百度小程序用户数据规范'
  },
  douyin: {
    platform: 'douyin',
    userIdType: 'string',
    userIdLength: 32,
    avatarFormat: ['jpg', 'png', 'webp'],
    nicknameMaxLength: 30,
    description: '抖音小程序用户数据规范'
  },
  ios: {
    platform: 'ios',
    userIdType: 'string',
    userIdLength: 32,
    avatarFormat: ['jpg', 'png', 'webp', 'heic'],
    nicknameMaxLength: 30,
    description: 'iOS APP用户数据规范'
  },
  android: {
    platform: 'android',
    userIdType: 'string',
    userIdLength: 32,
    avatarFormat: ['jpg', 'png', 'webp'],
    nicknameMaxLength: 30,
    description: 'Android APP用户数据规范'
  },
  h5: {
    platform: 'h5',
    userIdType: 'string',
    userIdLength: 32,
    avatarFormat: ['jpg', 'png', 'webp', 'gif'],
    nicknameMaxLength: 30,
    description: 'H5用户数据规范'
  }
};

/**
 * 用户ID转换
 * @param userId 用户ID
 * @param sourcePlatform 源平台
 * @param targetPlatform 目标平台
 * @returns 转换后的用户ID
 */
function convertUserId(
  userId: string | number,
  sourcePlatform: Platform,
  targetPlatform: Platform
): string {
  const sourceAdapter = USER_DATA_ADAPTERS[sourcePlatform];
  const targetAdapter = USER_DATA_ADAPTERS[targetPlatform];
  
  const userIdStr = String(userId);
  
  if (userIdStr.length > targetAdapter.userIdLength) {
    console.warn(`用户ID长度超过平台${targetPlatform}的限制`);
    return userIdStr.slice(0, targetAdapter.userIdLength);
  }
  
  return userIdStr;
}
```

**短剧数据类型适配**

```typescript
/**
 * 短剧数据类型适配
 */
interface DramaDataAdapter {
  platform: Platform;
  videoFormat: string[];
  maxVideoSize: number;
  maxVideoDuration: number;
  coverFormat: string[];
  maxCoverSize: number;
  description: string;
}

const DRAMA_DATA_ADAPTERS: Record<Platform, DramaDataAdapter> = {
  wechat: {
    platform: 'wechat',
    videoFormat: ['mp4'],
    maxVideoSize: 100 * 1024 * 1024, // 100MB
    maxVideoDuration: 600, // 10分钟
    coverFormat: ['jpg', 'png', 'webp'],
    maxCoverSize: 5 * 1024 * 1024, // 5MB
    description: '微信小程序短剧数据规范'
  },
  alipay: {
    platform: 'alipay',
    videoFormat: ['mp4'],
    maxVideoSize: 100 * 1024 * 1024, // 100MB
    maxVideoDuration: 600, // 10分钟
    coverFormat: ['jpg', 'png', 'webp'],
    maxCoverSize: 5 * 1024 * 1024, // 5MB
    description: '支付宝小程序短剧数据规范'
  },
  baidu: {
    platform: 'baidu',
    videoFormat: ['mp4', 'webm'],
    maxVideoSize: 100 * 1024 * 1024, // 100MB
    maxVideoDuration: 600, // 10分钟
    coverFormat: ['jpg', 'png', 'webp'],
    maxCoverSize: 5 * 1024 * 1024, // 5MB
    description: '百度小程序短剧数据规范'
  },
  douyin: {
    platform: 'douyin',
    videoFormat: ['mp4'],
    maxVideoSize: 200 * 1024 * 1024, // 200MB
    maxVideoDuration: 900, // 15分钟
    coverFormat: ['jpg', 'png', 'webp'],
    maxCoverSize: 10 * 1024 * 1024, // 10MB
    description: '抖音小程序短剧数据规范'
  },
  ios: {
    platform: 'ios',
    videoFormat: ['mp4', 'mov', 'm4v'],
    maxVideoSize: 200 * 1024 * 1024, // 200MB
    maxVideoDuration: 900, // 15分钟
    coverFormat: ['jpg', 'png', 'webp', 'heic'],
    maxCoverSize: 10 * 1024 * 1024, // 10MB
    description: 'iOS APP短剧数据规范'
  },
  android: {
    platform: 'android',
    videoFormat: ['mp4', 'webm', 'mkv'],
    maxVideoSize: 200 * 1024 * 1024, // 200MB
    maxVideoDuration: 900, // 15分钟
    coverFormat: ['jpg', 'png', 'webp'],
    maxCoverSize: 10 * 1024 * 1024, // 10MB
    description: 'Android APP短剧数据规范'
  },
  h5: {
    platform: 'h5',
    videoFormat: ['mp4', 'webm'],
    maxVideoSize: 100 * 1024 * 1024, // 100MB
    maxVideoDuration: 600, // 10分钟
    coverFormat: ['jpg', 'png', 'webp', 'gif'],
    maxCoverSize: 5 * 1024 * 1024, // 5MB
    description: 'H5短剧数据规范'
  }
};

/**
 * 短剧视频格式转换
 * @param videoUrl 视频URL
 * @param sourceFormat 源格式
 * @param targetPlatform 目标平台
 * @returns 转换后的视频URL
 */
function convertDramaVideoFormat(
  videoUrl: string,
  sourceFormat: string,
  targetPlatform: Platform
): string {
  const adapter = DRAMA_DATA_ADAPTERS[targetPlatform];
  
  if (adapter.videoFormat.includes(sourceFormat.toLowerCase())) {
    return videoUrl;
  }
  
  const targetFormat = adapter.videoFormat[0];
  return videoUrl.replace(/\.[^.]+$/, `.${targetFormat}`);
}
```

**文化资源数据类型适配**

```typescript
/**
 * 文化资源数据类型适配
 */
interface CulturalResourceDataAdapter {
  platform: Platform;
  imageFormat: string[];
  maxImageSize: number;
  maxImageCount: number;
  documentFormat: string[];
  maxDocumentSize: number;
  description: string;
}

const CULTURAL_RESOURCE_DATA_ADAPTERS: Record<Platform, CulturalResourceDataAdapter> = {
  wechat: {
    platform: 'wechat',
    imageFormat: ['jpg', 'png', 'webp'],
    maxImageSize: 5 * 1024 * 1024, // 5MB
    maxImageCount: 20,
    documentFormat: ['pdf', 'doc', 'docx'],
    maxDocumentSize: 10 * 1024 * 1024, // 10MB
    description: '微信小程序文化资源数据规范'
  },
  alipay: {
    platform: 'alipay',
    imageFormat: ['jpg', 'png', 'webp'],
    maxImageSize: 5 * 1024 * 1024, // 5MB
    maxImageCount: 20,
    documentFormat: ['pdf', 'doc', 'docx'],
    maxDocumentSize: 10 * 1024 * 1024, // 10MB
    description: '支付宝小程序文化资源数据规范'
  },
  baidu: {
    platform: 'baidu',
    imageFormat: ['jpg', 'png', 'webp'],
    maxImageSize: 5 * 1024 * 1024, // 5MB
    maxImageCount: 20,
    documentFormat: ['pdf', 'doc', 'docx'],
    maxDocumentSize: 10 * 1024 * 1024, // 10MB
    description: '百度小程序文化资源数据规范'
  },
  douyin: {
    platform: 'douyin',
    imageFormat: ['jpg', 'png', 'webp'],
    maxImageSize: 10 * 1024 * 1024, // 10MB
    maxImageCount: 30,
    documentFormat: ['pdf', 'doc', 'docx'],
    maxDocumentSize: 10 * 1024 * 1024, // 10MB
    description: '抖音小程序文化资源数据规范'
  },
  ios: {
    platform: 'ios',
    imageFormat: ['jpg', 'png', 'webp', 'heic'],
    maxImageSize: 10 * 1024 * 1024, // 10MB
    maxImageCount: 30,
    documentFormat: ['pdf', 'doc', 'docx', 'pages'],
    maxDocumentSize: 20 * 1024 * 1024, // 20MB
    description: 'iOS APP文化资源数据规范'
  },
  android: {
    platform: 'android',
    imageFormat: ['jpg', 'png', 'webp'],
    maxImageSize: 10 * 1024 * 1024, // 10MB
    maxImageCount: 30,
    documentFormat: ['pdf', 'doc', 'docx'],
    maxDocumentSize: 20 * 1024 * 1024, // 20MB
    description: 'Android APP文化资源数据规范'
  },
  h5: {
    platform: 'h5',
    imageFormat: ['jpg', 'png', 'webp', 'gif', 'svg'],
    maxImageSize: 10 * 1024 * 1024, // 10MB
    maxImageCount: 30,
    documentFormat: ['pdf', 'doc', 'docx'],
    maxDocumentSize: 20 * 1024 * 1024, // 20MB
    description: 'H5文化资源数据规范'
  }
};
```

#### 3.4 API响应数据适配

**统一响应格式**

```typescript
/**
 * 统一API响应格式
 */
interface UnifiedResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
  requestId: string;
}

/**
 * 平台特定响应适配器
 */
interface ResponseAdapter {
  platform: Platform;
  transform: (response: any) => UnifiedResponse;
  description: string;
}

const RESPONSE_ADAPTERS: Record<Platform, ResponseAdapter> = {
  wechat: {
    platform: 'wechat',
    transform: (response) => ({
      code: response.errCode || response.code || 0,
      message: response.errMsg || response.message || 'success',
      data: response.data || null,
      timestamp: Date.now(),
      requestId: response.requestId || ''
    }),
    description: '微信小程序响应格式适配'
  },
  alipay: {
    platform: 'alipay',
    transform: (response) => ({
      code: response.errorCode || response.code || 0,
      message: response.errorMsg || response.message || 'success',
      data: response.data || null,
      timestamp: Date.now(),
      requestId: response.requestId || ''
    }),
    description: '支付宝小程序响应格式适配'
  },
  baidu: {
    platform: 'baidu',
    transform: (response) => ({
      code: response.errno || response.code || 0,
      message: response.errmsg || response.message || 'success',
      data: response.data || null,
      timestamp: Date.now(),
      requestId: response.requestId || ''
    }),
    description: '百度小程序响应格式适配'
  },
  douyin: {
    platform: 'douyin',
    transform: (response) => ({
      code: response.err_no || response.code || 0,
      message: response.err_tips || response.message || 'success',
      data: response.data || null,
      timestamp: Date.now(),
      requestId: response.requestId || ''
    }),
    description: '抖音小程序响应格式适配'
  },
  ios: {
    platform: 'ios',
    transform: (response) => ({
      code: response.code || 0,
      message: response.message || 'success',
      data: response.data || null,
      timestamp: response.timestamp || Date.now(),
      requestId: response.requestId || ''
    }),
    description: 'iOS APP响应格式适配'
  },
  android: {
    platform: 'android',
    transform: (response) => ({
      code: response.code || 0,
      message: response.message || 'success',
      data: response.data || null,
      timestamp: response.timestamp || Date.now(),
      requestId: response.requestId || ''
    }),
    description: 'Android APP响应格式适配'
  },
  h5: {
    platform: 'h5',
    transform: (response) => ({
      code: response.code || 0,
      message: response.message || 'success',
      data: response.data || null,
      timestamp: response.timestamp || Date.now(),
      requestId: response.requestId || ''
    }),
    description: 'H5响应格式适配'
  }
};

/**
 * 响应数据适配
 * @param response 原始响应
 * @param platform 目标平台
 * @returns 统一响应格式
 */
function adaptResponse<T = any>(
  response: any,
  platform: Platform
): UnifiedResponse<T> {
  const adapter = RESPONSE_ADAPTERS[platform];
  return adapter.transform(response);
}
```

#### 3.5 跨端适配工具类

**平台检测工具**

```typescript
/**
 * 平台类型
 */
type Platform = 'wechat' | 'alipay' | 'baidu' | 'douyin' | 'ios' | 'android' | 'h5';

/**
 * 平台检测工具
 */
class PlatformDetector {
  /**
   * 获取当前平台
   */
  static getCurrentPlatform(): Platform {
    if (typeof wx !== 'undefined') {
      return 'wechat';
    }
    if (typeof my !== 'undefined') {
      return 'alipay';
    }
    if (typeof swan !== 'undefined') {
      return 'baidu';
    }
    if (typeof tt !== 'undefined') {
      return 'douyin';
    }
    
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      return 'ios';
    }
    if (userAgent.includes('android')) {
      return 'android';
    }
    
    return 'h5';
  }

  /**
   * 判断是否为小程序
   */
  static isMiniProgram(): boolean {
    const platform = this.getCurrentPlatform();
    return ['wechat', 'alipay', 'baidu', 'douyin'].includes(platform);
  }

  /**
   * 判断是否为APP
   */
  static isApp(): boolean {
    const platform = this.getCurrentPlatform();
    return ['ios', 'android'].includes(platform);
  }

  /**
   * 判断是否为H5
   */
  static isH5(): boolean {
    return this.getCurrentPlatform() === 'h5';
  }
}
```

**数据适配工具类**

```typescript
/**
 * 数据适配工具类
 */
class DataAdapter {
  /**
   * 适配数字类型
   */
  static adaptNumber(value: number | string, platform?: Platform): number {
    const targetPlatform = platform || PlatformDetector.getCurrentPlatform();
    return safeNumberConvert(value, targetPlatform);
  }

  /**
   * 适配星币金额
   */
  static adaptStarCoinAmount(amount: number | string, platform?: Platform): number {
    const targetPlatform = platform || PlatformDetector.getCurrentPlatform();
    return starCoinAmountConvert(amount, targetPlatform);
  }

  /**
   * 适配字符串
   */
  static adaptString(str: string, maxLength?: number, platform?: Platform): string {
    const targetPlatform = platform || PlatformDetector.getCurrentPlatform();
    const adapter = STRING_TYPE_ADAPTERS[targetPlatform];
    const limit = maxLength || adapter.maxLength;
    return truncateString(str, limit);
  }

  /**
   * 适配日期时间
   */
  static adaptDateTime(
    timestamp: number | string,
    format?: string,
    platform?: Platform
  ): string {
    const targetPlatform = platform || PlatformDetector.getCurrentPlatform();
    const numTimestamp = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
    return formatDateTime(numTimestamp, targetPlatform, format);
  }

  /**
   * 适配用户ID
   */
  static adaptUserId(
    userId: string | number,
    sourcePlatform?: Platform,
    targetPlatform?: Platform
  ): string {
    const source = sourcePlatform || PlatformDetector.getCurrentPlatform();
    const target = targetPlatform || PlatformDetector.getCurrentPlatform();
    return convertUserId(userId, source, target);
  }

  /**
   * 适配短剧视频格式
   */
  static adaptDramaVideoFormat(
    videoUrl: string,
    sourceFormat: string,
    targetPlatform?: Platform
  ): string {
    const target = targetPlatform || PlatformDetector.getCurrentPlatform();
    return convertDramaVideoFormat(videoUrl, sourceFormat, target);
  }

  /**
   * 适配API响应
   */
  static adaptResponse<T = any>(
    response: any,
    platform?: Platform
  ): UnifiedResponse<T> {
    const targetPlatform = platform || PlatformDetector.getCurrentPlatform();
    return adaptResponse<T>(response, targetPlatform);
  }
}

export { DataAdapter, PlatformDetector };
export type { Platform, UnifiedResponse };
```

### 4. 使用示例

#### 4.1 平台检测示例

```typescript
import { PlatformDetector } from '@/utils/dataAdapter';

// 获取当前平台
const currentPlatform = PlatformDetector.getCurrentPlatform();
console.log('当前平台:', currentPlatform);

// 判断平台类型
if (PlatformDetector.isMiniProgram()) {
  console.log('当前运行在小程序环境');
} else if (PlatformDetector.isApp()) {
  console.log('当前运行在APP环境');
} else if (PlatformDetector.isH5()) {
  console.log('当前运行在H5环境');
}
```

#### 4.2 数据适配示例

```typescript
import { DataAdapter } from '@/utils/dataAdapter';

// 适配数字
const safeNumber = DataAdapter.adaptNumber(12345678901234567890);
console.log('安全数字:', safeNumber);

// 适配星币金额
const starCoinAmount = DataAdapter.adaptStarCoinAmount('100.567');
console.log('星币金额:', starCoinAmount); // 100.57

// 适配字符串
const truncatedString = DataAdapter.adaptString('这是一段很长的文本...', 10);
console.log('截断后的字符串:', truncatedString);

// 适配日期时间
const formattedDateTime = DataAdapter.adaptDateTime(Date.now(), 'YYYY-MM-DD');
console.log('格式化后的日期时间:', formattedDateTime);

// 适配用户ID
const adaptedUserId = DataAdapter.adaptUserId('user12345678901234567890', 'h5', 'wechat');
console.log('适配后的用户ID:', adaptedUserId);

// 适配API响应
const apiResponse = {
  errCode: 0,
  errMsg: 'success',
  data: { name: 'test' },
  requestId: 'req123'
};
const unifiedResponse = DataAdapter.adaptResponse(apiResponse, 'wechat');
console.log('统一响应格式:', unifiedResponse);
```

### 5. 最佳实践

#### 5.1 数据传输建议

**统一数据格式**
- 使用JSON作为数据交换格式
- 统一时间戳格式（毫秒）
- 统一货币单位（星币，保留2位小数）
- 统一日期格式（YYYY-MM-DD HH:mm:ss）

**数据压缩**
- 图片使用WebP格式压缩
- 视频使用H.264编码压缩
- 文本数据使用GZIP压缩
- 大文件分片传输

**数据缓存**
- 使用本地缓存减少网络请求
- 设置合理的缓存过期时间
- 实现缓存更新机制
- 提供缓存清理功能

#### 5.2 性能优化建议

**图片优化**
- 根据屏幕分辨率加载不同尺寸的图片
- 使用懒加载技术
- 实现图片预加载
- 使用CDN加速图片加载

**视频优化**
- 使用自适应码率
- 实现视频预加载
- 支持断点续传
- 使用CDN加速视频加载

**数据加载优化**
- 实现分页加载
- 使用虚拟滚动
- 优化API响应数据结构
- 减少不必要的数据传输

#### 5.3 兼容性处理

**降级处理**
- 对于不支持的功能提供降级方案
- 检测平台能力后选择合适的实现
- 提供功能开关配置
- 记录兼容性问题

**错误处理**
- 统一错误码和错误消息
- 提供友好的错误提示
- 实现错误重试机制
- 记录错误日志

**版本兼容**
- 支持多版本API共存
- 实现平滑升级
- 提供版本迁移工具
- 维护版本兼容性文档

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
