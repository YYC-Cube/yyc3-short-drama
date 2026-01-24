---
@file: 081-YYC3-Short-Drama-类型定义-后端-Java实体DTO定义文档.md
@description: YYC3-Short-Drama 后端Java实体DTO的字段、类型、校验规则的完整定义
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [类型定义],[后端],[JavaDTO]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 081-YYC3-Short-Drama-类型定义-后端-Java实体DTO定义文档

## 概述

本文档详细描述YYC3-Short-Drama-类型定义-后端-Java实体DTO定义文档相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范后端-Java实体DTO定义文档相关的业务标准与技术落地要求
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

### 3. 后端-Java实体DTO定义文档

#### 3.1 用户相关DTO

##### 3.1.1 用户注册DTO

```java
@Data
public class UserRegisterDTO {
    @NotBlank(message = "手机号或邮箱不能为空")
    @Pattern(regexp = "^(1[3-9]\\d{9}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})$", 
             message = "手机号或邮箱格式不正确")
    private String authKey;
    
    @NotBlank(message = "认证类型不能为空")
    private AuthType authType;
    
    @NotBlank(message = "密码不能为空")
    @Size(min = 8, max = 20, message = "密码长度必须在8-20位之间")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$",
             message = "密码必须包含大小写字母和数字")
    private String password;
    
    @NotBlank(message = "昵称不能为空")
    @Size(min = 2, max = 50, message = "昵称长度必须在2-50位之间")
    private String nickname;
    
    @NotBlank(message = "验证码不能为空")
    @Size(min = 6, max = 6, message = "验证码必须为6位数字")
    private String verificationCode;
}
```

##### 3.1.2 用户登录DTO

```java
@Data
public class UserLoginDTO {
    @NotBlank(message = "认证类型不能为空")
    private AuthType authType;
    
    private String phone;
    
    private String email;
    
    private String password;
    
    private String verificationCode;
    
    private String openId;
    
    private String accessToken;
}
```

##### 3.1.3 用户更新DTO

```java
@Data
public class UserUpdateDTO {
    @Size(min = 2, max = 50, message = "昵称长度必须在2-50位之间")
    private String nickname;
    
    @Pattern(regexp = "^https?://.+", message = "头像URL格式不正确")
    private String avatar;
    
    @Size(max = 500, message = "个人简介不能超过500字")
    private String bio;
    
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;
    
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", 
             message = "邮箱格式不正确")
    private String email;
}
```

##### 3.1.4 用户信息DTO

```java
@Data
public class UserDTO {
    private String userId;
    private String phone;
    private String email;
    private String nickname;
    private String avatar;
    private String bio;
    private UserRole role;
    private UserStatus status;
    private Integer starValue;
    private Integer starLevel;
    private Long lastLoginAt;
    private Long createdAt;
    private Long updatedAt;
}
```

#### 3.2 短剧相关DTO

##### 3.2.1 短剧创建DTO

```java
@Data
public class DramaCreateDTO {
    @NotBlank(message = "标题不能为空")
    @Size(min = 1, max = 100, message = "标题长度必须在1-100位之间")
    private String title;
    
    @Size(max = 1000, message = "描述不能超过1000字")
    private String description;
    
    @NotBlank(message = "封面图片不能为空")
    @Pattern(regexp = "^https?://.+", message = "封面图片URL格式不正确")
    private String coverImage;
    
    @NotBlank(message = "视频地址不能为空")
    @Pattern(regexp = "^https?://.+", message = "视频地址URL格式不正确")
    private String videoUrl;
    
    @NotNull(message = "视频时长不能为空")
    @Min(value = 1, message = "视频时长必须大于0秒")
    @Max(value = 3600, message = "视频时长不能超过3600秒")
    private Integer duration;
    
    @NotBlank(message = "分类ID不能为空")
    private String categoryId;
    
    private List<String> tags;
    
    @NotNull(message = "是否AI生成不能为空")
    private Boolean isAiGenerated;
    
    private String aiModel;
    
    @DecimalMin(value = "0.00", message = "星值价格不能为负数")
    @DecimalMax(value = "9999.99", message = "星值价格不能超过9999.99")
    private BigDecimal starPrice;
}
```

##### 3.2.2 短剧更新DTO

```java
@Data
public class DramaUpdateDTO {
    @NotBlank(message = "短剧ID不能为空")
    private String dramaId;
    
    @Size(min = 1, max = 100, message = "标题长度必须在1-100位之间")
    private String title;
    
    @Size(max = 1000, message = "描述不能超过1000字")
    private String description;
    
    @Pattern(regexp = "^https?://.+", message = "封面图片URL格式不正确")
    private String coverImage;
    
    @Pattern(regexp = "^https?://.+", message = "视频地址URL格式不正确")
    private String videoUrl;
    
    @Min(value = 1, message = "视频时长必须大于0秒")
    @Max(value = 3600, message = "视频时长不能超过3600秒")
    private Integer duration;
    
    private String categoryId;
    
    private List<String> tags;
    
    @DecimalMin(value = "0.00", message = "星值价格不能为负数")
    @DecimalMax(value = "9999.99", message = "星值价格不能超过9999.99")
    private BigDecimal starPrice;
}
```

##### 3.2.3 短剧查询DTO

```java
@Data
public class DramaQueryDTO {
    private String categoryId;
    
    private DramaStatus status;
    
    private String creatorId;
    
    private Boolean isAiGenerated;
    
    private List<String> tags;
    
    private String keyword;
    
    private Integer page = 1;
    
    private Integer pageSize = 20;
    
    private String sortBy = "createdAt";
    
    private String sortOrder = "desc";
}
```

##### 3.2.4 短剧详情DTO

```java
@Data
public class DramaDetailDTO extends DramaDTO {
    private Boolean isLiked;
    private Boolean isFavorited;
    private Boolean isPurchased;
    private List<DramaDTO> relatedDramas;
    private CreatorDTO creatorProfile;
}
```

##### 3.2.5 短剧信息DTO

```java
@Data
public class DramaDTO {
    private String dramaId;
    private String creatorId;
    private String title;
    private String description;
    private String coverImage;
    private String videoUrl;
    private Integer duration;
    private String categoryId;
    private List<String> tags;
    private DramaStatus status;
    private Boolean isAiGenerated;
    private String aiModel;
    private Long viewCount;
    private Integer likeCount;
    private Integer commentCount;
    private Integer shareCount;
    private BigDecimal starPrice;
    private BigDecimal totalEarnings;
    private Long publishedAt;
    private Long createdAt;
    private Long updatedAt;
}
```

#### 3.3 剧集相关DTO

##### 3.3.1 剧集创建DTO

```java
@Data
public class EpisodeCreateDTO {
    @NotBlank(message = "短剧ID不能为空")
    private String dramaId;
    
    @NotNull(message = "集数不能为空")
    @Min(value = 1, message = "集数必须大于0")
    private Integer episodeNumber;
    
    @Size(max = 100, message = "集标题不能超过100字")
    private String title;
    
    @Size(max = 1000, message = "集描述不能超过1000字")
    private String description;
    
    @Pattern(regexp = "^https?://.+", message = "封面图片URL格式不正确")
    private String coverImage;
    
    @NotBlank(message = "视频地址不能为空")
    @Pattern(regexp = "^https?://.+", message = "视频地址URL格式不正确")
    private String videoUrl;
    
    @NotNull(message = "视频时长不能为空")
    @Min(value = 1, message = "视频时长必须大于0秒")
    @Max(value = 3600, message = "视频时长不能超过3600秒")
    private Integer duration;
    
    @NotNull(message = "是否免费不能为空")
    private Boolean isFree;
    
    @DecimalMin(value = "0.00", message = "星值价格不能为负数")
    @DecimalMax(value = "9999.99", message = "星值价格不能超过9999.99")
    private BigDecimal starPrice;
}
```

##### 3.3.2 剧集信息DTO

```java
@Data
public class EpisodeDTO {
    private String episodeId;
    private String dramaId;
    private Integer episodeNumber;
    private String title;
    private String description;
    private String coverImage;
    private String videoUrl;
    private Integer duration;
    private Boolean isFree;
    private BigDecimal starPrice;
    private Long viewCount;
    private Long createdAt;
    private Long updatedAt;
}
```

#### 3.4 互动相关DTO

##### 3.4.1 点赞DTO

```java
@Data
public class LikeDTO {
    @NotBlank(message = "目标类型不能为空")
    private TargetType targetType;
    
    @NotBlank(message = "目标ID不能为空")
    private String targetId;
}
```

##### 3.4.2 评论创建DTO

```java
@Data
public class CommentCreateDTO {
    @NotBlank(message = "目标类型不能为空")
    private TargetType targetType;
    
    @NotBlank(message = "目标ID不能为空")
    private String targetId;
    
    private String parentId;
    
    @NotBlank(message = "评论内容不能为空")
    @Size(min = 1, max = 1000, message = "评论内容长度必须在1-1000位之间")
    private String content;
}
```

##### 3.4.3 评论查询DTO

```java
@Data
public class CommentQueryDTO {
    @NotBlank(message = "目标类型不能为空")
    private TargetType targetType;
    
    @NotBlank(message = "目标ID不能为空")
    private String targetId;
    
    private String parentId;
    
    private Integer page = 1;
    
    private Integer pageSize = 20;
}
```

##### 3.4.4 评论信息DTO

```java
@Data
public class CommentDTO {
    private String commentId;
    private String userId;
    private TargetType targetType;
    private String targetId;
    private String parentId;
    private String content;
    private Integer likeCount;
    private UserStatus status;
    private UserDTO user;
    private List<CommentDTO> replies;
    private Long createdAt;
    private Long updatedAt;
}
```

##### 3.4.5 收藏DTO

```java
@Data
public class FavoriteDTO {
    @NotBlank(message = "目标类型不能为空")
    private TargetType targetType;
    
    @NotBlank(message = "目标ID不能为空")
    private String targetId;
}
```

#### 3.5 订单与支付相关DTO

##### 3.5.1 星值充值DTO

```java
@Data
public class StarRechargeDTO {
    @NotNull(message = "充值金额不能为空")
    @DecimalMin(value = "1.00", message = "充值金额不能小于1元")
    @DecimalMax(value = "99999.99", message = "充值金额不能超过99999.99元")
    private BigDecimal amount;
    
    @NotBlank(message = "支付方式不能为空")
    private PaymentMethod paymentMethod;
}
```

##### 3.5.2 剧集购买DTO

```java
@Data
public class EpisodePurchaseDTO {
    @NotBlank(message = "剧集ID不能为空")
    private String episodeId;
    
    private PaymentMethod paymentMethod;
}
```

##### 3.5.3 VIP会员购买DTO

```java
@Data
public class VipPurchaseDTO {
    @NotBlank(message = "会员类型不能为空")
    private MembershipType membershipType;
    
    private PaymentMethod paymentMethod;
}
```

##### 3.5.4 订单信息DTO

```java
@Data
public class OrderDTO {
    private String orderId;
    private String userId;
    private OrderType orderType;
    private String targetId;
    private BigDecimal amount;
    private Integer starAmount;
    private OrderStatus status;
    private PaymentMethod paymentMethod;
    private String paymentId;
    private Long paidAt;
    private Long createdAt;
    private Long updatedAt;
}
```

#### 3.6 创作者相关DTO

##### 3.6.1 创作者认证DTO

```java
@Data
public class CreatorVerifyDTO {
    @NotBlank(message = "真实姓名不能为空")
    @Size(min = 2, max = 50, message = "真实姓名长度必须在2-50位之间")
    private String realName;
    
    @NotBlank(message = "身份证号不能为空")
    @Pattern(regexp = "^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
             message = "身份证号格式不正确")
    private String idCard;
    
    @NotBlank(message = "身份证正面不能为空")
    @Pattern(regexp = "^https?://.+", message = "身份证正面URL格式不正确")
    private String idCardFront;
    
    @NotBlank(message = "身份证背面不能为空")
    @Pattern(regexp = "^https?://.+", message = "身份证背面URL格式不正确")
    private String idCardBack;
    
    @Pattern(regexp = "^https?://.+", message = "营业执照URL格式不正确")
    private String businessLicense;
}
```

##### 3.6.2 创作者信息DTO

```java
@Data
public class CreatorDTO {
    private String creatorId;
    private String userId;
    private String realName;
    private VerificationStatus verificationStatus;
    private Long verificationTime;
    private String rejectReason;
    private Long totalPlays;
    private BigDecimal totalEarnings;
    private Long createdAt;
    private Long updatedAt;
}
```

##### 3.6.3 创作者详情DTO

```java
@Data
public class CreatorDetailDTO extends CreatorDTO {
    private UserDTO user;
    private Integer dramaCount;
    private Integer followerCount;
    private List<DramaDTO> recentDramas;
}
```

#### 3.7 文化资源相关DTO

##### 3.7.1 文化资源创建DTO

```java
@Data
public class CulturalResourceCreateDTO {
    @NotBlank(message = "资源类型不能为空")
    private ResourceType resourceType;
    
    @NotBlank(message = "资源标题不能为空")
    @Size(min = 1, max = 100, message = "资源标题长度必须在1-100位之间")
    private String title;
    
    @Size(max = 1000, message = "资源描述不能超过1000字")
    private String description;
    
    @Pattern(regexp = "^https?://.+", message = "封面图片URL格式不正确")
    private String coverImage;
    
    private String content;
    
    private List<String> tags;
    
    private String location;
    
    @Size(max = 50, message = "历史时期不能超过50字")
    private String era;
}
```

##### 3.7.2 文化资源查询DTO

```java
@Data
public class CulturalResourceQueryDTO {
    private ResourceType resourceType;
    
    private String era;
    
    private String location;
    
    private String keyword;
    
    private Integer page = 1;
    
    private Integer pageSize = 20;
}
```

##### 3.7.3 文化资源信息DTO

```java
@Data
public class CulturalResourceDTO {
    private String resourceId;
    private ResourceType resourceType;
    private String title;
    private String description;
    private String coverImage;
    private String content;
    private List<String> tags;
    private String location;
    private String era;
    private CategoryStatus status;
    private Long viewCount;
    private Integer usageCount;
    private Long createdAt;
    private Long updatedAt;
}
```

#### 3.8 反馈相关DTO

##### 3.8.1 反馈创建DTO

```java
@Data
public class FeedbackCreateDTO {
    @NotBlank(message = "反馈类型不能为空")
    private FeedbackType feedbackType;
    
    @NotBlank(message = "反馈标题不能为空")
    @Size(min = 1, max = 100, message = "反馈标题长度必须在1-100位之间")
    private String title;
    
    @NotBlank(message = "反馈内容不能为空")
    @Size(min = 1, max = 2000, message = "反馈内容长度必须在1-2000位之间")
    private String content;
    
    @Size(max = 9, message = "最多上传9张图片")
    private List<String> images;
}
```

##### 3.8.2 反馈信息DTO

```java
@Data
public class FeedbackDTO {
    private String feedbackId;
    private String userId;
    private FeedbackType feedbackType;
    private String title;
    private String content;
    private List<String> images;
    private FeedbackStatus status;
    private String reply;
    private Long repliedAt;
    private Long createdAt;
    private Long updatedAt;
}
```

#### 3.9 AI生成相关DTO

##### 3.9.1 剧本生成DTO

```java
@Data
public class ScriptGenerateDTO {
    @NotBlank(message = "提示词不能为空")
    @Size(min = 10, max = 1000, message = "提示词长度必须在10-1000位之间")
    private String prompt;
    
    @Size(max = 50, message = "风格不能超过50字")
    private String style;
    
    @Min(value = 1, message = "时长必须大于0分钟")
    @Max(value = 60, message = "时长不能超过60分钟")
    private Integer duration;
    
    @Size(max = 10, message = "角色数量不能超过10个")
    private List<String> characters;
    
    @Size(max = 200, message = "场景不能超过200字")
    private String setting;
}
```

##### 3.9.2 图片生成DTO

```java
@Data
public class ImageGenerateDTO {
    @NotBlank(message = "提示词不能为空")
    @Size(min = 10, max = 1000, message = "提示词长度必须在10-1000位之间")
    private String prompt;
    
    @Size(max = 50, message = "风格不能超过50字")
    private String style;
    
    @Pattern(regexp = "^256x256$|^512x512$|^1024x1024$", message = "图片尺寸格式不正确")
    private String size;
    
    @Min(value = 1, message = "生成数量必须大于0")
    @Max(value = 4, message = "生成数量不能超过4张")
    private Integer count = 1;
}
```

##### 3.9.3 视频生成DTO

```java
@Data
public class VideoGenerateDTO {
    @NotBlank(message = "剧本不能为空")
    @Size(min = 100, max = 10000, message = "剧本长度必须在100-10000位之间")
    private String script;
    
    @Size(max = 50, message = "风格不能超过50字")
    private String style;
    
    @Min(value = 1, message = "时长必须大于0秒")
    @Max(value = 600, message = "时长不能超过600秒")
    private Integer duration;
    
    @Pattern(regexp = "^720p$|^1080p$|^4k$", message = "分辨率格式不正确")
    private String resolution;
}
```

##### 3.9.4 AI生成响应DTO

```java
@Data
public class AiGenerateResponseDTO {
    private String taskId;
    private GenerationStatus status;
    private String url;
    private String content;
    private String thumbnail;
    private Integer progress;
    private Long estimatedTime;
}
```

#### 3.10 搜索相关DTO

##### 3.10.1 搜索请求DTO

```java
@Data
public class SearchRequestDTO {
    @NotBlank(message = "关键词不能为空")
    @Size(min = 1, max = 100, message = "关键词长度必须在1-100位之间")
    private String keyword;
    
    private String searchType = "all";
    
    private String categoryId;
    
    private ResourceType resourceType;
    
    private String startDate;
    
    private String endDate;
    
    private Integer page = 1;
    
    private Integer pageSize = 20;
}
```

##### 3.10.2 搜索响应DTO

```java
@Data
public class SearchResponseDTO {
    private List<DramaDTO> dramas;
    private List<CreatorDTO> creators;
    private List<CulturalResourceDTO> resources;
    private Integer totalResults;
    private Long searchTime;
}
```

#### 3.11 统计相关DTO

##### 3.11.1 用户统计查询DTO

```java
@Data
public class UserStatsQueryDTO {
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "开始日期格式不正确")
    private String startDate;
    
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "结束日期格式不正确")
    private String endDate;
}
```

##### 3.11.2 用户统计响应DTO

```java
@Data
public class UserStatsResponseDTO {
    private Long totalViews;
    private Integer totalLikes;
    private Integer totalComments;
    private Integer totalShares;
    private BigDecimal totalEarnings;
    private List<DailyStatsDTO> dailyStats;
}
```

##### 3.11.3 创作者统计查询DTO

```java
@Data
public class CreatorStatsQueryDTO {
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "开始日期格式不正确")
    private String startDate;
    
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "结束日期格式不正确")
    private String endDate;
    
    private String dramaId;
}
```

##### 3.11.4 创作者统计响应DTO

```java
@Data
public class CreatorStatsResponseDTO {
    private Long totalPlays;
    private Integer totalLikes;
    private Integer totalComments;
    private Integer totalShares;
    private BigDecimal totalEarnings;
    private Integer followerCount;
    private Integer dramaCount;
    private List<DramaStatsDTO> dramaStats;
    private List<DailyStatsDTO> dailyStats;
}
```

##### 3.11.5 日统计DTO

```java
@Data
public class DailyStatsDTO {
    private String date;
    private Long views;
    private Integer likes;
    private Integer comments;
    private Integer shares;
    private BigDecimal earnings;
}
```

##### 3.11.6 剧集统计DTO

```java
@Data
public class DramaStatsDTO {
    private String dramaId;
    private String title;
    private Long views;
    private Integer likes;
    private Integer comments;
    private Integer shares;
    private BigDecimal earnings;
}
```

### 4. DTO校验注解说明

#### 4.1 常用校验注解
- @NotNull: 字段不能为null
- @NotBlank: 字符串不能为空
- @NotEmpty: 集合不能为空
- @Size: 字符串或集合长度校验
- @Min: 数值最小值校验
- @Max: 数值最大值校验
- @DecimalMin: 小数最小值校验
- @DecimalMax: 小数最大值校验
- @Pattern: 正则表达式校验
- @Email: 邮箱格式校验
- @URL: URL格式校验

#### 4.2 自定义校验注解
- @Unique: 唯一性校验
- @Exists: 存在性校验
- @EnumValue: 枚举值校验
- @Password: 密码格式校验
- @Phone: 手机号格式校验
- @IdCard: 身份证号格式校验

### 5. DTO使用规范

#### 5.1 命名规范
- DTO类使用 PascalCase 命名，以DTO结尾
- 字段使用 camelCase 命名
- 布尔字段使用 is、has、can 等前缀
- 集合字段使用复数形式

#### 5.2 类型定义规范
- 所有字段必须明确指定类型
- 使用包装类型而非基本类型
- 日期时间使用Long类型
- 金额使用BigDecimal类型

#### 5.3 校验规范
- 必要字段添加校验注解
- 提供清晰的错误提示信息
- 合理设置校验规则
- 支持国际化错误信息

#### 5.4 序列化规范
- 使用Jackson进行JSON序列化
- 配置日期时间格式
- 配置数字格式
- 配置空值处理策略

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
