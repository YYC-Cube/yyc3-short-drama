---
@file: 089-YYC3-Short-Drama-类型定义-通用-数据格式校验规则.md
@description: YYC3-Short-Drama 手机号、邮箱、身份证等通用数据格式的校验规则与类型约束
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [类型定义],[通用],[格式校验]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 089-YYC3-Short-Drama-类型定义-通用-数据格式校验规则

## 概述

本文档详细描述YYC3-Short-Drama-类型定义-通用-数据格式校验规则相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范通用-数据格式校验规则相关的业务标准与技术落地要求
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

### 3. 数据格式校验规则

#### 3.1 用户信息校验规则

**手机号校验**

```typescript
/**
 * 手机号校验规则
 * 支持中国大陆手机号
 */
interface PhoneValidationRule {
  pattern: RegExp;
  length: number;
  description: string;
  examples: string[];
  errorMessages: {
    invalid: string;
    required: string;
  };
}

const PHONE_VALIDATION: PhoneValidationRule = {
  pattern: /^1[3-9]\d{9}$/,
  length: 11,
  description: '中国大陆手机号，11位数字，以1开头，第二位为3-9',
  examples: ['13800138000', '15912345678', '18698765432'],
  errorMessages: {
    invalid: '请输入有效的手机号码',
    required: '手机号不能为空'
  }
};

/**
 * 验证手机号
 * @param phone 手机号
 * @returns 是否有效
 */
function validatePhone(phone: string): boolean {
  return PHONE_VALIDATION.pattern.test(phone);
}
```

**邮箱校验**

```typescript
/**
 * 邮箱校验规则
 */
interface EmailValidationRule {
  pattern: RegExp;
  maxLength: number;
  description: string;
  examples: string[];
  errorMessages: {
    invalid: string;
    required: string;
  };
}

const EMAIL_VALIDATION: EmailValidationRule = {
  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  maxLength: 100,
  description: '标准邮箱格式，支持常见邮箱服务商',
  examples: ['user@example.com', 'test.user@domain.cn', 'admin@0379.email'],
  errorMessages: {
    invalid: '请输入有效的邮箱地址',
    required: '邮箱不能为空'
  }
};

/**
 * 验证邮箱
 * @param email 邮箱地址
 * @returns 是否有效
 */
function validateEmail(email: string): boolean {
  return EMAIL_VALIDATION.pattern.test(email) && email.length <= EMAIL_VALIDATION.maxLength;
}
```

**身份证号校验**

```typescript
/**
 * 身份证号校验规则
 */
interface IDCardValidationRule {
  pattern18: RegExp;
  pattern15: RegExp;
  description: string;
  examples: string[];
  errorMessages: {
    invalid: string;
    required: string;
  };
}

const ID_CARD_VALIDATION: IDCardValidationRule = {
  pattern18: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/,
  pattern15: /^[1-9]\d{5}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$/,
  description: '中国大陆居民身份证号，支持15位和18位',
  examples: ['410311199001011234', '410311900101123'],
  errorMessages: {
    invalid: '请输入有效的身份证号',
    required: '身份证号不能为空'
  }
};

/**
 * 验证身份证号
 * @param idCard 身份证号
 * @returns 是否有效
 */
function validateIDCard(idCard: string): boolean {
  if (idCard.length === 18) {
    return ID_CARD_VALIDATION.pattern18.test(idCard);
  } else if (idCard.length === 15) {
    return ID_CARD_VALIDATION.pattern15.test(idCard);
  }
  return false;
}
```

**用户名校验**

```typescript
/**
 * 用户名校验规则
 */
interface UsernameValidationRule {
  pattern: RegExp;
  minLength: number;
  maxLength: number;
  description: string;
  examples: string[];
  errorMessages: {
    invalid: string;
    tooShort: string;
    tooLong: string;
    required: string;
  };
}

const USERNAME_VALIDATION: UsernameValidationRule = {
  pattern: /^[a-zA-Z0-9_]+$/,
  minLength: 3,
  maxLength: 20,
  description: '用户名只能包含字母、数字和下划线',
  examples: ['user_123', 'test_user', 'admin001'],
  errorMessages: {
    invalid: '用户名只能包含字母、数字和下划线',
    tooShort: '用户名长度不能少于3位',
    tooLong: '用户名长度不能超过20位',
    required: '用户名不能为空'
  }
};

/**
 * 验证用户名
 * @param username 用户名
 * @returns 是否有效
 */
function validateUsername(username: string): boolean {
  return USERNAME_VALIDATION.pattern.test(username) &&
         username.length >= USERNAME_VALIDATION.minLength &&
         username.length <= USERNAME_VALIDATION.maxLength;
}
```

**昵称校验**

```typescript
/**
 * 昵称校验规则
 */
interface NicknameValidationRule {
  pattern: RegExp;
  minLength: number;
  maxLength: number;
  description: string;
  examples: string[];
  errorMessages: {
    invalid: string;
    tooShort: string;
    tooLong: string;
    required: string;
  };
}

const NICKNAME_VALIDATION: NicknameValidationRule = {
  pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/,
  minLength: 2,
  maxLength: 30,
  description: '昵称支持中文、字母、数字、下划线和连字符',
  examples: ['河洛文化爱好者', 'User_123', '测试-用户'],
  errorMessages: {
    invalid: '昵称包含非法字符',
    tooShort: '昵称长度不能少于2位',
    tooLong: '昵称长度不能超过30位',
    required: '昵称不能为空'
  }
};

/**
 * 验证昵称
 * @param nickname 昵称
 * @returns 是否有效
 */
function validateNickname(nickname: string): boolean {
  return NICKNAME_VALIDATION.pattern.test(nickname) &&
         nickname.length >= NICKNAME_VALIDATION.minLength &&
         nickname.length <= NICKNAME_VALIDATION.maxLength;
}
```

**密码校验**

```typescript
/**
 * 密码校验规则
 */
interface PasswordValidationRule {
  pattern: RegExp;
  minLength: number;
  maxLength: number;
  description: string;
  requirements: {
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
  examples: string[];
  errorMessages: {
    invalid: string;
    tooShort: string;
    tooLong: string;
    required: string;
  };
}

const PASSWORD_VALIDATION: PasswordValidationRule = {
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
  minLength: 8,
  maxLength: 20,
  description: '密码必须包含大小写字母、数字和特殊字符',
  requirements: {
    uppercase: true,
    lowercase: true,
    number: true,
    special: true
  },
  examples: ['Password123!', 'Test@456', 'Admin#789'],
  errorMessages: {
    invalid: '密码必须包含大小写字母、数字和特殊字符',
    tooShort: '密码长度不能少于8位',
    tooLong: '密码长度不能超过20位',
    required: '密码不能为空'
  }
};

/**
 * 验证密码
 * @param password 密码
 * @returns 是否有效
 */
function validatePassword(password: string): boolean {
  return PASSWORD_VALIDATION.pattern.test(password);
}
```

#### 3.2 内容校验规则

**短剧标题校验**

```typescript
/**
 * 短剧标题校验规则
 */
interface DramaTitleValidationRule {
  pattern: RegExp;
  minLength: number;
  maxLength: number;
  description: string;
  forbiddenWords: string[];
  examples: string[];
  errorMessages: {
    invalid: string;
    tooShort: string;
    tooLong: string;
    containsForbidden: string;
    required: string;
  };
}

const DRAMA_TITLE_VALIDATION: DramaTitleValidationRule = {
  pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\s\-_()（）【】]+$/,
  minLength: 5,
  maxLength: 50,
  description: '短剧标题支持中文、字母、数字和常用标点',
  forbiddenWords: ['违禁词1', '违禁词2', '违禁词3'],
  examples: ['河洛文化传奇', '洛阳古都故事', '龙门石窟传说'],
  errorMessages: {
    invalid: '标题包含非法字符',
    tooShort: '标题长度不能少于5位',
    tooLong: '标题长度不能超过50位',
    containsForbidden: '标题包含违禁词',
    required: '标题不能为空'
  }
};

/**
 * 验证短剧标题
 * @param title 标题
 * @returns 是否有效
 */
function validateDramaTitle(title: string): boolean {
  if (!DRAMA_TITLE_VALIDATION.pattern.test(title)) {
    return false;
  }
  if (title.length < DRAMA_TITLE_VALIDATION.minLength ||
      title.length > DRAMA_TITLE_VALIDATION.maxLength) {
    return false;
  }
  for (const word of DRAMA_TITLE_VALIDATION.forbiddenWords) {
    if (title.includes(word)) {
      return false;
    }
  }
  return true;
}
```

**短剧描述校验**

```typescript
/**
 * 短剧描述校验规则
 */
interface DramaDescriptionValidationRule {
  minLength: number;
  maxLength: number;
  description: string;
  forbiddenWords: string[];
  examples: string[];
  errorMessages: {
    tooShort: string;
    tooLong: string;
    containsForbidden: string;
    required: string;
  };
}

const DRAMA_DESCRIPTION_VALIDATION: DramaDescriptionValidationRule = {
  minLength: 20,
  maxLength: 500,
  description: '短剧描述，20-500个字符',
  forbiddenWords: ['违禁词1', '违禁词2'],
  examples: ['这是一部关于河洛文化的精彩短剧，讲述了...', '本剧以洛阳为背景...'],
  errorMessages: {
    tooShort: '描述长度不能少于20位',
    tooLong: '描述长度不能超过500位',
    containsForbidden: '描述包含违禁词',
    required: '描述不能为空'
  }
};

/**
 * 验证短剧描述
 * @param description 描述
 * @returns 是否有效
 */
function validateDramaDescription(description: string): boolean {
  if (description.length < DRAMA_DESCRIPTION_VALIDATION.minLength ||
      description.length > DRAMA_DESCRIPTION_VALIDATION.maxLength) {
    return false;
  }
  for (const word of DRAMA_DESCRIPTION_VALIDATION.forbiddenWords) {
    if (description.includes(word)) {
      return false;
    }
  }
  return true;
}
```

**评论内容校验**

```typescript
/**
 * 评论内容校验规则
 */
interface CommentValidationRule {
  minLength: number;
  maxLength: number;
  description: string;
  forbiddenWords: string[];
  examples: string[];
  errorMessages: {
    tooShort: string;
    tooLong: string;
    containsForbidden: string;
    required: string;
  };
}

const COMMENT_VALIDATION: CommentValidationRule = {
  minLength: 1,
  maxLength: 500,
  description: '评论内容，1-500个字符',
  forbiddenWords: ['违禁词1', '违禁词2', '违禁词3'],
  examples: ['这部短剧太精彩了！', '河洛文化博大精深', '期待更多作品'],
  errorMessages: {
    tooShort: '评论内容不能为空',
    tooLong: '评论长度不能超过500位',
    containsForbidden: '评论包含违禁词',
    required: '评论不能为空'
  }
};

/**
 * 验证评论内容
 * @param comment 评论内容
 * @returns 是否有效
 */
function validateComment(comment: string): boolean {
  if (comment.length < COMMENT_VALIDATION.minLength ||
      comment.length > COMMENT_VALIDATION.maxLength) {
    return false;
  }
  for (const word of COMMENT_VALIDATION.forbiddenWords) {
    if (comment.includes(word)) {
      return false;
    }
  }
  return true;
}
```

#### 3.3 URL校验规则

**URL校验**

```typescript
/**
 * URL校验规则
 */
interface URLValidationRule {
  pattern: RegExp;
  description: string;
  examples: string[];
  errorMessages: {
    invalid: string;
    required: string;
  };
}

const URL_VALIDATION: URLValidationRule = {
  pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  description: '标准HTTP/HTTPS URL格式',
  examples: ['https://www.example.com', 'http://domain.cn/path', 'https://api.example.com/v1/users'],
  errorMessages: {
    invalid: '请输入有效的URL地址',
    required: 'URL不能为空'
  }
};

/**
 * 验证URL
 * @param url URL地址
 * @returns 是否有效
 */
function validateURL(url: string): boolean {
  return URL_VALIDATION.pattern.test(url);
}
```

#### 3.4 日期时间校验规则

**日期校验**

```typescript
/**
 * 日期校验规则
 */
interface DateValidationRule {
  pattern: RegExp;
  format: string;
  description: string;
  examples: string[];
  errorMessages: {
    invalid: string;
    required: string;
  };
}

const DATE_VALIDATION: DateValidationRule = {
  pattern: /^\d{4}-\d{2}-\d{2}$/,
  format: 'YYYY-MM-DD',
  description: '日期格式，YYYY-MM-DD',
  examples: ['2024-01-01', '2024-12-31', '2025-06-15'],
  errorMessages: {
    invalid: '请输入有效的日期格式(YYYY-MM-DD)',
    required: '日期不能为空'
  }
};

/**
 * 验证日期
 * @param date 日期字符串
 * @returns 是否有效
 */
function validateDate(date: string): boolean {
  if (!DATE_VALIDATION.pattern.test(date)) {
    return false;
  }
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
}
```

**时间校验**

```typescript
/**
 * 时间校验规则
 */
interface TimeValidationRule {
  pattern: RegExp;
  format: string;
  description: string;
  examples: string[];
  errorMessages: {
    invalid: string;
    required: string;
  };
}

const TIME_VALIDATION: TimeValidationRule = {
  pattern: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
  format: 'HH:mm:ss',
  description: '时间格式，HH:mm:ss',
  examples: ['00:00:00', '12:30:45', '23:59:59'],
  errorMessages: {
    invalid: '请输入有效的时间格式(HH:mm:ss)',
    required: '时间不能为空'
  }
};

/**
 * 验证时间
 * @param time 时间字符串
 * @returns 是否有效
 */
function validateTime(time: string): boolean {
  return TIME_VALIDATION.pattern.test(time);
}
```

**日期时间校验**

```typescript
/**
 * 日期时间校验规则
 */
interface DateTimeValidationRule {
  pattern: RegExp;
  format: string;
  description: string;
  examples: string[];
  errorMessages: {
    invalid: string;
    required: string;
  };
}

const DATE_TIME_VALIDATION: DateTimeValidationRule = {
  pattern: /^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d{3})?Z?$/,
  format: 'YYYY-MM-DDTHH:mm:ss.sssZ',
  description: 'ISO 8601日期时间格式',
  examples: ['2024-01-01T00:00:00Z', '2024-12-31T23:59:59.999Z'],
  errorMessages: {
    invalid: '请输入有效的日期时间格式',
    required: '日期时间不能为空'
  }
};

/**
 * 验证日期时间
 * @param dateTime 日期时间字符串
 * @returns 是否有效
 */
function validateDateTime(dateTime: string): boolean {
  if (!DATE_TIME_VALIDATION.pattern.test(dateTime)) {
    return false;
  }
  const dateTimeObj = new Date(dateTime);
  return !isNaN(dateTimeObj.getTime());
}
```

#### 3.5 文件上传校验规则

**图片文件校验**

```typescript
/**
 * 图片文件校验规则
 */
interface ImageFileValidationRule {
  allowedTypes: string[];
  maxSize: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  description: string;
  errorMessages: {
    invalidType: string;
    tooLarge: string;
    invalidSize: string;
    required: string;
  };
}

const IMAGE_FILE_VALIDATION: ImageFileValidationRule = {
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  maxSize: 5 * 1024 * 1024, // 5MB
  minWidth: 100,
  minHeight: 100,
  maxWidth: 4096,
  maxHeight: 4096,
  description: '支持JPG、PNG、GIF、WebP、SVG格式，最大5MB',
  errorMessages: {
    invalidType: '仅支持JPG、PNG、GIF、WebP、SVG格式的图片',
    tooLarge: '图片大小不能超过5MB',
    invalidSize: '图片尺寸必须在100x100到4096x4096之间',
    required: '请选择图片文件'
  }
};

/**
 * 验证图片文件
 * @param file 文件对象
 * @returns 是否有效
 */
async function validateImageFile(file: File): Promise<boolean> {
  if (!IMAGE_FILE_VALIDATION.allowedTypes.includes(file.type)) {
    return false;
  }
  if (file.size > IMAGE_FILE_VALIDATION.maxSize) {
    return false;
  }
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const validSize = width >= (IMAGE_FILE_VALIDATION.minWidth || 0) &&
                       height >= (IMAGE_FILE_VALIDATION.minHeight || 0) &&
                       width <= (IMAGE_FILE_VALIDATION.maxWidth || Infinity) &&
                       height <= (IMAGE_FILE_VALIDATION.maxHeight || Infinity);
      resolve(validSize);
    };
    img.onerror = () => resolve(false);
    img.src = URL.createObjectURL(file);
  });
}
```

**视频文件校验**

```typescript
/**
 * 视频文件校验规则
 */
interface VideoFileValidationRule {
  allowedTypes: string[];
  maxSize: number;
  minDuration?: number;
  maxDuration?: number;
  description: string;
  errorMessages: {
    invalidType: string;
    tooLarge: string;
    invalidDuration: string;
    required: string;
  };
}

const VIDEO_FILE_VALIDATION: VideoFileValidationRule = {
  allowedTypes: ['video/mp4', 'video/webm', 'video/ogg'],
  maxSize: 100 * 1024 * 1024, // 100MB
  minDuration: 30, // 30秒
  maxDuration: 600, // 10分钟
  description: '支持MP4、WebM、OGG格式，最大100MB，时长30秒-10分钟',
  errorMessages: {
    invalidType: '仅支持MP4、WebM、OGG格式的视频',
    tooLarge: '视频大小不能超过100MB',
    invalidDuration: '视频时长必须在30秒到10分钟之间',
    required: '请选择视频文件'
  }
};

/**
 * 验证视频文件
 * @param file 文件对象
 * @returns 是否有效
 */
async function validateVideoFile(file: File): Promise<boolean> {
  if (!VIDEO_FILE_VALIDATION.allowedTypes.includes(file.type)) {
    return false;
  }
  if (file.size > VIDEO_FILE_VALIDATION.maxSize) {
    return false;
  }
  
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.onloadedmetadata = () => {
      const duration = video.duration;
      const validDuration = duration >= (VIDEO_FILE_VALIDATION.minDuration || 0) &&
                           duration <= (VIDEO_FILE_VALIDATION.maxDuration || Infinity);
      resolve(validDuration);
    };
    video.onerror = () => resolve(false);
    video.src = URL.createObjectURL(file);
  });
}
```

**文档文件校验**

```typescript
/**
 * 文档文件校验规则
 */
interface DocumentFileValidationRule {
  allowedTypes: string[];
  maxSize: number;
  description: string;
  errorMessages: {
    invalidType: string;
    tooLarge: string;
    required: string;
  };
}

const DOCUMENT_FILE_VALIDATION: DocumentFileValidationRule = {
  allowedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ],
  maxSize: 10 * 1024 * 1024, // 10MB
  description: '支持PDF、Word、Excel、PowerPoint格式，最大10MB',
  errorMessages: {
    invalidType: '仅支持PDF、Word、Excel、PowerPoint格式的文档',
    tooLarge: '文档大小不能超过10MB',
    required: '请选择文档文件'
  }
};

/**
 * 验证文档文件
 * @param file 文件对象
 * @returns 是否有效
 */
function validateDocumentFile(file: File): boolean {
  if (!DOCUMENT_FILE_VALIDATION.allowedTypes.includes(file.type)) {
    return false;
  }
  if (file.size > DOCUMENT_FILE_VALIDATION.maxSize) {
    return false;
  }
  return true;
}
```

#### 3.6 业务数据校验规则

**星币金额校验**

```typescript
/**
 * 星币金额校验规则
 */
interface StarCoinValidationRule {
  pattern: RegExp;
  minAmount: number;
  maxAmount: number;
  decimalPlaces: number;
  description: string;
  examples: string[];
  errorMessages: {
    invalid: string;
    tooSmall: string;
    tooLarge: string;
    required: string;
  };
}

const STAR_COIN_VALIDATION: StarCoinValidationRule = {
  pattern: /^\d+(\.\d{1,2})?$/,
  minAmount: 0.01,
  maxAmount: 1000000,
  decimalPlaces: 2,
  description: '星币金额，支持两位小数',
  examples: ['10', '10.5', '100.99'],
  errorMessages: {
    invalid: '请输入有效的星币金额',
    tooSmall: '星币金额不能少于0.01',
    tooLarge: '星币金额不能超过1000000',
    required: '星币金额不能为空'
  }
};

/**
 * 验证星币金额
 * @param amount 金额
 * @returns 是否有效
 */
function validateStarCoinAmount(amount: number | string): boolean {
  const amountStr = typeof amount === 'number' ? amount.toString() : amount;
  if (!STAR_COIN_VALIDATION.pattern.test(amountStr)) {
    return false;
  }
  const amountNum = parseFloat(amountStr);
  return amountNum >= STAR_COIN_VALIDATION.minAmount &&
         amountNum <= STAR_COIN_VALIDATION.maxAmount;
}
```

**标签校验**

```typescript
/**
 * 标签校验规则
 */
interface TagValidationRule {
  pattern: RegExp;
  maxLength: number;
  maxCount: number;
  description: string;
  forbiddenWords: string[];
  examples: string[];
  errorMessages: {
    invalid: string;
    tooLong: string;
    tooMany: string;
    containsForbidden: string;
    required: string;
  };
}

const TAG_VALIDATION: TagValidationRule = {
  pattern: /^[\u4e00-\u9fa5a-zA-Z0-9\-_]+$/,
  maxLength: 20,
  maxCount: 10,
  description: '标签支持中文、字母、数字、连字符和下划线',
  forbiddenWords: ['违禁词1', '违禁词2'],
  examples: ['河洛文化', '洛阳', '龙门石窟', '传统文化'],
  errorMessages: {
    invalid: '标签包含非法字符',
    tooLong: '单个标签长度不能超过20位',
    tooMany: '标签数量不能超过10个',
    containsForbidden: '标签包含违禁词',
    required: '标签不能为空'
  }
};

/**
 * 验证标签
 * @param tags 标签数组
 * @returns 是否有效
 */
function validateTags(tags: string[]): boolean {
  if (tags.length > TAG_VALIDATION.maxCount) {
    return false;
  }
  for (const tag of tags) {
    if (!TAG_VALIDATION.pattern.test(tag)) {
      return false;
    }
    if (tag.length > TAG_VALIDATION.maxLength) {
      return false;
    }
    for (const word of TAG_VALIDATION.forbiddenWords) {
      if (tag.includes(word)) {
        return false;
      }
    }
  }
  return true;
}
```

#### 3.7 综合校验工具

**校验结果类型**

```typescript
/**
 * 校验结果类型
 */
interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings?: string[];
}

/**
 * 综合校验工具类
 */
class Validator {
  /**
   * 验证手机号
   */
  static phone(phone: string): ValidationResult {
    const result: ValidationResult = { valid: true, errors: [] };
    if (!phone) {
      result.valid = false;
      result.errors.push(PHONE_VALIDATION.errorMessages.required);
      return result;
    }
    if (!validatePhone(phone)) {
      result.valid = false;
      result.errors.push(PHONE_VALIDATION.errorMessages.invalid);
    }
    return result;
  }

  /**
   * 验证邮箱
   */
  static email(email: string): ValidationResult {
    const result: ValidationResult = { valid: true, errors: [] };
    if (!email) {
      result.valid = false;
      result.errors.push(EMAIL_VALIDATION.errorMessages.required);
      return result;
    }
    if (!validateEmail(email)) {
      result.valid = false;
      result.errors.push(EMAIL_VALIDATION.errorMessages.invalid);
    }
    return result;
  }

  /**
   * 验证身份证号
   */
  static idCard(idCard: string): ValidationResult {
    const result: ValidationResult = { valid: true, errors: [] };
    if (!idCard) {
      result.valid = false;
      result.errors.push(ID_CARD_VALIDATION.errorMessages.required);
      return result;
    }
    if (!validateIDCard(idCard)) {
      result.valid = false;
      result.errors.push(ID_CARD_VALIDATION.errorMessages.invalid);
    }
    return result;
  }

  /**
   * 验证用户名
   */
  static username(username: string): ValidationResult {
    const result: ValidationResult = { valid: true, errors: [] };
    if (!username) {
      result.valid = false;
      result.errors.push(USERNAME_VALIDATION.errorMessages.required);
      return result;
    }
    if (username.length < USERNAME_VALIDATION.minLength) {
      result.valid = false;
      result.errors.push(USERNAME_VALIDATION.errorMessages.tooShort);
    }
    if (username.length > USERNAME_VALIDATION.maxLength) {
      result.valid = false;
      result.errors.push(USERNAME_VALIDATION.errorMessages.tooLong);
    }
    if (!USERNAME_VALIDATION.pattern.test(username)) {
      result.valid = false;
      result.errors.push(USERNAME_VALIDATION.errorMessages.invalid);
    }
    return result;
  }

  /**
   * 验证密码
   */
  static password(password: string): ValidationResult {
    const result: ValidationResult = { valid: true, errors: [] };
    if (!password) {
      result.valid = false;
      result.errors.push(PASSWORD_VALIDATION.errorMessages.required);
      return result;
    }
    if (password.length < PASSWORD_VALIDATION.minLength) {
      result.valid = false;
      result.errors.push(PASSWORD_VALIDATION.errorMessages.tooShort);
    }
    if (password.length > PASSWORD_VALIDATION.maxLength) {
      result.valid = false;
      result.errors.push(PASSWORD_VALIDATION.errorMessages.tooLong);
    }
    if (!PASSWORD_VALIDATION.pattern.test(password)) {
      result.valid = false;
      result.errors.push(PASSWORD_VALIDATION.errorMessages.invalid);
    }
    return result;
  }

  /**
   * 验证URL
   */
  static url(url: string): ValidationResult {
    const result: ValidationResult = { valid: true, errors: [] };
    if (!url) {
      result.valid = false;
      result.errors.push(URL_VALIDATION.errorMessages.required);
      return result;
    }
    if (!validateURL(url)) {
      result.valid = false;
      result.errors.push(URL_VALIDATION.errorMessages.invalid);
    }
    return result;
  }

  /**
   * 验证日期
   */
  static date(date: string): ValidationResult {
    const result: ValidationResult = { valid: true, errors: [] };
    if (!date) {
      result.valid = false;
      result.errors.push(DATE_VALIDATION.errorMessages.required);
      return result;
    }
    if (!validateDate(date)) {
      result.valid = false;
      result.errors.push(DATE_VALIDATION.errorMessages.invalid);
    }
    return result;
  }

  /**
   * 验证图片文件
   */
  static async imageFile(file: File): Promise<ValidationResult> {
    const result: ValidationResult = { valid: true, errors: [] };
    if (!file) {
      result.valid = false;
      result.errors.push(IMAGE_FILE_VALIDATION.errorMessages.required);
      return result;
    }
    if (!IMAGE_FILE_VALIDATION.allowedTypes.includes(file.type)) {
      result.valid = false;
      result.errors.push(IMAGE_FILE_VALIDATION.errorMessages.invalidType);
    }
    if (file.size > IMAGE_FILE_VALIDATION.maxSize) {
      result.valid = false;
      result.errors.push(IMAGE_FILE_VALIDATION.errorMessages.tooLarge);
    }
    const validSize = await validateImageFile(file);
    if (!validSize) {
      result.valid = false;
      result.errors.push(IMAGE_FILE_VALIDATION.errorMessages.invalidSize);
    }
    return result;
  }

  /**
   * 验证视频文件
   */
  static async videoFile(file: File): Promise<ValidationResult> {
    const result: ValidationResult = { valid: true, errors: [] };
    if (!file) {
      result.valid = false;
      result.errors.push(VIDEO_FILE_VALIDATION.errorMessages.required);
      return result;
    }
    if (!VIDEO_FILE_VALIDATION.allowedTypes.includes(file.type)) {
      result.valid = false;
      result.errors.push(VIDEO_FILE_VALIDATION.errorMessages.invalidType);
    }
    if (file.size > VIDEO_FILE_VALIDATION.maxSize) {
      result.valid = false;
      result.errors.push(VIDEO_FILE_VALIDATION.errorMessages.tooLarge);
    }
    const validDuration = await validateVideoFile(file);
    if (!validDuration) {
      result.valid = false;
      result.errors.push(VIDEO_FILE_VALIDATION.errorMessages.invalidDuration);
    }
    return result;
  }

  /**
   * 验证星币金额
   */
  static starCoinAmount(amount: number | string): ValidationResult {
    const result: ValidationResult = { valid: true, errors: [] };
    if (amount === null || amount === undefined || amount === '') {
      result.valid = false;
      result.errors.push(STAR_COIN_VALIDATION.errorMessages.required);
      return result;
    }
    if (!validateStarCoinAmount(amount)) {
      result.valid = false;
      result.errors.push(STAR_COIN_VALIDATION.errorMessages.invalid);
    }
    const amountNum = typeof amount === 'number' ? amount : parseFloat(amount);
    if (amountNum < STAR_COIN_VALIDATION.minAmount) {
      result.valid = false;
      result.errors.push(STAR_COIN_VALIDATION.errorMessages.tooSmall);
    }
    if (amountNum > STAR_COIN_VALIDATION.maxAmount) {
      result.valid = false;
      result.errors.push(STAR_COIN_VALIDATION.errorMessages.tooLarge);
    }
    return result;
  }

  /**
   * 验证标签
   */
  static tags(tags: string[]): ValidationResult {
    const result: ValidationResult = { valid: true, errors: [] };
    if (!tags || tags.length === 0) {
      result.valid = false;
      result.errors.push(TAG_VALIDATION.errorMessages.required);
      return result;
    }
    if (!validateTags(tags)) {
      result.valid = false;
      if (tags.length > TAG_VALIDATION.maxCount) {
        result.errors.push(TAG_VALIDATION.errorMessages.tooMany);
      }
      for (const tag of tags) {
        if (!TAG_VALIDATION.pattern.test(tag)) {
          result.errors.push(TAG_VALIDATION.errorMessages.invalid);
          break;
        }
        if (tag.length > TAG_VALIDATION.maxLength) {
          result.errors.push(TAG_VALIDATION.errorMessages.tooLong);
          break;
        }
        for (const word of TAG_VALIDATION.forbiddenWords) {
          if (tag.includes(word)) {
            result.errors.push(TAG_VALIDATION.errorMessages.containsForbidden);
            break;
          }
        }
      }
    }
    return result;
  }
}

export { Validator };
export type { ValidationResult };
```

### 4. 使用示例

#### 4.1 前端使用示例

```typescript
import { Validator } from '@/utils/validator';

// 验证用户注册表单
async function validateUserRegisterForm(formData: {
  username: string;
  password: string;
  email: string;
  phone: string;
}): Promise<boolean> {
  const usernameResult = Validator.username(formData.username);
  if (!usernameResult.valid) {
    console.error('用户名验证失败:', usernameResult.errors);
    return false;
  }

  const passwordResult = Validator.password(formData.password);
  if (!passwordResult.valid) {
    console.error('密码验证失败:', passwordResult.errors);
    return false;
  }

  const emailResult = Validator.email(formData.email);
  if (!emailResult.valid) {
    console.error('邮箱验证失败:', emailResult.errors);
    return false;
  }

  const phoneResult = Validator.phone(formData.phone);
  if (!phoneResult.valid) {
    console.error('手机号验证失败:', phoneResult.errors);
    return false;
  }

  return true;
}

// 验证文件上传
async function validateFileUpload(file: File, type: 'image' | 'video' | 'document'): Promise<boolean> {
  if (type === 'image') {
    const result = await Validator.imageFile(file);
    if (!result.valid) {
      console.error('图片验证失败:', result.errors);
      return false;
    }
  } else if (type === 'video') {
    const result = await Validator.videoFile(file);
    if (!result.valid) {
      console.error('视频验证失败:', result.errors);
      return false;
    }
  } else if (type === 'document') {
    const result = validateDocumentFile(file);
    if (!result) {
      console.error('文档验证失败');
      return false;
    }
  }
  return true;
}
```

#### 4.2 后端使用示例

```java
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.constraints.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @Valid @RequestBody UserRegisterRequest request) {
        // Spring Validation会自动校验
        // 如果校验失败，会返回400错误
        return ResponseEntity.ok("注册成功");
    }
}

// 请求DTO
public class UserRegisterRequest {
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 20, message = "用户名长度必须在3-20之间")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "用户名只能包含字母、数字和下划线")
    private String username;

    @NotBlank(message = "密码不能为空")
    @Size(min = 8, max = 20, message = "密码长度必须在8-20之间")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$",
             message = "密码必须包含大小写字母、数字和特殊字符")
    private String password;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "请输入有效的邮箱地址")
    @Size(max = 100, message = "邮箱长度不能超过100")
    private String email;

    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "请输入有效的手机号码")
    private String phone;

    // getters and setters
}
```

### 5. 校验规则维护

#### 5.1 新增校验规则

**新增流程**
1. 确定校验规则类型和需求
2. 定义校验规则接口
3. 实现校验逻辑
4. 添加错误消息
5. 更新Validator工具类
6. 编写单元测试
7. 更新本文档

#### 5.2 修改校验规则

**修改流程**
1. 评估修改影响范围
2. 更新校验规则定义
3. 更新相关代码
4. 更新单元测试
5. 更新本文档
6. 进行回归测试

#### 5.3 废弃校验规则

**废弃流程**
1. 标记为废弃（DEPRECATED）
2. 添加废弃说明
3. 提供替代方案
4. 逐步替换使用
5. 最终删除

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
