@file: 082-YYC3-Short-Drama-类型定义-后端-请求参数VO校验规则.md
@description: YYC3-Short-Drama 后端请求参数VO的校验规则、注解、业务约束的完整规范
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2026-01-24
@status: published
@tags: [类型定义],[后端],[VO校验]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 082-YYC3-Short-Drama-类型定义-后端-请求参数VO校验规则

## 概述

本文档详细描述YYC3-Short-Drama短剧平台后端请求参数VO（Value Object）的校验规则，包括注解定义、业务约束、自定义校验器等，确保数据在进入业务逻辑层之前经过严格验证，保障系统数据质量和安全性。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。请求参数校验是保障系统安全性和数据完整性的第一道防线。

#### 1.2 文档目标
- 规范后端请求参数VO的校验规则定义
- 提供完整的校验注解和业务约束说明
- 定义自定义校验器的实现规范
- 为开发团队提供清晰的参数校验开发指导
- 确保参数校验实现符合YYC³标准规范

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：确保参数校验稳定运行，保障系统可用性
- **高性能**：优化参数校验性能，提升系统响应速度
- **高安全性**：防止恶意输入和注入攻击，保护系统安全
- **高扩展性**：支持校验规则快速扩展，适应业务需求变化
- **高可维护性**：便于后续维护和升级，降低维护成本

#### 2.2 五标体系
- **标准化**：统一的参数校验设计和开发标准
- **规范化**：严格的参数校验编码规范和代码审查
- **自动化**：使用自动化工具提高参数校验开发效率
- **智能化**：使用智能工具辅助参数校验
- **可视化**：使用可视化工具监控参数校验状态

#### 2.3 五化架构
- **流程化**：标准化的参数校验流程和审查流程
- **文档化**：完善的参数校验注释和文档
- **工具化**：使用高效的参数校验开发工具和测试工具
- **数字化**：使用数字化工具管理参数校验
- **生态化**：使用开源参数校验库和框架

### 3. 校验框架基础

#### 3.1 校验注解体系

**JSR-303/JSR-380标准注解**
```java
import javax.validation.constraints.*;
import org.hibernate.validator.constraints.*;

@NotNull(message = "字段不能为null")
@NotBlank(message = "字段不能为空白")
@NotEmpty(message = "集合不能为空")
@Size(min = 1, max = 100, message = "长度必须在1-100之间")
@Min(value = 1, message = "最小值为1")
@Max(value = 100, message = "最大值为100")
@DecimalMin(value = "0.01", message = "最小值为0.01")
@DecimalMax(value = "9999.99", message = "最大值为9999.99")
@Pattern(regexp = "^[a-zA-Z0-9]+$", message = "格式不正确")
@Email(message = "邮箱格式不正确")
@URL(message = "URL格式不正确")
@Length(min = 1, max = 100, message = "长度必须在1-100之间")
@Range(min = 1, max = 100, message = "范围必须在1-100之间")
@Positive(message = "必须为正数")
@Negative(message = "必须为负数")
@Past(message = "必须为过去的时间")
@Future(message = "必须为未来的时间")
```

**自定义校验注解**
```java
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneNumberValidator.class)
@Documented
public @interface PhoneNumber {
    String message() default "手机号格式不正确";
    
    Class<?>[] groups() default {};
    
    Class<? extends Payload>[] payload() default {};
    
    String region() default "CN";
}
```

#### 3.2 校验分组

**校验分组定义**
```java
public interface ValidationGroups {
    interface Create {}
    interface Update {}
    interface Delete {}
    interface Query {}
    interface Admin {}
}
```

**分组校验示例**
```java
@Data
public class UserVO {
    @Null(groups = ValidationGroups.Create.class, message = "创建时ID必须为空")
    @NotNull(groups = {ValidationGroups.Update.class, ValidationGroups.Delete.class}, 
             message = "更新或删除时ID不能为空")
    private String userId;
    
    @NotBlank(groups = ValidationGroups.Create.class, message = "创建时昵称不能为空")
    @Size(groups = {ValidationGroups.Create.class, ValidationGroups.Update.class}, 
          min = 2, max = 50, message = "昵称长度必须在2-50位之间")
    private String nickname;
}
```

### 4. 用户相关VO校验规则

#### 4.1 用户注册VO

```java
@Data
public class UserRegisterVO {
    @NotBlank(message = "认证类型不能为空")
    private AuthType authType;
    
    @NotBlank(message = "手机号不能为空", groups = {ValidationGroups.Create.class})
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;
    
    @NotBlank(message = "邮箱不能为空", groups = {ValidationGroups.Create.class})
    @Email(message = "邮箱格式不正确")
    private String email;
    
    @NotBlank(message = "密码不能为空")
    @Size(min = 8, max = 20, message = "密码长度必须在8-20位之间")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$",
             message = "密码必须包含大小写字母和数字")
    private String password;
    
    @NotBlank(message = "确认密码不能为空")
    private String confirmPassword;
    
    @NotBlank(message = "昵称不能为空")
    @Size(min = 2, max = 50, message = "昵称长度必须在2-50位之间")
    @Pattern(regexp = "^[\\u4e00-\\u9fa5a-zA-Z0-9_]+$", message = "昵称只能包含中文、字母、数字和下划线")
    private String nickname;
    
    @NotBlank(message = "验证码不能为空")
    @Size(min = 6, max = 6, message = "验证码必须为6位数字")
    @Pattern(regexp = "^\\d{6}$", message = "验证码必须为6位数字")
    private String verificationCode;
    
    @AssertTrue(message = "必须同意用户协议")
    private Boolean agreeToTerms;
}
```

#### 4.2 用户登录VO

```java
@Data
public class UserLoginVO {
    @NotBlank(message = "认证类型不能为空")
    private AuthType authType;
    
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;
    
    @Email(message = "邮箱格式不正确")
    private String email;
    
    @Size(min = 8, max = 20, message = "密码长度必须在8-20位之间")
    private String password;
    
    @Size(min = 6, max = 6, message = "验证码必须为6位数字")
    @Pattern(regexp = "^\\d{6}$", message = "验证码必须为6位数字")
    private String verificationCode;
    
    @NotBlank(message = "OpenID不能为空")
    private String openId;
    
    @NotBlank(message = "访问令牌不能为空")
    private String accessToken;
}
```

#### 4.3 用户更新VO

```java
@Data
public class UserUpdateVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
    @Size(min = 2, max = 50, message = "昵称长度必须在2-50位之间")
    @Pattern(regexp = "^[\\u4e00-\\u9fa5a-zA-Z0-9_]+$", message = "昵称只能包含中文、字母、数字和下划线")
    private String nickname;
    
    @URL(message = "头像URL格式不正确")
    @Pattern(regexp = "^https?://.+\\.(jpg|jpeg|png|gif|webp)$", message = "头像只支持jpg、jpeg、png、gif、webp格式")
    private String avatar;
    
    @Size(max = 500, message = "个人简介不能超过500字")
    private String bio;
    
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;
    
    @Email(message = "邮箱格式不正确")
    private String email;
    
    @Min(value = 0, message = "性别值不正确")
    @Max(value = 2, message = "性别值不正确")
    private Integer gender;
}
```

#### 4.4 用户查询VO

```java
@Data
public class UserQueryVO {
    @Pattern(regexp = "^[\\u4e00-\\u9fa5a-zA-Z0-9_]+$", message = "昵称格式不正确")
    private String nickname;
    
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;
    
    @Email(message = "邮箱格式不正确")
    private String email;
    
    private UserRole role;
    
    private UserStatus status;
    
    @Min(value = 1, message = "页码必须大于0")
    private Integer page = 1;
    
    @Min(value = 1, message = "每页数量必须大于0")
    @Max(value = 100, message = "每页数量不能超过100")
    private Integer pageSize = 20;
    
    @Pattern(regexp = "^(userId|nickname|createdAt|lastLoginAt)$", message = "排序字段不正确")
    private String sortBy = "createdAt";
    
    @Pattern(regexp = "^(asc|desc)$", message = "排序方式不正确")
    private String sortOrder = "desc";
}
```

### 5. 短剧相关VO校验规则

#### 5.1 短剧创建VO

```java
@Data
public class DramaCreateVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
    @NotBlank(message = "标题不能为空")
    @Size(min = 1, max = 100, message = "标题长度必须在1-100位之间")
    private String title;
    
    @Size(max = 1000, message = "描述不能超过1000字")
    private String description;
    
    @NotBlank(message = "封面图片不能为空")
    @URL(message = "封面图片URL格式不正确")
    @Pattern(regexp = "^https?://.+\\.(jpg|jpeg|png|gif|webp)$", message = "封面只支持jpg、jpeg、png、gif、webp格式")
    private String coverImage;
    
    @NotBlank(message = "视频地址不能为空")
    @URL(message = "视频地址URL格式不正确")
    @Pattern(regexp = "^https?://.+\\.(mp4|mov|avi|mkv)$", message = "视频只支持mp4、mov、avi、mkv格式")
    private String videoUrl;
    
    @NotNull(message = "视频时长不能为空")
    @Min(value = 1, message = "视频时长必须大于0秒")
    @Max(value = 3600, message = "视频时长不能超过3600秒")
    private Integer duration;
    
    @NotBlank(message = "分类ID不能为空")
    private String categoryId;
    
    @Size(max = 10, message = "标签数量不能超过10个")
    private List<String> tags;
    
    @NotNull(message = "是否AI生成不能为空")
    private Boolean isAiGenerated;
    
    @Size(max = 50, message = "AI模型名称不能超过50字")
    private String aiModel;
    
    @DecimalMin(value = "0.00", message = "星值价格不能为负数")
    @DecimalMax(value = "9999.99", message = "星值价格不能超过9999.99")
    private BigDecimal starPrice;
}
```

#### 5.2 短剧更新VO

```java
@Data
public class DramaUpdateVO {
    @NotNull(message = "短剧ID不能为空")
    private String dramaId;
    
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
    @Size(min = 1, max = 100, message = "标题长度必须在1-100位之间")
    private String title;
    
    @Size(max = 1000, message = "描述不能超过1000字")
    private String description;
    
    @URL(message = "封面图片URL格式不正确")
    @Pattern(regexp = "^https?://.+\\.(jpg|jpeg|png|gif|webp)$", message = "封面只支持jpg、jpeg、png、gif、webp格式")
    private String coverImage;
    
    @URL(message = "视频地址URL格式不正确")
    @Pattern(regexp = "^https?://.+\\.(mp4|mov|avi|mkv)$", message = "视频只支持mp4、mov、avi、mkv格式")
    private String videoUrl;
    
    @Min(value = 1, message = "视频时长必须大于0秒")
    @Max(value = 3600, message = "视频时长不能超过3600秒")
    private Integer duration;
    
    private String categoryId;
    
    @Size(max = 10, message = "标签数量不能超过10个")
    private List<String> tags;
    
    @DecimalMin(value = "0.00", message = "星值价格不能为负数")
    @DecimalMax(value = "9999.99", message = "星值价格不能超过9999.99")
    private BigDecimal starPrice;
}
```

#### 5.3 短剧查询VO

```java
@Data
public class DramaQueryVO {
    private String categoryId;
    
    private DramaStatus status;
    
    private String creatorId;
    
    private Boolean isAiGenerated;
    
    @Size(max = 10, message = "标签数量不能超过10个")
    private List<String> tags;
    
    @Size(max = 100, message = "关键词不能超过100字")
    private String keyword;
    
    @Min(value = 1, message = "页码必须大于0")
    private Integer page = 1;
    
    @Min(value = 1, message = "每页数量必须大于0")
    @Max(value = 100, message = "每页数量不能超过100")
    private Integer pageSize = 20;
    
    @Pattern(regexp = "^(createdAt|publishedAt|viewCount|likeCount)$", message = "排序字段不正确")
    private String sortBy = "createdAt";
    
    @Pattern(regexp = "^(asc|desc)$", message = "排序方式不正确")
    private String sortOrder = "desc";
}
```

### 6. 剧集相关VO校验规则

#### 6.1 剧集创建VO

```java
@Data
public class EpisodeCreateVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
    @NotBlank(message = "短剧ID不能为空")
    private String dramaId;
    
    @NotNull(message = "集数不能为空")
    @Min(value = 1, message = "集数必须大于0")
    private Integer episodeNumber;
    
    @Size(max = 100, message = "集标题不能超过100字")
    private String title;
    
    @Size(max = 1000, message = "集描述不能超过1000字")
    private String description;
    
    @URL(message = "封面图片URL格式不正确")
    @Pattern(regexp = "^https?://.+\\.(jpg|jpeg|png|gif|webp)$", message = "封面只支持jpg、jpeg、png、gif、webp格式")
    private String coverImage;
    
    @NotBlank(message = "视频地址不能为空")
    @URL(message = "视频地址URL格式不正确")
    @Pattern(regexp = "^https?://.+\\.(mp4|mov|avi|mkv)$", message = "视频只支持mp4、mov、avi、mkv格式")
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

### 7. 互动相关VO校验规则

#### 7.1 点赞VO

```java
@Data
public class LikeVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
    @NotNull(message = "目标类型不能为空")
    private TargetType targetType;
    
    @NotBlank(message = "目标ID不能为空")
    private String targetId;
}
```

#### 7.2 评论创建VO

```java
@Data
public class CommentCreateVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
    @NotNull(message = "目标类型不能为空")
    private TargetType targetType;
    
    @NotBlank(message = "目标ID不能为空")
    private String targetId;
    
    private String parentId;
    
    @NotBlank(message = "评论内容不能为空")
    @Size(min = 1, max = 1000, message = "评论内容长度必须在1-1000位之间")
    private String content;
}
```

#### 7.3 评论查询VO

```java
@Data
public class CommentQueryVO {
    @NotNull(message = "目标类型不能为空")
    private TargetType targetType;
    
    @NotBlank(message = "目标ID不能为空")
    private String targetId;
    
    private String parentId;
    
    @Min(value = 1, message = "页码必须大于0")
    private Integer page = 1;
    
    @Min(value = 1, message = "每页数量必须大于0")
    @Max(value = 100, message = "每页数量不能超过100")
    private Integer pageSize = 20;
}
```

### 8. 订单与支付相关VO校验规则

#### 8.1 星值充值VO

```java
@Data
public class StarRechargeVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
    @NotNull(message = "充值金额不能为空")
    @DecimalMin(value = "1.00", message = "充值金额不能小于1元")
    @DecimalMax(value = "99999.99", message = "充值金额不能超过99999.99元")
    private BigDecimal amount;
    
    @NotNull(message = "支付方式不能为空")
    private PaymentMethod paymentMethod;
}
```

#### 8.2 剧集购买VO

```java
@Data
public class EpisodePurchaseVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
    @NotBlank(message = "剧集ID不能为空")
    private String episodeId;
    
    private PaymentMethod paymentMethod;
}
```

#### 8.3 VIP会员购买VO

```java
@Data
public class VipPurchaseVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
    @NotBlank(message = "会员类型不能为空")
    private MembershipType membershipType;
    
    private PaymentMethod paymentMethod;
}
```

### 9. 创作者相关VO校验规则

#### 9.1 创作者认证VO

```java
@Data
public class CreatorVerifyVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
    @NotBlank(message = "真实姓名不能为空")
    @Size(min = 2, max = 50, message = "真实姓名长度必须在2-50位之间")
    @Pattern(regexp = "^[\\u4e00-\\u9fa5a-zA-Z\\s]+$", message = "真实姓名只能包含中文、字母和空格")
    private String realName;
    
    @NotBlank(message = "身份证号不能为空")
    @Pattern(regexp = "^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$",
             message = "身份证号格式不正确")
    private String idCard;
    
    @NotBlank(message = "身份证正面不能为空")
    @URL(message = "身份证正面URL格式不正确")
    @Pattern(regexp = "^https?://.+\\.(jpg|jpeg|png)$", message = "身份证只支持jpg、jpeg、png格式")
    private String idCardFront;
    
    @NotBlank(message = "身份证背面不能为空")
    @URL(message = "身份证背面URL格式不正确")
    @Pattern(regexp = "^https?://.+\\.(jpg|jpeg|png)$", message = "身份证只支持jpg、jpeg、png格式")
    private String idCardBack;
    
    @URL(message = "营业执照URL格式不正确")
    @Pattern(regexp = "^https?://.+\\.(jpg|jpeg|png)$", message = "营业执照只支持jpg、jpeg、png格式")
    private String businessLicense;
}
```

### 10. 文化资源相关VO校验规则

#### 10.1 文化资源创建VO

```java
@Data
public class CulturalResourceCreateVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
    @NotNull(message = "资源类型不能为空")
    private ResourceType resourceType;
    
    @NotBlank(message = "资源标题不能为空")
    @Size(min = 1, max = 100, message = "资源标题长度必须在1-100位之间")
    private String title;
    
    @Size(max = 1000, message = "资源描述不能超过1000字")
    private String description;
    
    @URL(message = "封面图片URL格式不正确")
    @Pattern(regexp = "^https?://.+\\.(jpg|jpeg|png|gif|webp)$", message = "封面只支持jpg、jpeg、png、gif、webp格式")
    private String coverImage;
    
    @Size(max = 10000, message = "资源内容不能超过10000字")
    private String content;
    
    @Size(max = 10, message = "标签数量不能超过10个")
    private List<String> tags;
    
    @Size(max = 100, message = "地理位置不能超过100字")
    private String location;
    
    @Size(max = 50, message = "历史时期不能超过50字")
    private String era;
}
```

#### 10.2 文化资源查询VO

```java
@Data
public class CulturalResourceQueryVO {
    private ResourceType resourceType;
    
    @Size(max = 50, message = "历史时期不能超过50字")
    private String era;
    
    @Size(max = 100, message = "地理位置不能超过100字")
    private String location;
    
    @Size(max = 100, message = "关键词不能超过100字")
    private String keyword;
    
    @Min(value = 1, message = "页码必须大于0")
    private Integer page = 1;
    
    @Min(value = 1, message = "每页数量必须大于0")
    @Max(value = 100, message = "每页数量不能超过100")
    private Integer pageSize = 20;
}
```

### 11. AI生成相关VO校验规则

#### 11.1 剧本生成VO

```java
@Data
public class ScriptGenerateVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
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

#### 11.2 图片生成VO

```java
@Data
public class ImageGenerateVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
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

#### 11.3 视频生成VO

```java
@Data
public class VideoGenerateVO {
    @NotNull(message = "用户ID不能为空")
    private String userId;
    
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

### 12. 搜索相关VO校验规则

#### 12.1 搜索请求VO

```java
@Data
public class SearchVO {
    @NotBlank(message = "搜索关键词不能为空")
    @Size(min = 1, max = 100, message = "搜索关键词长度必须在1-100位之间")
    private String keyword;
    
    private SearchType searchType;
    
    private String categoryId;
    
    private String creatorId;
    
    @Min(value = 1, message = "页码必须大于0")
    private Integer page = 1;
    
    @Min(value = 1, message = "每页数量必须大于0")
    @Max(value = 100, message = "每页数量不能超过100")
    private Integer pageSize = 20;
}
```

### 13. 自定义校验器实现

#### 13.1 手机号校验器

```java
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {
    
    private String region;
    
    @Override
    public void initialize(PhoneNumber constraintAnnotation) {
        this.region = constraintAnnotation.region();
    }
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return true;
        }
        
        switch (region) {
            case "CN":
                return value.matches("^1[3-9]\\d{9}$");
            default:
                return value.matches("^\\+?[1-9]\\d{1,14}$");
        }
    }
}
```

#### 13.2 密码强度校验器

```java
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordStrengthValidator implements ConstraintValidator<PasswordStrength, String> {
    
    private int minStrength;
    
    @Override
    public void initialize(PasswordStrength constraintAnnotation) {
        this.minStrength = constraintAnnotation.minStrength();
    }
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return true;
        }
        
        int strength = 0;
        if (value.length() >= 8) strength++;
        if (value.length() >= 12) strength++;
        if (value.matches(".*[A-Z].*")) strength++;
        if (value.matches(".*[a-z].*")) strength++;
        if (value.matches(".*\\d.*")) strength++;
        if (value.matches(".*[^A-Za-z0-9].*")) strength++;
        
        return strength >= minStrength;
    }
}
```

#### 13.3 图片URL校验器

```java
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.List;

public class ImageUrlValidator implements ConstraintValidator<ImageUrl, String> {
    
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(
        ".jpg", ".jpeg", ".png", ".gif", ".webp"
    );
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return true;
        }
        
        if (!value.matches("^https?://.+$")) {
            return false;
        }
        
        String extension = value.substring(value.lastIndexOf('.')).toLowerCase();
        return ALLOWED_EXTENSIONS.contains(extension);
    }
}
```

#### 13.4 视频URL校验器

```java
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.List;

public class VideoUrlValidator implements ConstraintValidator<VideoUrl, String> {
    
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(
        ".mp4", ".mov", ".avi", ".mkv"
    );
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return true;
        }
        
        if (!value.matches("^https?://.+$")) {
            return false;
        }
        
        String extension = value.substring(value.lastIndexOf('.')).toLowerCase();
        return ALLOWED_EXTENSIONS.contains(extension);
    }
}
```

### 14. 业务规则校验

#### 14.1 用户业务规则校验

**邮箱唯一性校验**
```java
@Service
public class UserValidationService {
    
    @Autowired
    private UserRepository userRepository;
    
    public void validateEmailUnique(String email, String excludeUserId) {
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null && !existingUser.getUserId().equals(excludeUserId)) {
            throw new ValidationException("邮箱已被注册");
        }
    }
    
    public void validateNicknameUnique(String nickname, String excludeUserId) {
        User existingUser = userRepository.findByNickname(nickname);
        if (existingUser != null && !existingUser.getUserId().equals(excludeUserId)) {
            throw new ValidationException("昵称已被使用");
        }
    }
    
    public void validateUserExists(String userId) {
        User user = userRepository.findById(userId);
        if (user == null) {
            throw new ValidationException("用户不存在");
        }
    }
}
```

#### 14.2 短剧业务规则校验

**短剧权限校验**
```java
@Service
public class DramaValidationService {
    
    @Autowired
    private DramaRepository dramaRepository;
    
    public void validateDramaExists(String dramaId) {
        Drama drama = dramaRepository.findById(dramaId);
        if (drama == null) {
            throw new ValidationException("短剧不存在");
        }
    }
    
    public void validateDramaOwner(String dramaId, String userId) {
        Drama drama = dramaRepository.findById(dramaId);
        if (drama == null) {
            throw new ValidationException("短剧不存在");
        }
        if (!drama.getCreatorId().equals(userId)) {
            throw new ValidationException("无权操作该短剧");
        }
    }
    
    public void validateDramaPublishable(String dramaId) {
        Drama drama = dramaRepository.findById(dramaId);
        if (drama == null) {
            throw new ValidationException("短剧不存在");
        }
        if (!DramaStatus.DRAFT.equals(drama.getStatus())) {
            throw new ValidationException("短剧状态不允许发布");
        }
        if (drama.getPublishedEpisodes() == 0) {
            throw new ValidationException("至少需要发布一集才能发布短剧");
        }
    }
}
```

### 15. 校验异常处理

#### 15.1 校验异常定义

```java
public class ValidationException extends RuntimeException {
    
    private String field;
    private String code;
    
    public ValidationException(String message) {
        super(message);
    }
    
    public ValidationException(String field, String code, String message) {
        super(message);
        this.field = field;
        this.code = code;
    }
    
    public String getField() {
        return field;
    }
    
    public String getCode() {
        return code;
    }
}
```

#### 15.2 全局异常处理器

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException ex) {
        
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.toList());
        
        ErrorResponse response = new ErrorResponse(
            "VALIDATION_ERROR",
            "参数校验失败",
            errors
        );
        
        return ResponseEntity.badRequest().body(response);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleBusinessValidationException(
            ValidationException ex) {
        
        ErrorResponse response = new ErrorResponse(
            "BUSINESS_VALIDATION_ERROR",
            ex.getMessage(),
            null
        );
        
        return ResponseEntity.badRequest().body(response);
    }
}
```

### 16. 校验最佳实践

#### 16.1 分层校验

**第一层：参数格式校验（Controller层）**
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @PostMapping
    public ResponseEntity<UserDTO> createUser(
            @Valid @RequestBody UserRegisterVO userRegisterVO) {
        UserDTO user = userService.createUser(userRegisterVO);
        return ResponseEntity.ok(user);
    }
}
```

**第二层：业务规则校验（Service层）**
```java
@Service
public class UserService {
    
    public UserDTO createUser(UserRegisterVO userRegisterVO) {
        userValidationService.validateEmailUnique(userRegisterVO.getEmail(), null);
        userValidationService.validateNicknameUnique(userRegisterVO.getNickname(), null);
        
        return userMapper.toDTO(userRepository.create(userRegisterVO));
    }
}
```

#### 16.2 校验性能优化

**缓存校验结果**
```java
@Service
public class CachedValidationService {
    
    @Cacheable(value = "emailValidation", key = "#email")
    public boolean isEmailValid(String email) {
        return userRepository.findByEmail(email) == null;
    }
}
```

**批量校验**
```java
@Service
public class BatchValidationService {
    
    public void validateUsers(List<UserRegisterVO> users) {
        List<String> emails = users.stream()
            .map(UserRegisterVO::getEmail)
            .collect(Collectors.toList());
        
        List<String> existingEmails = userRepository.findByEmails(emails);
        
        if (!existingEmails.isEmpty()) {
            throw new ValidationException("邮箱已被注册: " + existingEmails);
        }
    }
}
```

### 17. 校验测试

#### 17.1 单元测试

```java
@SpringBootTest
public class UserVOTest {
    
    private Validator validator;
    
    @BeforeEach
    public void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }
    
    @Test
    public void testInvalidEmail() {
        UserRegisterVO user = new UserRegisterVO();
        user.setEmail("invalid-email");
        
        Set<ConstraintViolation<UserRegisterVO>> violations = validator.validate(user);
        
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
            .anyMatch(v -> v.getMessage().contains("邮箱格式不正确")));
    }
    
    @Test
    public void testPasswordTooShort() {
        UserRegisterVO user = new UserRegisterVO();
        user.setPassword("123");
        
        Set<ConstraintViolation<UserRegisterVO>> violations = validator.validate(user);
        
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
            .anyMatch(v -> v.getMessage().contains("密码长度")));
    }
}
```

### 18. 附录

#### 18.1 校验注解速查表

| 注解 | 适用类型 | 说明 |
|------|---------|------|
| @NotNull | 任意 | 值不能为null |
| @NotBlank | String | 字符串不能为空白 |
| @NotEmpty | 集合、数组、Map | 不能为空 |
| @Size | 字符串、集合、数组 | 长度范围 |
| @Min | 数字 | 最小值 |
| @Max | 数字 | 最大值 |
| @DecimalMin | BigDecimal | 最小值 |
| @DecimalMax | BigDecimal | 最大值 |
| @Pattern | String | 正则表达式匹配 |
| @Email | String | 邮箱格式 |
| @URL | String | URL格式 |
| @Positive | 数字 | 正数 |
| @Negative | 数字 | 负数 |
| @Past | 日期 | 过去时间 |
| @Future | 日期 | 未来时间 |
| @AssertTrue | Boolean | 必须为true |
| @AssertFalse | Boolean | 必须为false |

#### 18.2 常用正则表达式

| 用途 | 正则表达式 |
|------|-----------|
| 手机号（中国） | `^1[3-9]\d{9}$` |
| 邮箱 | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` |
| 身份证号 | `^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$` |
| URL | `^https?://.+$` |
| 图片URL | `^https?://.+\.(jpg|jpeg|png|gif|webp)$` |
| 视频URL | `^https?://.+\.(mp4|mov|avi|mkv)$` |
| 中文昵称 | `^[\u4e00-\u9fa5a-zA-Z0-9_]+$` |
| 密码（强） | `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$` |

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>
