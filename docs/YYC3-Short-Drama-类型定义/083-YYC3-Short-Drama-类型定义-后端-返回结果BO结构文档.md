@file: 083-YYC3-Short-Drama-类型定义-后端-返回结果BO结构文档.md
@description: YYC3-Short-Drama 后端返回结果BO的字段、结构、状态码的统一定义
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2026-01-24
@status: published
@tags: [类型定义],[后端],[BO结构]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 083-YYC3-Short-Drama-类型定义-后端-返回结果BO结构文档

## 概述

本文档详细描述YYC3-Short-Drama短剧平台后端返回结果BO（Business Object）的结构定义，包括统一响应格式、状态码、分页结构、错误处理等，确保前后端数据交互的一致性和规范性。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。统一的返回结果结构是保障前后端协作效率和系统可维护性的关键。

#### 1.2 文档目标
- 规范后端返回结果BO的结构定义
- 提供统一的响应格式和状态码体系
- 定义分页、错误处理等通用结构
- 为开发团队提供清晰的BO开发指导
- 确保返回结果实现符合YYC³标准规范

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：确保返回结果稳定可靠，保障系统可用性
- **高性能**：优化返回结果性能，提升系统响应速度
- **高安全性**：保护敏感数据，建立安全防护
- **高扩展性**：支持返回结果快速扩展，适应业务需求变化
- **高可维护性**：便于后续维护和升级，降低维护成本

#### 2.2 五标体系
- **标准化**：统一的返回结果设计和开发标准
- **规范化**：严格的返回结果编码规范和代码审查
- **自动化**：使用自动化工具提高返回结果开发效率
- **智能化**：使用智能工具辅助返回结果
- **可视化**：使用可视化工具监控返回结果状态

#### 2.3 五化架构
- **流程化**：标准化的返回结果流程和审查流程
- **文档化**：完善的返回结果注释和文档
- **工具化**：使用高效的返回结果开发工具和测试工具
- **数字化**：使用数字化工具管理返回结果
- **生态化**：使用开源返回结果库和框架

### 3. 统一响应结构

#### 3.1 基础响应结构

**成功响应**
```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response<T> {
    
    @ApiModelProperty(value = "响应码", example = "200")
    private String code;
    
    @ApiModelProperty(value = "响应消息", example = "操作成功")
    private String message;
    
    @ApiModelProperty(value = "响应数据")
    private T data;
    
    @ApiModelProperty(value = "时间戳", example = "1640995200000")
    private Long timestamp;
    
    @ApiModelProperty(value = "请求ID", example = "req_123456789")
    private String requestId;
    
    public static <T> Response<T> success(T data) {
        return new Response<>(
            ResponseCode.SUCCESS.getCode(),
            ResponseCode.SUCCESS.getMessage(),
            data,
            System.currentTimeMillis(),
            generateRequestId()
        );
    }
    
    public static <T> Response<T> success(String message, T data) {
        return new Response<>(
            ResponseCode.SUCCESS.getCode(),
            message,
            data,
            System.currentTimeMillis(),
            generateRequestId()
        );
    }
    
    public static <T> Response<T> error(ResponseCode responseCode) {
        return new Response<>(
            responseCode.getCode(),
            responseCode.getMessage(),
            null,
            System.currentTimeMillis(),
            generateRequestId()
        );
    }
    
    public static <T> Response<T> error(String code, String message) {
        return new Response<>(
            code,
            message,
            null,
            System.currentTimeMillis(),
            generateRequestId()
        );
    }
    
    private static String generateRequestId() {
        return "req_" + UUID.randomUUID().toString().replace("-", "");
    }
}
```

**分页响应**
```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse<T> {
    
    @ApiModelProperty(value = "响应码", example = "200")
    private String code;
    
    @ApiModelProperty(value = "响应消息", example = "查询成功")
    private String message;
    
    @ApiModelProperty(value = "分页数据")
    private PageData<T> data;
    
    @ApiModelProperty(value = "时间戳", example = "1640995200000")
    private Long timestamp;
    
    @ApiModelProperty(value = "请求ID", example = "req_123456789")
    private String requestId;
    
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PageData<T> {
        
        @ApiModelProperty(value = "数据列表")
        private List<T> records;
        
        @ApiModelProperty(value = "总记录数", example = "100")
        private Long total;
        
        @ApiModelProperty(value = "当前页码", example = "1")
        private Integer page;
        
        @ApiModelProperty(value = "每页数量", example = "20")
        private Integer pageSize;
        
        @ApiModelProperty(value = "总页数", example = "5")
        private Integer totalPages;
    }
    
    public static <T> PageResponse<T> of(List<T> records, Long total, 
                                          Integer page, Integer pageSize) {
        int totalPages = (int) Math.ceil((double) total / pageSize);
        PageData<T> pageData = new PageData<>(records, total, page, pageSize, totalPages);
        return new PageResponse<>(
            ResponseCode.SUCCESS.getCode(),
            ResponseCode.SUCCESS.getMessage(),
            pageData,
            System.currentTimeMillis(),
            generateRequestId()
        );
    }
    
    private static String generateRequestId() {
        return "req_" + UUID.randomUUID().toString().replace("-", "");
    }
}
```

**错误响应**
```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    
    @ApiModelProperty(value = "错误码", example = "400")
    private String code;
    
    @ApiModelProperty(value = "错误消息", example = "参数校验失败")
    private String message;
    
    @ApiModelProperty(value = "错误详情")
    private List<ErrorDetail> errors;
    
    @ApiModelProperty(value = "时间戳", example = "1640995200000")
    private Long timestamp;
    
    @ApiModelProperty(value = "请求ID", example = "req_123456789")
    private String requestId;
    
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ErrorDetail {
        
        @ApiModelProperty(value = "错误字段", example = "email")
        private String field;
        
        @ApiModelProperty(value = "错误码", example = "INVALID_EMAIL")
        private String errorCode;
        
        @ApiModelProperty(value = "错误消息", example = "邮箱格式不正确")
        private String errorMessage;
    }
    
    public static ErrorResponse of(String code, String message, 
                                   List<ErrorDetail> errors) {
        return new ErrorResponse(
            code,
            message,
            errors,
            System.currentTimeMillis(),
            generateRequestId()
        );
    }
    
    private static String generateRequestId() {
        return "req_" + UUID.randomUUID().toString().replace("-", "");
    }
}
```

### 4. 响应码定义

#### 4.1 响应码枚举

```java
public enum ResponseCode {
    
    SUCCESS("200", "操作成功"),
    
    BAD_REQUEST("400", "请求参数错误"),
    UNAUTHORIZED("401", "未授权"),
    FORBIDDEN("403", "禁止访问"),
    NOT_FOUND("404", "资源不存在"),
    METHOD_NOT_ALLOWED("405", "请求方法不允许"),
    CONFLICT("409", "资源冲突"),
    TOO_MANY_REQUESTS("429", "请求过于频繁"),
    
    INTERNAL_SERVER_ERROR("500", "服务器内部错误"),
    SERVICE_UNAVAILABLE("503", "服务不可用"),
    
    USER_NOT_FOUND("1001", "用户不存在"),
    USER_ALREADY_EXISTS("1002", "用户已存在"),
    INVALID_PASSWORD("1003", "密码错误"),
    TOKEN_EXPIRED("1004", "令牌已过期"),
    TOKEN_INVALID("1005", "令牌无效"),
    
    DRAMA_NOT_FOUND("2001", "短剧不存在"),
    DRAMA_ALREADY_EXISTS("2002", "短剧已存在"),
    DRAMA_NOT_PUBLISHED("2003", "短剧未发布"),
    DRAMA_NOT_OWNER("2004", "无权操作该短剧"),
    
    EPISODE_NOT_FOUND("3001", "剧集不存在"),
    EPISODE_ALREADY_PURCHASED("3002", "剧集已购买"),
    
    COMMENT_NOT_FOUND("4001", "评论不存在"),
    COMMENT_ALREADY_DELETED("4002", "评论已删除"),
    
    PAYMENT_FAILED("5001", "支付失败"),
    PAYMENT_CANCELLED("5002", "支付已取消"),
    PAYMENT_TIMEOUT("5003", "支付超时"),
    
    VALIDATION_ERROR("6001", "参数校验失败"),
    BUSINESS_VALIDATION_ERROR("6002", "业务规则校验失败"),
    
    AI_GENERATION_FAILED("7001", "AI生成失败"),
    AI_GENERATION_TIMEOUT("7002", "AI生成超时"),
    
    FILE_UPLOAD_FAILED("8001", "文件上传失败"),
    FILE_SIZE_EXCEEDED("8002", "文件大小超限"),
    FILE_TYPE_NOT_SUPPORTED("8003", "文件类型不支持");
    
    private final String code;
    private final String message;
    
    ResponseCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
    
    public String getCode() {
        return code;
    }
    
    public String getMessage() {
        return message;
    }
}
```

### 5. 用户相关BO

#### 5.1 用户信息BO

```java
@Data
public class UserBO {
    
    @ApiModelProperty(value = "用户ID")
    private String userId;
    
    @ApiModelProperty(value = "手机号")
    private String phone;
    
    @ApiModelProperty(value = "邮箱")
    private String email;
    
    @ApiModelProperty(value = "昵称")
    private String nickname;
    
    @ApiModelProperty(value = "头像")
    private String avatar;
    
    @ApiModelProperty(value = "个人简介")
    private String bio;
    
    @ApiModelProperty(value = "用户角色")
    private UserRole role;
    
    @ApiModelProperty(value = "用户状态")
    private UserStatus status;
    
    @ApiModelProperty(value = "星值")
    private Integer starValue;
    
    @ApiModelProperty(value = "星值等级")
    private Integer starLevel;
    
    @ApiModelProperty(value = "最后登录时间")
    private Long lastLoginAt;
    
    @ApiModelProperty(value = "创建时间")
    private Long createdAt;
    
    @ApiModelProperty(value = "更新时间")
    private Long updatedAt;
}
```

#### 5.2 用户详情BO

```java
@Data
public class UserDetailBO extends UserBO {
    
    @ApiModelProperty(value = "关注数")
    private Integer followingCount;
    
    @ApiModelProperty(value = "粉丝数")
    private Integer followerCount;
    
    @ApiModelProperty(value = "获赞数")
    private Integer likeCount;
    
    @ApiModelProperty(value = "收藏数")
    private Integer favoriteCount;
    
    @ApiModelProperty(value = "观看历史数")
    private Integer watchHistoryCount;
    
    @ApiModelProperty(value = "是否已关注")
    private Boolean isFollowing;
    
    @ApiModelProperty(value = "VIP会员信息")
    private VipInfoBO vipInfo;
    
    @Data
    public static class VipInfoBO {
        
        @ApiModelProperty(value = "是否VIP")
        private Boolean isVip;
        
        @ApiModelProperty(value = "会员类型")
        private MembershipType membershipType;
        
        @ApiModelProperty(value = "会员开始时间")
        private Long startTime;
        
        @ApiModelProperty(value = "会员结束时间")
        private Long endTime;
        
        @ApiModelProperty(value = "剩余天数")
        private Integer remainingDays;
    }
}
```

#### 5.3 登录响应BO

```java
@Data
public class LoginResponseBO {
    
    @ApiModelProperty(value = "访问令牌")
    private String accessToken;
    
    @ApiModelProperty(value = "刷新令牌")
    private String refreshToken;
    
    @ApiModelProperty(value = "令牌类型", example = "Bearer")
    private String tokenType;
    
    @ApiModelProperty(value = "过期时间（秒）", example = "7200")
    private Long expiresIn;
    
    @ApiModelProperty(value = "用户信息")
    private UserBO user;
}
```

### 6. 短剧相关BO

#### 6.1 短剧信息BO

```java
@Data
public class DramaBO {
    
    @ApiModelProperty(value = "短剧ID")
    private String dramaId;
    
    @ApiModelProperty(value = "创作者ID")
    private String creatorId;
    
    @ApiModelProperty(value = "标题")
    private String title;
    
    @ApiModelProperty(value = "描述")
    private String description;
    
    @ApiModelProperty(value = "封面图片")
    private String coverImage;
    
    @ApiModelProperty(value = "视频地址")
    private String videoUrl;
    
    @ApiModelProperty(value = "视频时长（秒）")
    private Integer duration;
    
    @ApiModelProperty(value = "分类ID")
    private String categoryId;
    
    @ApiModelProperty(value = "分类名称")
    private String categoryName;
    
    @ApiModelProperty(value = "标签")
    private List<String> tags;
    
    @ApiModelProperty(value = "短剧状态")
    private DramaStatus status;
    
    @ApiModelProperty(value = "是否AI生成")
    private Boolean isAiGenerated;
    
    @ApiModelProperty(value = "AI模型")
    private String aiModel;
    
    @ApiModelProperty(value = "观看次数")
    private Long viewCount;
    
    @ApiModelProperty(value = "点赞数")
    private Integer likeCount;
    
    @ApiModelProperty(value = "评论数")
    private Integer commentCount;
    
    @ApiModelProperty(value = "分享数")
    private Integer shareCount;
    
    @ApiModelProperty(value = "星值价格")
    private BigDecimal starPrice;
    
    @ApiModelProperty(value = "总收益")
    private BigDecimal totalEarnings;
    
    @ApiModelProperty(value = "发布时间")
    private Long publishedAt;
    
    @ApiModelProperty(value = "创建时间")
    private Long createdAt;
    
    @ApiModelProperty(value = "更新时间")
    private Long updatedAt;
}
```

#### 6.2 短剧详情BO

```java
@Data
public class DramaDetailBO extends DramaBO {
    
    @ApiModelProperty(value = "创作者信息")
    private CreatorBO creator;
    
    @ApiModelProperty(value = "是否已点赞")
    private Boolean isLiked;
    
    @ApiModelProperty(value = "是否已收藏")
    private Boolean isFavorited;
    
    @ApiModelProperty(value = "是否已购买")
    private Boolean isPurchased;
    
    @ApiModelProperty(value = "剧集列表")
    private List<EpisodeBO> episodes;
    
    @ApiModelProperty(value = "相关短剧")
    private List<DramaBO> relatedDramas;
}
```

#### 6.3 短剧统计BO

```java
@Data
public class DramaStatisticsBO {
    
    @ApiModelProperty(value = "短剧ID")
    private String dramaId;
    
    @ApiModelProperty(value = "总观看次数")
    private Long totalViews;
    
    @ApiModelProperty(value = "今日观看次数")
    private Long todayViews;
    
    @ApiModelProperty(value = "总点赞数")
    private Integer totalLikes;
    
    @ApiModelProperty(value = "今日点赞数")
    private Integer todayLikes;
    
    @ApiModelProperty(value = "总评论数")
    private Integer totalComments;
    
    @ApiModelProperty(value = "今日评论数")
    private Integer todayComments;
    
    @ApiModelProperty(value = "总分享数")
    private Integer totalShares;
    
    @ApiModelProperty(value = "今日分享数")
    private Integer todayShares;
    
    @ApiModelProperty(value = "总收藏数")
    private Integer totalFavorites;
    
    @ApiModelProperty(value = "今日收藏数")
    private Integer todayFavorites;
    
    @ApiModelProperty(value = "总购买数")
    private Integer totalPurchases;
    
    @ApiModelProperty(value = "今日购买数")
    private Integer todayPurchases;
    
    @ApiModelProperty(value = "总收益")
    private BigDecimal totalEarnings;
    
    @ApiModelProperty(value = "今日收益")
    private BigDecimal todayEarnings;
    
    @ApiModelProperty(value = "统计日期")
    private String statisticsDate;
}
```

### 7. 剧集相关BO

#### 7.1 剧集信息BO

```java
@Data
public class EpisodeBO {
    
    @ApiModelProperty(value = "剧集ID")
    private String episodeId;
    
    @ApiModelProperty(value = "短剧ID")
    private String dramaId;
    
    @ApiModelProperty(value = "集数")
    private Integer episodeNumber;
    
    @ApiModelProperty(value = "标题")
    private String title;
    
    @ApiModelProperty(value = "描述")
    private String description;
    
    @ApiModelProperty(value = "封面图片")
    private String coverImage;
    
    @ApiModelProperty(value = "视频地址")
    private String videoUrl;
    
    @ApiModelProperty(value = "视频时长（秒）")
    private Integer duration;
    
    @ApiModelProperty(value = "是否免费")
    private Boolean isFree;
    
    @ApiModelProperty(value = "星值价格")
    private BigDecimal starPrice;
    
    @ApiModelProperty(value = "观看次数")
    private Long viewCount;
    
    @ApiModelProperty(value = "创建时间")
    private Long createdAt;
    
    @ApiModelProperty(value = "更新时间")
    private Long updatedAt;
}
```

#### 7.2 剧集详情BO

```java
@Data
public class EpisodeDetailBO extends EpisodeBO {
    
    @ApiModelProperty(value = "短剧信息")
    private DramaBO drama;
    
    @ApiModelProperty(value = "是否已购买")
    private Boolean isPurchased;
    
    @ApiModelProperty(value = "是否已观看")
    private Boolean isWatched;
    
    @ApiModelProperty(value = "观看进度（秒）")
    private Integer watchProgress;
}
```

### 8. 互动相关BO

#### 8.1 评论信息BO

```java
@Data
public class CommentBO {
    
    @ApiModelProperty(value = "评论ID")
    private String commentId;
    
    @ApiModelProperty(value = "用户ID")
    private String userId;
    
    @ApiModelProperty(value = "用户昵称")
    private String userNickname;
    
    @ApiModelProperty(value = "用户头像")
    private String userAvatar;
    
    @ApiModelProperty(value = "目标类型")
    private TargetType targetType;
    
    @ApiModelProperty(value = "目标ID")
    private String targetId;
    
    @ApiModelProperty(value = "父评论ID")
    private String parentId;
    
    @ApiModelProperty(value = "评论内容")
    private String content;
    
    @ApiModelProperty(value = "点赞数")
    private Integer likeCount;
    
    @ApiModelProperty(value = "评论状态")
    private UserStatus status;
    
    @ApiModelProperty(value = "是否已点赞")
    private Boolean isLiked;
    
    @ApiModelProperty(value = "回复列表")
    private List<CommentBO> replies;
    
    @ApiModelProperty(value = "回复数")
    private Integer replyCount;
    
    @ApiModelProperty(value = "创建时间")
    private Long createdAt;
    
    @ApiModelProperty(value = "更新时间")
    private Long updatedAt;
}
```

#### 8.2 点赞信息BO

```java
@Data
public class LikeBO {
    
    @ApiModelProperty(value = "点赞ID")
    private String likeId;
    
    @ApiModelProperty(value = "用户ID")
    private String userId;
    
    @ApiModelProperty(value = "目标类型")
    private TargetType targetType;
    
    @ApiModelProperty(value = "目标ID")
    private String targetId;
    
    @ApiModelProperty(value = "点赞时间")
    private Long createdAt;
}
```

#### 8.3 收藏信息BO

```java
@Data
public class FavoriteBO {
    
    @ApiModelProperty(value = "收藏ID")
    private String favoriteId;
    
    @ApiModelProperty(value = "用户ID")
    private String userId;
    
    @ApiModelProperty(value = "目标类型")
    private TargetType targetType;
    
    @ApiModelProperty(value = "目标ID")
    private String targetId;
    
    @ApiModelProperty(value = "收藏时间")
    private Long createdAt;
}
```

### 9. 创作者相关BO

#### 9.1 创作者信息BO

```java
@Data
public class CreatorBO {
    
    @ApiModelProperty(value = "创作者ID")
    private String creatorId;
    
    @ApiModelProperty(value = "用户ID")
    private String userId;
    
    @ApiModelProperty(value = "真实姓名")
    private String realName;
    
    @ApiModelProperty(value = "认证状态")
    private VerificationStatus verificationStatus;
    
    @ApiModelProperty(value = "认证时间")
    private Long verificationTime;
    
    @ApiModelProperty(value = "拒绝原因")
    private String rejectReason;
    
    @ApiModelProperty(value = "总播放量")
    private Long totalPlays;
    
    @ApiModelProperty(value = "总收益")
    private BigDecimal totalEarnings;
    
    @ApiModelProperty(value = "创建时间")
    private Long createdAt;
    
    @ApiModelProperty(value = "更新时间")
    private Long updatedAt;
}
```

#### 9.2 创作者详情BO

```java
@Data
public class CreatorDetailBO extends CreatorBO {
    
    @ApiModelProperty(value = "用户信息")
    private UserBO user;
    
    @ApiModelProperty(value = "短剧数量")
    private Integer dramaCount;
    
    @ApiModelProperty(value = "粉丝数量")
    private Integer followerCount;
    
    @ApiModelProperty(value = "最近短剧")
    private List<DramaBO> recentDramas;
    
    @ApiModelProperty(value = "收益统计")
    private EarningsStatisticsBO earningsStatistics;
    
    @Data
    public static class EarningsStatisticsBO {
        
        @ApiModelProperty(value = "今日收益")
        private BigDecimal todayEarnings;
        
        @ApiModelProperty(value = "本周收益")
        private BigDecimal weekEarnings;
        
        @ApiModelProperty(value = "本月收益")
        private BigDecimal monthEarnings;
        
        @ApiModelProperty(value = "总收益")
        private BigDecimal totalEarnings;
        
        @ApiModelProperty(value = "提现中金额")
        private BigDecimal withdrawingAmount;
        
        @ApiModelProperty(value = "已提现金额")
        private BigDecimal withdrawnAmount;
    }
}
```

### 10. 订单与支付相关BO

#### 10.1 订单信息BO

```java
@Data
public class OrderBO {
    
    @ApiModelProperty(value = "订单ID")
    private String orderId;
    
    @ApiModelProperty(value = "用户ID")
    private String userId;
    
    @ApiModelProperty(value = "订单类型")
    private OrderType orderType;
    
    @ApiModelProperty(value = "目标ID")
    private String targetId;
    
    @ApiModelProperty(value = "订单金额")
    private BigDecimal amount;
    
    @ApiModelProperty(value = "星值数量")
    private Integer starAmount;
    
    @ApiModelProperty(value = "订单状态")
    private OrderStatus status;
    
    @ApiModelProperty(value = "支付方式")
    private PaymentMethod paymentMethod;
    
    @ApiModelProperty(value = "支付ID")
    private String paymentId;
    
    @ApiModelProperty(value = "支付时间")
    private Long paidAt;
    
    @ApiModelProperty(value = "创建时间")
    private Long createdAt;
    
    @ApiModelProperty(value = "更新时间")
    private Long updatedAt;
}
```

#### 10.2 支付响应BO

```java
@Data
public class PaymentResponseBO {
    
    @ApiModelProperty(value = "支付ID")
    private String paymentId;
    
    @ApiModelProperty(value = "支付方式")
    private PaymentMethod paymentMethod;
    
    @ApiModelProperty(value = "支付金额")
    private BigDecimal amount;
    
    @ApiModelProperty(value = "支付状态")
    private PaymentStatus status;
    
    @ApiModelProperty(value = "支付URL")
    private String paymentUrl;
    
    @ApiModelProperty(value = "二维码URL")
    private String qrCodeUrl;
    
    @ApiModelProperty(value = "过期时间")
    private Long expireTime;
}
```

#### 10.3 星值充值响应BO

```java
@Data
public class StarRechargeResponseBO {
    
    @ApiModelProperty(value = "订单ID")
    private String orderId;
    
    @ApiModelProperty(value = "充值金额")
    private BigDecimal amount;
    
    @ApiModelProperty(value = "星值数量")
    private Integer starAmount;
    
    @ApiModelProperty(value = "赠送星值数量")
    private Integer bonusStarAmount;
    
    @ApiModelProperty(value = "总星值数量")
    private Integer totalStarAmount;
    
    @ApiModelProperty(value = "支付信息")
    private PaymentResponseBO paymentInfo;
}
```

### 11. 文化资源相关BO

#### 11.1 文化资源信息BO

```java
@Data
public class CulturalResourceBO {
    
    @ApiModelProperty(value = "资源ID")
    private String resourceId;
    
    @ApiModelProperty(value = "资源类型")
    private ResourceType resourceType;
    
    @ApiModelProperty(value = "资源标题")
    private String title;
    
    @ApiModelProperty(value = "资源描述")
    private String description;
    
    @ApiModelProperty(value = "封面图片")
    private String coverImage;
    
    @ApiModelProperty(value = "资源内容")
    private String content;
    
    @ApiModelProperty(value = "标签")
    private List<String> tags;
    
    @ApiModelProperty(value = "地理位置")
    private String location;
    
    @ApiModelProperty(value = "历史时期")
    private String era;
    
    @ApiModelProperty(value = "资源状态")
    private CategoryStatus status;
    
    @ApiModelProperty(value = "观看次数")
    private Long viewCount;
    
    @ApiModelProperty(value = "使用次数")
    private Integer usageCount;
    
    @ApiModelProperty(value = "创建时间")
    private Long createdAt;
    
    @ApiModelProperty(value = "更新时间")
    private Long updatedAt;
}
```

### 12. AI生成相关BO

#### 12.1 AI生成响应BO

```java
@Data
public class AiGenerateResponseBO {
    
    @ApiModelProperty(value = "任务ID")
    private String taskId;
    
    @ApiModelProperty(value = "生成状态")
    private GenerationStatus status;
    
    @ApiModelProperty(value = "生成结果URL")
    private String url;
    
    @ApiModelProperty(value = "生成内容")
    private String content;
    
    @ApiModelProperty(value = "缩略图URL")
    private String thumbnail;
    
    @ApiModelProperty(value = "生成进度（%）")
    private Integer progress;
    
    @ApiModelProperty(value = "预计完成时间（秒）")
    private Long estimatedTime;
    
    @ApiModelProperty(value = "生成时间")
    private Long generatedAt;
}
```

#### 12.2 剧本生成结果BO

```java
@Data
public class ScriptGenerateResultBO extends AiGenerateResponseBO {
    
    @ApiModelProperty(value = "剧本标题")
    private String title;
    
    @ApiModelProperty(value = "剧本内容")
    private String script;
    
    @ApiModelProperty(value = "角色列表")
    private List<CharacterBO> characters;
    
    @ApiModelProperty(value = "场景列表")
    private List<SceneBO> scenes;
    
    @Data
    public static class CharacterBO {
        
        @ApiModelProperty(value = "角色名称")
        private String name;
        
        @ApiModelProperty(value = "角色描述")
        private String description;
    }
    
    @Data
    public static class SceneBO {
        
        @ApiModelProperty(value = "场景编号")
        private Integer sceneNumber;
        
        @ApiModelProperty(value = "场景描述")
        private String description;
        
        @ApiModelProperty(value = "场景时长（秒）")
        private Integer duration;
    }
}
```

### 13. 搜索相关BO

#### 13.1 搜索结果BO

```java
@Data
public class SearchResultBO {
    
    @ApiModelProperty(value = "搜索关键词")
    private String keyword;
    
    @ApiModelProperty(value = "搜索类型")
    private SearchType searchType;
    
    @ApiModelProperty(value = "短剧结果")
    private List<DramaBO> dramas;
    
    @ApiModelProperty(value = "创作者结果")
    private List<CreatorBO> creators;
    
    @ApiModelProperty(value = "文化资源结果")
    private List<CulturalResourceBO> culturalResources;
    
    @ApiModelProperty(value = "总结果数")
    private Integer totalCount;
}
```

#### 13.2 推荐结果BO

```java
@Data
public class RecommendationBO {
    
    @ApiModelProperty(value = "推荐类型")
    private RecommendationType recommendationType;
    
    @ApiModelProperty(value = "推荐短剧")
    private List<DramaBO> recommendedDramas;
    
    @ApiModelProperty(value = "推荐理由")
    private String reason;
}
```

### 14. 统计相关BO

#### 14.1 平台统计BO

```java
@Data
public class PlatformStatisticsBO {
    
    @ApiModelProperty(value = "总用户数")
    private Long totalUsers;
    
    @ApiModelProperty(value = "今日新增用户数")
    private Long todayNewUsers;
    
    @ApiModelProperty(value = "总短剧数")
    private Long totalDramas;
    
    @ApiModelProperty(value = "今日新增短剧数")
    private Long todayNewDramas;
    
    @ApiModelProperty(value = "总观看次数")
    private Long totalViews;
    
    @ApiModelProperty(value = "今日观看次数")
    private Long todayViews;
    
    @ApiModelProperty(value = "总订单数")
    private Long totalOrders;
    
    @ApiModelProperty(value = "今日订单数")
    private Long todayOrders;
    
    @ApiModelProperty(value = "总收入")
    private BigDecimal totalRevenue;
    
    @ApiModelProperty(value = "今日收入")
    private BigDecimal todayRevenue;
    
    @ApiModelProperty(value = "统计日期")
    private String statisticsDate;
}
```

#### 14.2 用户行为统计BO

```java
@Data
public class UserBehaviorStatisticsBO {
    
    @ApiModelProperty(value = "用户ID")
    private String userId;
    
    @ApiModelProperty(value = "观看次数")
    private Long viewCount;
    
    @ApiModelProperty(value = "观看时长（秒）")
    private Long watchDuration;
    
    @ApiModelProperty(value = "点赞次数")
    private Integer likeCount;
    
    @ApiModelProperty(value = "评论次数")
    private Integer commentCount;
    
    @ApiModelProperty(value = "分享次数")
    private Integer shareCount;
    
    @ApiModelProperty(value = "收藏次数")
    private Integer favoriteCount;
    
    @ApiModelProperty(value = "购买次数")
    private Integer purchaseCount;
    
    @ApiModelProperty(value = "消费金额")
    private BigDecimal totalSpent;
    
    @ApiModelProperty(value = "统计周期")
    private String period;
}
```

### 15. 文件上传相关BO

#### 15.1 文件上传响应BO

```java
@Data
public class FileUploadResponseBO {
    
    @ApiModelProperty(value = "文件ID")
    private String fileId;
    
    @ApiModelProperty(value = "文件名")
    private String fileName;
    
    @ApiModelProperty(value = "文件URL")
    private String fileUrl;
    
    @ApiModelProperty(value = "文件大小（字节）")
    private Long fileSize;
    
    @ApiModelProperty(value = "文件类型")
    private String fileType;
    
    @ApiModelProperty(value = "文件MIME类型")
    private String mimeType;
    
    @ApiModelProperty(value = "上传时间")
    private Long uploadedAt;
}
```

#### 15.2 批量文件上传响应BO

```java
@Data
public class BatchFileUploadResponseBO {
    
    @ApiModelProperty(value = "成功上传的文件列表")
    private List<FileUploadResponseBO> successFiles;
    
    @ApiModelProperty(value = "失败的文件列表")
    private List<FailedFileBO> failedFiles;
    
    @ApiModelProperty(value = "总文件数")
    private Integer totalFiles;
    
    @ApiModelProperty(value = "成功文件数")
    private Integer successCount;
    
    @ApiModelProperty(value = "失败文件数")
    private Integer failedCount;
    
    @Data
    public static class FailedFileBO {
        
        @ApiModelProperty(value = "文件名")
        private String fileName;
        
        @ApiModelProperty(value = "失败原因")
        private String reason;
    }
}
```

### 16. 通知相关BO

#### 16.1 通知信息BO

```java
@Data
public class NotificationBO {
    
    @ApiModelProperty(value = "通知ID")
    private String notificationId;
    
    @ApiModelProperty(value = "用户ID")
    private String userId;
    
    @ApiModelProperty(value = "通知类型")
    private NotificationType notificationType;
    
    @ApiModelProperty(value = "通知标题")
    private String title;
    
    @ApiModelProperty(value = "通知内容")
    private String content;
    
    @ApiModelProperty(value = "通知数据")
    private Map<String, Object> data;
    
    @ApiModelProperty(value = "是否已读")
    private Boolean isRead;
    
    @ApiModelProperty(value = "阅读时间")
    private Long readAt;
    
    @ApiModelProperty(value = "创建时间")
    private Long createdAt;
}
```

#### 16.2 通知统计BO

```java
@Data
public class NotificationStatisticsBO {
    
    @ApiModelProperty(value = "用户ID")
    private String userId;
    
    @ApiModelProperty(value = "未读通知数")
    private Integer unreadCount;
    
    @ApiModelProperty(value = "总通知数")
    private Integer totalCount;
    
    @ApiModelProperty(value = "系统通知数")
    private Integer systemCount;
    
    @ApiModelProperty(value = "互动通知数")
    private Integer interactionCount;
    
    @ApiModelProperty(value = "订单通知数")
    private Integer orderCount;
}
```

### 17. 附录

#### 17.1 响应码速查表

| 响应码 | 消息 | 说明 |
|--------|------|------|
| 200 | 操作成功 | 请求成功处理 |
| 400 | 请求参数错误 | 参数格式或内容不正确 |
| 401 | 未授权 | 未登录或令牌无效 |
| 403 | 禁止访问 | 无权限访问资源 |
| 404 | 资源不存在 | 请求的资源不存在 |
| 405 | 请求方法不允许 | HTTP方法不支持 |
| 409 | 资源冲突 | 资源已存在或状态冲突 |
| 429 | 请求过于频繁 | 超过请求频率限制 |
| 500 | 服务器内部错误 | 服务器处理异常 |
| 503 | 服务不可用 | 服务暂时不可用 |
| 1001 | 用户不存在 | 指定用户不存在 |
| 1002 | 用户已存在 | 用户已注册 |
| 1003 | 密码错误 | 密码不正确 |
| 1004 | 令牌已过期 | 访问令牌已过期 |
| 1005 | 令牌无效 | 访问令牌无效 |
| 2001 | 短剧不存在 | 指定短剧不存在 |
| 2002 | 短剧已存在 | 短剧已创建 |
| 2003 | 短剧未发布 | 短剧未发布 |
| 2004 | 无权操作该短剧 | 不是短剧创作者 |
| 3001 | 剧集不存在 | 指定剧集不存在 |
| 3002 | 剧集已购买 | 剧集已购买 |
| 4001 | 评论不存在 | 指定评论不存在 |
| 4002 | 评论已删除 | 评论已被删除 |
| 5001 | 支付失败 | 支付处理失败 |
| 5002 | 支付已取消 | 用户取消支付 |
| 5003 | 支付超时 | 支付超时未完成 |
| 6001 | 参数校验失败 | 参数验证失败 |
| 6002 | 业务规则校验失败 | 业务规则验证失败 |
| 7001 | AI生成失败 | AI服务生成失败 |
| 7002 | AI生成超时 | AI服务生成超时 |
| 8001 | 文件上传失败 | 文件上传处理失败 |
| 8002 | 文件大小超限 | 文件超过大小限制 |
| 8003 | 文件类型不支持 | 文件格式不支持 |

#### 17.2 响应结构示例

**成功响应示例**
```json
{
  "code": "200",
  "message": "操作成功",
  "data": {
    "userId": "user_123456",
    "nickname": "测试用户",
    "avatar": "https://example.com/avatar.jpg"
  },
  "timestamp": 1640995200000,
  "requestId": "req_123456789"
}
```

**分页响应示例**
```json
{
  "code": "200",
  "message": "查询成功",
  "data": {
    "records": [
      {
        "dramaId": "drama_123456",
        "title": "测试短剧",
        "coverImage": "https://example.com/cover.jpg"
      }
    ],
    "total": 100,
    "page": 1,
    "pageSize": 20,
    "totalPages": 5
  },
  "timestamp": 1640995200000,
  "requestId": "req_123456789"
}
```

**错误响应示例**
```json
{
  "code": "400",
  "message": "参数校验失败",
  "errors": [
    {
      "field": "email",
      "errorCode": "INVALID_EMAIL",
      "errorMessage": "邮箱格式不正确"
    },
    {
      "field": "password",
      "errorCode": "PASSWORD_TOO_SHORT",
      "errorMessage": "密码长度必须在8-20位之间"
    }
  ],
  "timestamp": 1640995200000,
  "requestId": "req_123456789"
}
```

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>
