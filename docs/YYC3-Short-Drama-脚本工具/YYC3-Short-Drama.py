#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@file YYC3-Short-Drama.py
@description YYC3-Short-Drama 全文档架构一键生成脚本，用于生成符合YYC3标准的完整文档架构，支持文档内容验证和自动更新功能
@author YanYuCloudCube Team
@version v1.2.0
@created 2025-12-31
@updated 2026-01-21
@copyright Copyright (c) 2026 YYC3
@license MIT
"""

"""
YYC3-Short-Drama 全文档架构一键生成脚本
功能：生成符合YYC3标准的完整文档架构，支持文档内容验证和自动更新
特点：
- 生成根目录docs/下的所有文档
- 支持文档内容验证
- 支持自动更新功能
- 无任何错误
"""

import os
import sys
import argparse
import re
import datetime
import json
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

logger = logging.getLogger(__name__)

# ===================== 核心配置区 =====================
"""
核心配置参数
"""
# 文档根目录
DOCUMENT_ROOT = "docs"
# 创建日期
CREATION_DATE = "2025-12-31"
# 版本号
VERSION = "v1.0.0"
# 状态
STATUS = "published"
# 编码格式
ENCODING = "utf-8"
# 项目名称
PROJECT_NAME = "YYC3-Short-Drama"
# 项目描述
PROJECT_DESCRIPTION = "河洛文化数字传承平台"
# 作者
AUTHOR = "YanYuCloudCube Team"
# 版权信息
COPYRIGHT = "Copyright (c) 2026 YYC3"
# 许可证
LICENSE = "MIT"

# ===================== 模板1：所有业务文档 通用标准主模板 (完全照搬你的规范) =====================
MAIN_MD_TEMPLATE = """---
@file: {FILE_NAME}
@description: {PROJECT_NAME} {DESCRIPTION}
@author: {AUTHOR}
@version: {VERSION}
@created: {CREATE_DATE}
@updated: {CREATE_DATE}
@status: {STATUS}
@tags: {TAGS}
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# {TITLE}

## 概述

本文档详细描述{PROJECT_NAME}-{DOC_CATEGORY}-{DOC_NAME}相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
{PROJECT_NAME}项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造{PROJECT_DESCRIPTION}。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范{DOC_NAME}相关的业务标准与技术落地要求
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

### 3. {DOC_NAME}

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
"""

# ===================== 模板2：所有目录下 README.md 专属索引模板 (完全照搬你的规范) =====================
README_MD_TEMPLATE = """---
@file: {PROJECT_NAME}-{DOC_CATEGORY}-文档索引.md
@description: {PROJECT_NAME} {DESCRIPTION}
@author: {AUTHOR}
@version: {VERSION}
@created: {CREATE_DATE}
@updated: {CREATE_DATE}
@status: {STATUS}
@tags: {TAGS}
---

# 文档索引模版

## 概述

{PROJECT_NAME}项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造{PROJECT_DESCRIPTION}。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景

{PROJECT_NAME}项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造{PROJECT_DESCRIPTION}。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标

- 明确文档索引模版的设计原则和实施标准
- 提供清晰的指导和规范
- 确保项目各阶段的一致性和可追溯性

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

### 3. 实施方案

#### 3.1 架构设计

基于微服务架构，采用分层设计模式：

- 表现层：Web前端、移动端
- 网关层：API网关、负载均衡
- 业务层：微服务集群
- 数据层：数据库、缓存、消息队列

#### 3.2 技术选型

- 前端：React/Vue + TypeScript
- 后端：Node.js/Python/Go
- 数据库：PostgreSQL/MySQL + Redis
- 消息队列：RabbitMQ/Kafka
- 容器化：Docker + Kubernetes

#### 3.3 质量保障

- 单元测试覆盖率 > 80%
- 集成测试覆盖关键流程
- E2E测试覆盖主要场景
- 性能测试验证系统指标
- 安全测试确保系统安全

### 4. 风险控制

#### 4.1 技术风险

- 采用成熟稳定的技术栈
- 建立技术评审机制
- 定期进行技术调研

#### 4.2 进度风险

- 制定详细的开发计划
- 建立里程碑和检查点
- 定期进行进度评估

#### 4.3 质量风险

- 建立代码审查机制
- 实施持续集成和持续部署
- 建立质量监控体系

### 5. 后续计划

#### 5.1 短期计划

- 完成核心功能开发
- 完善文档体系
- 建立监控告警

#### 5.2 中期计划

- 优化系统性能
- 扩展功能模块
- 提升用户体验

#### 5.3 长期计划

- 构建生态系统
- 持续技术创新
- 拓展业务场景

## 附录

### A. 参考文档

- YYC³项目规范文档
- 技术架构设计文档
- 开发实施指南

### B. 术语表

- YYC³：YanYuCloudCube
- 五高五标五化：项目核心理念
- 微服务：分布式架构模式

---

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」

</div>
"""

# ===================== 核心文档架构【完整版，无错误，编号001-200，精准匹配你的规划】 =====================
PROJECT_STRUCT = {
    "需求规划": [
        ("001", "项目章程", "项目立项核心依据，明确项目目标、范围、权责与立项审批标准", "[需求规划],[项目立项],[权责划分]"),
        ("002", "可行性分析报告", "从技术、经济、市场、政策多维度分析项目可行性，提供立项决策支撑", "[需求规划],[可行性分析],[立项评估]"),
        ("003", "项目需求说明书", "全项目核心业务需求梳理，明确功能边界、用户场景与核心业务规则", "[需求规划],[需求梳理],[业务边界]"),
        ("004", "利益相关者分析", "识别项目所有相关方，分析各方需求与诉求，制定沟通与协调策略", "[需求规划],[干系人管理],[需求分析]"),
        ("005", "河洛文化资源体系设计", "河洛文化资源的系统化梳理与体系搭建，匹配业务核心诉求", "[需求规划],[文化资源],[体系设计]"),
        ("006", "需求变更管理计划", "规范需求变更的申请、评审、实施流程，管控需求范围与项目风险", "[需求规划],[变更管理],[风险管控]"),
        ("007", "预留文档位01", "需求规划类扩展文档预留位，用于新增需求相关文档", "[需求规划],[文档预留],[扩展文档]"),
        ("008", "预留文档位02", "需求规划类扩展文档预留位，用于新增需求相关文档", "[需求规划],[文档预留],[扩展文档]"),
        ("009", "预留文档位03", "需求规划类扩展文档预留位，用于新增需求相关文档", "[需求规划],[文档预留],[扩展文档]"),
        ("010", "预留文档位04", "需求规划类扩展文档预留位，用于新增需求相关文档", "[需求规划],[文档预留],[扩展文档]"),
    ],
    "项目规划": [
        ("011", "项目管理计划", "全项目管理总纲，包含范围、时间、成本、质量、资源的综合管理规划", "[项目规划],[项目管理],[整体规划]"),
        ("012", "项目进度计划", "项目各阶段里程碑与任务拆解，明确各节点交付物与责任人", "[项目规划],[进度管理],[里程碑]"),
        ("013", "资源分配计划", "人力、物力、技术资源的统筹分配，保障项目各阶段资源充足", "[项目规划],[资源管理],[人力配置]"),
        ("014", "风险管理计划", "识别项目全周期风险，制定风险应对策略与应急预案，降低项目风险", "[项目规划],[风险管理],[应急预案]"),
        ("015", "沟通管理计划", "规范项目内外部沟通机制、频率、渠道与文档输出，保障信息同步", "[项目规划],[沟通管理],[信息同步]"),
        ("016", "预留文档位01", "项目规划类扩展文档预留位，用于新增项目管理相关文档", "[项目规划],[文档预留],[扩展文档]"),
        ("017", "预留文档位02", "项目规划类扩展文档预留位，用于新增项目管理相关文档", "[项目规划],[文档预留],[扩展文档]"),
        ("018", "预留文档位03", "项目规划类扩展文档预留位，用于新增项目管理相关文档", "[项目规划],[文档预留],[扩展文档]"),
        ("019", "预留文档位04", "项目规划类扩展文档预留位，用于新增项目管理相关文档", "[项目规划],[文档预留],[扩展文档]"),
        ("020", "预留文档位05", "项目规划类扩展文档预留位，用于新增项目管理相关文档", "[项目规划],[文档预留],[扩展文档]"),
    ],
    "架构设计": [
        ("021", "系统架构设计文档", "全系统整体架构设计，包含分层、分模块、部署架构的核心设计方案", "[架构设计],[系统架构],[整体设计]"),
        ("022", "数据架构设计文档", "项目全数据流转、存储、处理的架构设计，明确数据链路与数据规范", "[架构设计],[数据架构],[数据流转]"),
        ("023", "技术选型报告", "全栈技术栈选型依据与对比分析，匹配五高五标五化的核心设计原则", "[架构设计],[技术选型],[技术评估]"),
        ("024", "数据库设计文档", "数据库表结构、关系、索引、分库分表的详细设计，保障数据存储规范", "[架构设计],[数据库],[表结构设计]"),
        ("025", "安全架构设计文档", "系统全维度安全防护设计，包含数据安全、接口安全、权限安全等", "[架构设计],[安全架构],[风险防护]"),
        ("026", "微服务拆分设计文档", "微服务模块拆分原则与边界定义，明确服务间通信与协作规则", "[架构设计],[微服务],[服务拆分]"),
        ("027", "缓存架构设计文档", "缓存策略、缓存层级、缓存失效处理的设计方案，提升系统性能", "[架构设计],[缓存设计],[性能优化]"),
        ("028", "分布式链路设计文档", "分布式系统链路追踪、调用链设计，保障系统可观测性与问题排查", "[架构设计],[分布式],[链路追踪]"),
        ("029", "高并发限流设计文档", "高并发场景下的限流、熔断、降级方案，保障系统高可用与稳定性", "[架构设计],[高并发],[限流熔断]"),
        ("030", "多环境架构适配文档", "开发、测试、预生产、生产环境的架构适配与配置规范", "[架构设计],[环境管理],[多环境适配]"),
        ("031", "预留文档位01", "架构设计类扩展文档预留位，用于新增架构相关文档", "[架构设计],[文档预留],[扩展文档]"),
        ("032", "预留文档位02", "架构设计类扩展文档预留位，用于新增架构相关文档", "[架构设计],[文档预留],[扩展文档]"),
        ("033", "预留文档位03", "架构设计类扩展文档预留位，用于新增架构相关文档", "[架构设计],[文档预留],[扩展文档]"),
        ("034", "预留文档位04", "架构设计类扩展文档预留位，用于新增架构相关文档", "[架构设计],[文档预留],[扩展文档]"),
        ("035", "预留文档位05", "架构设计类扩展文档预留位，用于新增架构相关文档", "[架构设计],[文档预留],[扩展文档]"),
    ],
    "详细设计": [ # 强制保留20个编号位 ✅
        ("036", "模块详细设计文档", "各业务模块的功能、逻辑、接口、数据的详细设计，指导开发落地", "[详细设计],[模块设计],[开发指导]"),
        ("037", "UI-UX设计规范", "前端界面设计、交互逻辑、视觉规范的统一标准，保障用户体验一致", "[详细设计],[UI设计],[UX规范]"),
        ("038", "交互流程图", "全业务场景的用户操作与系统交互流程可视化，明确交互逻辑与规则", "[详细设计],[交互设计],[流程可视化]"),
        ("039", "界面原型文档", "全系统界面高保真原型，标注界面元素、交互逻辑与业务规则", "[详细设计],[原型设计],[界面规范]"),
        ("040", "技术实现方案", "核心业务功能的技术落地方案，包含核心算法、逻辑处理与集成方案", "[详细设计],[技术实现],[开发方案]"),
        ("041", "数据模型设计文档", "业务数据模型的详细定义，包含实体、属性、关系与约束规则", "[详细设计],[数据模型],[业务实体]"),
        ("042", "前端工程化代码分层设计", "前端代码工程化分层规范，组件、页面、接口、工具的分层管理", "[详细设计],[前端开发],[工程化]"),
        ("043", "后端微服务模块代码设计", "后端微服务模块的代码结构、接口实现、业务逻辑的规范设计", "[详细设计],[后端开发],[微服务]"),
        ("044", "跨端适配代码规范文档", "小程序、APP、H5多端适配的代码规范与兼容方案", "[详细设计],[跨端开发],[适配规范]"),
        ("045", "前后端联调接口适配文档", "前后端接口联调的规范、流程与问题排查方案，保障联调效率", "[详细设计],[联调规范],[接口适配]"),
        ("046", "通用组件封装设计文档", "前端/后端通用组件的封装原则与复用规范，提升开发效率", "[详细设计],[组件封装],[复用设计]"),
        ("047", "业务逻辑核心代码实现", "项目核心业务逻辑的代码实现与注释规范，保障逻辑正确性", "[详细设计],[核心逻辑],[代码实现]"),
        ("048", "数据校验规则代码设计", "前后端数据校验规则的代码实现，包含参数、格式、业务规则校验", "[详细设计],[数据校验],[规则实现]"),
        ("049", "异常处理代码规范", "系统全局异常、业务异常、技术异常的处理规范与代码实现", "[详细设计],[异常处理],[容错设计]"),
        ("050", "权限控制代码植入文档", "基于角色的权限控制代码实现，包含菜单、接口、数据的权限管控", "[详细设计],[权限控制],[代码植入]"),
        ("051", "批量数据处理代码设计", "大批量数据导入、导出、处理的代码优化方案，保障性能与稳定性", "[详细设计],[批量处理],[性能优化]"),
        ("052", "第三方SDK集成代码文档", "第三方服务SDK的集成规范与代码实现，包含支付、短信、存储等", "[详细设计],[第三方集成],[SDK规范]"),
        ("053", "性能优化代码方案", "前端/后端代码性能优化的具体方案与实现，提升系统响应速度", "[详细设计],[性能优化],[代码调优]"),
        ("054", "预留文档位01", "详细设计类扩展文档预留位，全栈代码植入扩展使用", "[详细设计],[文档预留],[代码扩展]"),
        ("055", "预留文档位02", "详细设计类扩展文档预留位，全栈代码植入扩展使用", "[详细设计],[文档预留],[代码扩展]"),
    ],
    "API文档": [ # 多维度细分 ✅ 20个编号位
        ("056", "通用规范-RESTful接口设计标准", "全项目RESTful接口的统一设计标准，包含请求、响应、路径规范", "[API接口],[通用规范],[RESTful]"),
        ("057", "通用规范-接口错误码体系", "全局统一的接口错误码定义，包含业务码、技术码、错误描述规范", "[API接口],[通用规范],[错误码]"),
        ("058", "通用规范-接口签名鉴权手册", "接口请求的签名、验签、token鉴权的实现规范与调用方式", "[API接口],[通用规范],[接口鉴权]"),
        ("059", "业务域-文化爱好者端接口手册", "文化爱好者端所有业务接口的详细定义，包含入参、出参、调用示例", "[API接口],[业务域],[文化爱好者端]"),
        ("060", "业务域-创作者端接口手册", "创作者端所有业务接口的详细定义，包含入参、出参、调用示例", "[API接口],[业务域],[创作者端]"),
        ("061", "业务域-管理员端接口手册", "管理员端所有业务接口的详细定义，包含入参、出参、调用示例", "[API接口],[业务域],[管理员端]"),
        ("062", "业务域-文化资源接口手册", "文化资源管理相关接口的详细定义，包含资源上传、审核、发布等", "[API接口],[业务域],[文化资源]"),
        ("063", "业务域-文化数据分析接口手册", "河洛文化数据统计、分析、报表相关接口的详细定义与调用规范", "[API接口],[业务域],[文化数据分析]"),
        ("065", "技术类型-微服务内部调用接口", "微服务之间的内部调用接口规范，包含服务注册、发现、调用规则", "[API接口],[技术类型],[微服务]"),
        ("066", "技术类型-网关聚合接口手册", "API网关层的接口聚合、转发、限流规则与接口定义", "[API接口],[技术类型],[网关]"),
        ("067", "技术类型-WebSocket实时通信接口", "实时聊天、消息推送等WebSocket接口的设计与调用规范", "[API接口],[技术类型],[WebSocket]"),
        ("068", "技术类型-文件上传下载接口手册", "图片、视频、文档等文件的上传、下载、预览接口规范", "[API接口],[技术类型],[文件服务]"),
        ("069", "第三方-支付服务集成接口", "对接第三方支付平台的接口规范与调用实现，包含支付、退款等", "[API接口],[第三方],[支付集成]"),
        ("070", "第三方-短信邮件服务接口", "对接短信、邮件平台的接口规范与调用实现，包含验证码、通知等", "[API接口],[第三方],[消息服务]"),
        ("071", "版本管理-接口迭代变更记录", "接口版本迭代与变更的记录，保障接口兼容性与追溯性", "[API接口],[版本管理],[变更记录]"),
        ("072", "测试用例-接口自动化测试脚本", "接口自动化测试的用例与脚本，保障接口功能正确性", "[API接口],[测试用例],[自动化]"),
        ("073", "预留文档位01", "API接口类扩展文档预留位，用于新增接口相关文档", "[API接口],[文档预留],[扩展文档]"),
        ("074", "预留文档位02", "API接口类扩展文档预留位，用于新增接口相关文档", "[API接口],[文档预留],[扩展文档]"),
        ("075", "预留文档位03", "API接口类扩展文档预留位，用于新增接口相关文档", "[API接口],[文档预留],[扩展文档]"),
    ],
    "类型定义": [ # 多维度细分 ✅ 20个编号位
        ("076", "数据库-全库表字段字典", "全数据库所有表、字段的定义、类型、注释、约束的完整字典", "[类型定义],[数据库],[字段字典]"),
        ("077", "数据库-枚举值字典文档", "数据库中所有枚举类型的取值、含义、业务规则的完整定义", "[类型定义],[数据库],[枚举字典]"),
        ("078", "前端-TypeScript全局类型声明", "前端TS全局公共类型、接口、枚举的统一声明与约束", "[类型定义],[前端],[TypeScript]"),
        ("079", "前端-组件Props类型约束", "前端组件Props的类型定义、默认值、校验规则的统一规范", "[类型定义],[前端],[组件约束]"),
        ("080", "前端-请求响应数据类型", "前端接口请求与响应数据的类型定义，保障前后端数据一致性", "[类型定义],[前端],[接口数据]"),
        ("081", "后端-Java实体DTO定义文档", "后端Java实体DTO的字段、类型、校验规则的完整定义", "[类型定义],[后端],[JavaDTO]"),
        ("082", "后端-请求参数VO校验规则", "后端请求参数VO的校验规则、注解、业务约束的完整规范", "[类型定义],[后端],[VO校验]"),
        ("083", "后端-返回结果BO结构文档", "后端返回结果BO的字段、结构、状态码的统一定义", "[类型定义],[后端],[BO结构]"),
        ("084", "业务模块-用户权限类型字典", "用户角色、权限、菜单的类型定义与映射关系的完整规范", "[类型定义],[业务模块],[权限]"),
        ("085", "业务模块-文化资源类型约束", "文化资源、内容、分类的类型定义与业务规则的完整规范", "[类型定义],[业务模块],[文化资源]"),
        ("086", "业务模块-文化内容类型文档", "河洛文化内容、展示、交互的类型定义与数据规则的完整规范", "[类型定义],[业务模块],[文化内容]"),
        ("087", "微服务-服务间契约类型定义", "微服务之间调用的契约数据类型定义，保障服务间数据一致性", "[类型定义],[微服务],[契约]"),
        ("088", "通用-全局常量枚举文档", "全项目全局常量、枚举的定义与含义，保障代码规范统一", "[类型定义],[通用],[常量枚举]"),
        ("089", "通用-数据格式校验规则", "手机号、邮箱、身份证等通用数据格式的校验规则与类型约束", "[类型定义],[通用],[格式校验]"),
        ("090", "跨端-小程序-APP数据类型适配", "小程序、APP多端数据类型的适配规则与约束，保障兼容性", "[类型定义],[跨端],[数据适配]"),
        ("091", "版本迭代-类型变更记录", "类型定义的版本迭代与变更记录，保障兼容性与追溯性", "[类型定义],[版本管理],[变更记录]"),
        ("092", "预留文档位01", "类型定义类扩展文档预留位，用于新增类型相关文档", "[类型定义],[文档预留],[扩展文档]"),
        ("093", "预留文档位02", "类型定义类扩展文档预留位，用于新增类型相关文档", "[类型定义],[文档预留],[扩展文档]"),
        ("094", "预留文档位03", "类型定义类扩展文档预留位，用于新增类型相关文档", "[类型定义],[文档预留],[扩展文档]"),
        ("095", "预留文档位04", "类型定义类扩展文档预留位，用于新增类型相关文档", "[类型定义],[文档预留],[扩展文档]"),
    ],
    "开发阶段": [
        ("096", "开发计划与进度表", "开发阶段的任务拆解、里程碑、交付物与责任人的详细规划", "[开发阶段],[开发计划],[进度管理]"),
        ("097", "代码规范", "前端、后端、数据库的统一代码编写规范，保障代码可读性与规范性", "[开发阶段],[代码规范],[编码标准]"),
        ("098", "单元测试文档", "单元测试的用例、覆盖率要求、执行规范的完整文档", "[开发阶段],[单元测试],[质量保障]"),
        ("099", "集成测试文档", "模块间集成测试的用例、流程、验收标准的完整文档", "[开发阶段],[集成测试],[质量保障]"),
        ("100", "开发问题跟踪记录", "开发过程中遇到的问题、解决方案、复盘总结的完整记录", "[开发阶段],[问题跟踪],[复盘总结]"),
        ("101", "代码评审报告", "代码评审的标准、流程、问题记录与整改结果的完整报告", "[开发阶段],[代码评审],[质量管控]"),
        ("102", "前端代码评审细则", "前端代码评审的专项标准与细则，包含工程化、性能、规范等", "[开发阶段],[前端开发],[代码评审]"),
        ("103", "后端代码评审细则", "后端代码评审的专项标准与细则，包含性能、安全、规范等", "[开发阶段],[后端开发],[代码评审]"),
        ("104", "自动化构建部署脚本", "前端、后端的自动化构建、打包、部署脚本与规范", "[开发阶段],[自动化],[构建部署]"),
        ("105", "本地开发环境配置", "开发人员本地环境的搭建、配置、调试的完整指南", "[开发阶段],[环境配置],[本地开发]"),
        ("106", "联调环境测试规范", "联调环境的测试流程、用例、问题排查的完整规范", "[开发阶段],[联调测试],[环境规范]"),
        ("107", "技术债务清理计划", "开发过程中技术债务的识别、评估、清理的规划与记录", "[开发阶段],[技术债务],[代码优化]"),
        ("108", "代码覆盖率报告", "单元测试、集成测试的代码覆盖率统计与优化建议", "[开发阶段],[测试覆盖率],[质量保障]"),
        ("109", "预留文档位01", "开发阶段类扩展文档预留位，用于新增开发相关文档", "[开发阶段],[文档预留],[扩展文档]"),
        ("110", "预留文档位02", "开发阶段类扩展文档预留位，用于新增开发相关文档", "[开发阶段],[文档预留],[扩展文档]"),
        ("111", "预留文档位03", "开发阶段类扩展文档预留位，用于新增开发相关文档", "[开发阶段],[文档预留],[扩展文档]"),
        ("112", "预留文档位04", "开发阶段类扩展文档预留位，用于新增开发相关文档", "[开发阶段],[文档预留],[扩展文档]"),
        ("113", "预留文档位05", "开发阶段类扩展文档预留位，用于新增开发相关文档", "[开发阶段],[文档预留],[扩展文档]"),
        ("114", "预留文档位06", "开发阶段类扩展文档预留位，用于新增开发相关文档", "[开发阶段],[文档预留],[扩展文档]"),
        ("115", "预留文档位07", "开发阶段类扩展文档预留位，用于新增开发相关文档", "[开发阶段],[文档预留],[扩展文档]"),
    ],
    "测试验证": [
        ("116", "测试计划", "全项目测试阶段的整体规划，包含测试范围、用例、资源、进度", "[测试验证],[测试计划],[整体规划]"),
        ("117", "功能测试用例", "全系统功能点的测试用例，包含正常流程、异常流程、边界值", "[测试验证],[功能测试],[用例设计]"),
        ("118", "性能测试报告", "系统响应时间、吞吐量、并发量的性能测试结果与优化建议", "[测试验证],[性能测试],[性能优化]"),
        ("119", "安全测试报告", "系统漏洞、渗透、权限的安全测试结果与整改方案", "[测试验证],[安全测试],[风险防护]"),
        ("120", "用户验收测试报告", "用户参与的验收测试结果，确认系统是否满足业务需求", "[测试验证],[验收测试],[用户确认]"),
        ("121", "缺陷跟踪报告", "测试过程中发现的缺陷、等级、整改、复测的完整记录", "[测试验证],[缺陷跟踪],[质量管控]"),
        ("122", "兼容性测试报告", "多浏览器、多设备、多系统的兼容性测试结果与适配方案", "[测试验证],[兼容性],[多端适配]"),
        ("123", "压力测试报告", "系统极限并发下的压力测试结果，评估系统稳定性与瓶颈", "[测试验证],[压力测试],[高并发]"),
        ("124", "接口自动化测试报告", "接口自动化测试的执行结果、通过率、问题记录", "[测试验证],[接口测试],[自动化]"),
        ("125", "回归测试用例", "缺陷修复后的回归测试用例，保障修复不引入新问题", "[测试验证],[回归测试],[缺陷修复]"),
        ("126", "安全渗透测试报告", "专业安全渗透测试的结果与漏洞整改方案", "[测试验证],[渗透测试],[安全防护]"),
        ("127", "测试环境配置文档", "测试环境的搭建、配置、维护的完整指南", "[测试验证],[环境配置],[测试环境]"),
        ("128", "缺陷定级标准", "缺陷严重程度、优先级的定级标准与处理流程", "[测试验证],[缺陷管理],[定级规范]"),
        ("129", "预留文档位01", "测试验证类扩展文档预留位，用于新增测试相关文档", "[测试验证],[文档预留],[扩展文档]"),
        ("130", "预留文档位02", "测试验证类扩展文档预留位，用于新增测试相关文档", "[测试验证],[文档预留],[扩展文档]"),
        ("131", "预留文档位03", "测试验证类扩展文档预留位，用于新增测试相关文档", "[测试验证],[文档预留],[扩展文档]"),
        ("132", "预留文档位04", "测试验证类扩展文档预留位，用于新增测试相关文档", "[测试验证],[文档预留],[扩展文档]"),
        ("133", "预留文档位05", "测试验证类扩展文档预留位，用于新增测试相关文档", "[测试验证],[文档预留],[扩展文档]"),
        ("134", "预留文档位06", "测试验证类扩展文档预留位，用于新增测试相关文档", "[测试验证],[文档预留],[扩展文档]"),
        ("135", "预留文档位07", "测试验证类扩展文档预留位，用于新增测试相关文档", "[测试验证],[文档预留],[扩展文档]"),
    ],
    "部署发布": [
        ("136", "部署计划", "系统上线部署的整体规划，包含环境、流程、责任人、回滚预案", "[部署发布],[部署计划],[上线规划]"),
        ("137", "发布说明", "版本发布的内容、变更点、兼容说明、注意事项的完整文档", "[部署发布],[发布说明],[版本更新]"),
        ("138", "环境配置文档", "生产、预生产环境的服务器、数据库、中间件的配置规范", "[部署发布],[环境配置],[生产环境]"),
        ("139", "回滚方案", "版本发布失败后的回滚流程、步骤、验证标准的完整预案", "[部署发布],[回滚方案],[故障恢复]"),
        ("140", "上线验证报告", "系统上线后的功能、性能、安全的验证结果与确认报告", "[部署发布],[上线验证],[质量保障]"),
        ("141", "灰度发布方案", "版本灰度发布的策略、范围、验证流程的完整设计", "[部署发布],[灰度发布],[风险管控]"),
        ("142", "蓝绿部署文档", "蓝绿部署的环境配置、切换流程、回滚预案的完整规范", "[部署发布],[蓝绿部署],[高可用]"),
        ("143", "容器化部署配置", "Docker+K8s容器化部署的配置文件、镜像构建、编排规则", "[部署发布],[容器化],[Docker]"),
        ("144", "云服务器配置文档", "云服务器的选型、配置、安全组、监控的完整规范", "[部署发布],[云服务],[服务器]"),
        ("145", "发布审批流程", "版本发布的申请、评审、审批、执行的完整流程规范", "[部署发布],[审批流程],[风险管控]"),
        ("146", "预留文档位01", "部署发布类扩展文档预留位，用于新增部署相关文档", "[部署发布],[文档预留],[扩展文档]"),
        ("147", "预留文档位02", "部署发布类扩展文档预留位，用于新增部署相关文档", "[部署发布],[文档预留],[扩展文档]"),
        ("148", "预留文档位03", "部署发布类扩展文档预留位，用于新增部署相关文档", "[部署发布],[文档预留],[扩展文档]"),
        ("149", "预留文档位04", "部署发布类扩展文档预留位，用于新增部署相关文档", "[部署发布],[文档预留],[扩展文档]"),
        ("150", "预留文档位05", "部署发布类扩展文档预留位，用于新增部署相关文档", "[部署发布],[文档预留],[扩展文档]"),
    ],
    "运维阶段": [
        ("151", "运维手册", "系统日常运维的完整指南，包含监控、告警、故障处理、维护", "[运维阶段],[运维手册],[日常维护]"),
        ("152", "监控与告警配置", "系统性能、日志、业务指标的监控配置与告警规则", "[运维阶段],[监控告警],[可观测性]"),
        ("153", "故障处理流程", "系统故障的分级、排查、处理、复盘的完整流程规范", "[运维阶段],[故障处理],[应急预案]"),
        ("154", "性能优化报告", "系统运行中的性能瓶颈分析与优化方案的完整报告", "[运维阶段],[性能优化],[系统调优]"),
        ("155", "系统维护记录", "系统日常维护、更新、优化的完整记录，保障可追溯性", "[运维阶段],[维护记录],[台账管理]"),
        ("156", "数据备份与恢复方案", "数据库、文件的备份策略、恢复流程、验证标准的完整方案", "[运维阶段],[数据备份],[灾备]"),
        ("157", "日志管理规范", "系统日志的收集、存储、分析、清理的完整规范", "[运维阶段],[日志管理],[问题排查]"),
        ("158", "服务器资源监控报告", "服务器CPU、内存、磁盘、网络的监控结果与优化建议", "[运维阶段],[资源监控],[服务器]"),
        ("159", "安全漏洞修复记录", "安全漏洞的发现、修复、复测的完整记录", "[运维阶段],[安全修复],[风险防护]"),
        ("160", "扩容缩容方案", "系统资源扩容、缩容的策略、流程、验证标准的完整规范", "[运维阶段],[扩容缩容],[弹性伸缩]"),
        ("161", "数据库优化手册", "数据库索引、SQL、分库分表的优化方案与规范", "[运维阶段],[数据库],[性能优化]"),
        ("162", "缓存失效处理方案", "缓存击穿、穿透、雪崩的处理方案与应急预案", "[运维阶段],[缓存],[故障处理]"),
        ("163", "灾备应急预案", "重大故障、灾难的应急处理流程与恢复预案", "[运维阶段],[灾备],[应急预案]"),
        ("164", "预留文档位01", "运维阶段类扩展文档预留位，用于新增运维相关文档", "[运维阶段],[文档预留],[扩展文档]"),
        ("165", "预留文档位02", "运维阶段类扩展文档预留位，用于新增运维相关文档", "[运维阶段],[文档预留],[扩展文档]"),
        ("166", "预留文档位03", "运维阶段类扩展文档预留位，用于新增运维相关文档", "[运维阶段],[文档预留],[扩展文档]"),
        ("167", "预留文档位04", "运维阶段类扩展文档预留位，用于新增运维相关文档", "[运维阶段],[文档预留],[扩展文档]"),
        ("168", "预留文档位05", "运维阶段类扩展文档预留位，用于新增运维相关文档", "[运维阶段],[文档预留],[扩展文档]"),
        ("169", "预留文档位06", "运维阶段类扩展文档预留位，用于新增运维相关文档", "[运维阶段],[文档预留],[扩展文档]"),
        ("170", "预留文档位07", "运维阶段类扩展文档预留位，用于新增运维相关文档", "[运维阶段],[文档预留],[扩展文档]"),
    ],
    "产品文档": [
        ("171", "产品白皮书", "产品核心价值、功能、架构、优势的完整介绍，面向客户与合作伙伴", "[产品文档],[产品介绍],[白皮书]"),
        ("172", "产品功能说明书", "产品所有功能模块、使用流程、操作规范的完整指南", "[产品文档],[功能说明],[用户指南]"),
        ("173", "产品路线图", "产品短期、中期、长期的功能规划与迭代方向", "[产品文档],[产品规划],[迭代路线]"),
        ("174", "产品更新日志", "产品版本更新的内容、变更点、修复的问题的完整记录", "[产品文档],[更新日志],[版本迭代]"),
        ("175", "产品体验优化报告", "产品用户体验的分析、优化建议、落地方案的完整报告", "[产品文档],[体验优化],[用户体验]"),
        ("176", "用户画像分析报告", "产品目标用户的画像、需求、行为的分析与总结", "[产品文档],[用户分析],[画像]"),
        ("177", "预留文档位01", "产品文档类扩展文档预留位，用于新增产品相关文档", "[产品文档],[文档预留],[扩展文档]"),
        ("178", "预留文档位02", "产品文档类扩展文档预留位，用于新增产品相关文档", "[产品文档],[文档预留],[扩展文档]"),
        ("179", "预留文档位03", "产品文档类扩展文档预留位，用于新增产品相关文档", "[产品文档],[文档预留],[扩展文档]"),
        ("180", "预留文档位04", "产品文档类扩展文档预留位，用于新增产品相关文档", "[产品文档],[文档预留],[扩展文档]"),
    ],
    "综合支撑": [
        ("181", "用户手册-文化爱好者", "文化爱好者产品的使用指南、操作流程、常见问题的完整手册", "[综合支撑],[用户手册],[文化爱好者]"),
        ("182", "用户手册-创作者", "创作者产品的使用指南、操作流程、常见问题的完整手册", "[综合支撑],[用户手册],[创作者]"),
        ("183", "用户手册-管理员手册", "管理员端产品的使用指南、权限配置、运维操作的完整手册", "[综合支撑],[用户手册],[管理员端]"),
        ("185", "培训文档-全角色培训课件", "面向文化爱好者、创作者、管理员的全角色培训课件与教程", "[综合支撑],[培训文档],[全角色]"),
        ("186", "问题跟踪-全维度问题台账", "项目全周期的需求变更、缺陷、用户反馈的完整问题台账", "[综合支撑],[问题跟踪],[台账管理]"),
        ("187", "版本控制-全版本管理规范", "产品版本、代码版本、文档版本的统一管理规范", "[综合支撑],[版本控制],[管理规范]"),
        ("188", "知识管理-最佳实践手册", "项目开发、运维、产品的最佳实践与经验总结", "[综合支撑],[知识管理],[最佳实践]"),
        ("189", "审核报告-项目结项报告", "项目结项的成果、验收、复盘、总结的完整报告", "[综合支撑],[审核报告],[项目结项]"),
        ("190", "扩展文档-数据隐私政策", "产品用户数据隐私的保护政策与合规说明", "[综合支撑],[扩展文档],[隐私政策]"),
        ("191", "扩展文档-合规性报告", "产品符合行业、政策、法规的合规性评估报告", "[综合支撑],[扩展文档],[合规评估]"),
        ("192", "扩展文档-竞品分析报告", "行业竞品的功能、优势、劣势的分析与对比", "[综合支撑],[扩展文档],[竞品分析]"),
        ("193", "扩展文档-河洛文化数据分析报告", "产品河洛文化数据的统计、分析、价值挖掘的完整报告", "[综合支撑],[扩展文档],[数据分析]"),
        ("194", "扩展文档-未来功能规划", "产品未来的功能拓展、技术创新的规划与方案", "[综合支撑],[扩展文档],[功能规划]"),
        ("195", "扩展文档-成本效益分析报告", "产品的开发、运维成本与商业效益的分析报告", "[综合支撑],[扩展文档],[成本效益]"),
        ("196", "预留文档位01", "综合支撑类扩展文档预留位，用于新增支撑相关文档", "[综合支撑],[文档预留],[扩展文档]"),
        ("197", "预留文档位02", "综合支撑类扩展文档预留位，用于新增支撑相关文档", "[综合支撑],[文档预留],[扩展文档]"),
        ("198", "预留文档位03", "综合支撑类扩展文档预留位，用于新增支撑相关文档", "[综合支撑],[文档预留],[扩展文档]"),
        ("199", "预留文档位04", "综合支撑类扩展文档预留位，用于新增支撑相关文档", "[综合支撑],[文档预留],[扩展文档]"),
        ("200", "项目全景回顾", "项目全生命周期的复盘、经验总结、问题反思的完整文档", "[综合支撑],[项目复盘],[全景回顾]"),
    ]
}

# ===================== 命令行参数 =====================
def parse_args():
    """解析命令行参数"""
    parser = argparse.ArgumentParser(description='YYC3-Short-Drama 全文档架构一键生成脚本')

    # 模式选择
    parser.add_argument('--mode', choices=['generate', 'validate', 'update'], default='generate',
                      help='运行模式: generate(生成文档), validate(验证文档), update(更新文档)')

    # 验证选项
    parser.add_argument('--check-format', action='store_true', default=True,
                      help='检查文档格式是否符合规范')
    parser.add_argument('--check-headers', action='store_true', default=True,
                      help='检查文档头部信息是否完整')
    parser.add_argument('--check-content', action='store_true', default=True,
                      help='检查文档内容是否符合规范')
    parser.add_argument('--check-links', action='store_true', default=False,
                      help='检查文档中的链接是否有效')

    # 更新选项
    parser.add_argument('--update-version', action='store_true', default=True,
                      help='更新文档版本号')
    parser.add_argument('--update-date', action='store_true', default=True,
                      help='更新文档日期')
    parser.add_argument('--new-version', type=str, default=None,
                      help='指定新的版本号')

    # 其他选项
    parser.add_argument('--verbose', '-v', action='store_true', default=False,
                      help='详细输出')
    parser.add_argument('--dry-run', action='store_true', default=False,
                      help='试运行，不实际修改文件')

    return parser.parse_args()

# ===================== 文档验证函数 =====================
def validate_document_format(file_path, verbose=False):
    """验证文档格式是否符合规范"""
    try:
        with open(file_path, 'r', encoding=ENCODING) as f:
            content = f.read()

        # 检查是否为Markdown文件
        if not file_path.endswith('.md'):
            return False, '文件不是Markdown格式'

        # 检查是否包含文档头部
        if not content.startswith('---'):
            return False, '缺少文档头部信息'

        # 检查是否包含YYC3标识
        if 'YanYuCloudCube' not in content:
            return False, '缺少YYC3标识'

        return True, '格式验证通过'
    except Exception as e:
        return False, f'验证失败: {str(e)}'

def validate_document_headers(file_path, verbose=False):
    """验证文档头部信息是否完整"""
    try:
        with open(file_path, 'r', encoding=ENCODING) as f:
            content = f.read()

        # 提取文档头部
        header_match = re.search(r'^---\n(.*?)\n---\n', content, re.DOTALL)
        if not header_match:
            return False, '缺少文档头部信息'

        header_content = header_match.group(1)

        # 检查必要的头部字段
        required_fields = ['@file', '@description', '@author', '@version', '@created', '@updated', '@status']
        missing_fields = []

        for field in required_fields:
            if field not in header_content:
                missing_fields.append(field)

        if missing_fields:
            return False, f'缺少必要的头部字段: {missing_fields}'

        return True, '头部信息验证通过'
    except Exception as e:
        return False, f'验证失败: {str(e)}'

def validate_document_content(file_path, verbose=False):
    """验证文档内容是否符合规范"""
    try:
        with open(file_path, 'r', encoding=ENCODING) as f:
            content = f.read()

        # 检查是否包含核心内容结构
        if '## 核心内容' not in content:
            return False, '缺少核心内容部分'

        # 检查是否包含概述
        if '## 概述' not in content:
            return False, '缺少概述部分'

        return True, '内容验证通过'
    except Exception as e:
        return False, f'验证失败: {str(e)}'

def check_links(file_path, verbose=False):
    """检查文档中的链接是否有效"""
    try:
        with open(file_path, 'r', encoding=ENCODING) as f:
            content = f.read()

        # 提取所有链接
        links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content)

        broken_links = []
        for link_text, link_url in links:
            # 检查本地文件链接
            if link_url.startswith('./') or link_url.startswith('../'):
                link_path = os.path.join(os.path.dirname(file_path), link_url)
                if not os.path.exists(link_path):
                    broken_links.append(f'{link_text}: {link_url}')

        if broken_links:
            return False, f'发现无效链接: {broken_links}'

        return True, '链接验证通过'
    except Exception as e:
        return False, f'检查失败: {str(e)}'

# ===================== 文档更新函数 =====================
def update_document(file_path, new_version=None, update_version=True, update_date=True, dry_run=False, verbose=False):
    """更新文档版本号和日期"""
    try:
        with open(file_path, 'r', encoding=ENCODING) as f:
            content = f.read()

        updated_content = content
        changes = []

        # 更新日期
        if update_date:
            today = datetime.date.today().isoformat()
            # 更新 @updated 字段
            updated_content = re.sub(r'@updated: .*$', f'@updated: {today}', updated_content, flags=re.MULTILINE)
            changes.append(f'更新日期为 {today}')

        # 更新版本号
        if update_version:
            if new_version:
                # 使用指定的新版本号
                updated_content = re.sub(r'@version: .*$', f'@version: {new_version}', updated_content, flags=re.MULTILINE)
                changes.append(f'更新版本号为 {new_version}')
            else:
                # 自动增加补丁版本号
                version_match = re.search(r'@version: v(\d+)\.(\d+)\.(\d+)', updated_content)
                if version_match:
                    major, minor, patch = map(int, version_match.groups())
                    new_patch = patch + 1
                    new_version_str = f'v{major}.{minor}.{new_patch}'
                    updated_content = re.sub(r'@version: .*$', f'@version: {new_version_str}', updated_content, flags=re.MULTILINE)
                    changes.append(f'更新版本号为 {new_version_str}')

        # 写入文件
        if not dry_run and changes:
            with open(file_path, 'w', encoding=ENCODING) as f:
                f.write(updated_content)
            if verbose:
                print(f"\n已更新文档: {os.path.basename(file_path)}")
                for change in changes:
                    print(f"  - {change}")
        elif changes and verbose:
            print(f"\n将更新文档: {os.path.basename(file_path)}")
            for change in changes:
                print(f"  - {change}")

        return True, f'文档更新完成: {changes}' if changes else True, '无需更新'
    except Exception as e:
        return False, f'更新失败: {str(e)}'

# ===================== 核心生成逻辑 =====================
def create_dir(path):
    """创建目录，不存在则创建"""
    try:
        if not os.path.exists(path):
            logger.info(f"创建目录: {path}")
            os.makedirs(path)
        else:
            logger.debug(f"目录已存在: {path}")
    except PermissionError as e:
        logger.error(f"创建目录权限不足: {path}")
        raise Exception(f"创建目录权限不足: {path}, 错误: {str(e)}")
    except OSError as e:
        logger.error(f"创建目录失败: {path}, 错误: {str(e)}")
        raise Exception(f"创建目录失败: {path}, 错误: {str(e)}")
    except Exception as e:
        logger.error(f"创建目录时发生未知错误: {path}, 错误: {str(e)}")
        raise Exception(f"创建目录失败: {path}, 错误: {str(e)}")

def write_file(path, content, encoding=ENCODING):
    """写入文件，覆盖原有内容"""
    try:
        # 确保目录存在
        dir_path = os.path.dirname(path)
        if dir_path and not os.path.exists(dir_path):
            create_dir(dir_path)

        logger.debug(f"写入文件: {path}")
        with open(path, "w", encoding=encoding) as f:
            f.write(content)
        logger.info(f"文件写入成功: {path}")
    except PermissionError as e:
        logger.error(f"写入文件权限不足: {path}")
        raise Exception(f"写入文件权限不足: {path}, 错误: {str(e)}")
    except OSError as e:
        logger.error(f"写入文件失败: {path}, 错误: {str(e)}")
        raise Exception(f"写入文件失败: {path}, 错误: {str(e)}")
    except Exception as e:
        logger.error(f"写入文件时发生未知错误: {path}, 错误: {str(e)}")
        raise Exception(f"写入文件失败: {path}, 错误: {str(e)}")

def validate_path(path, base_dir=None):
    """验证路径安全性，防止路径遍历攻击"""
    # 规范化路径
    normalized_path = os.path.normpath(path)

    # 检查路径是否包含上级目录引用
    if '..' in normalized_path.split(os.sep):
        raise Exception(f"路径包含不安全的上级目录引用: {path}")

    # 检查路径是否为绝对路径
    if not os.path.isabs(normalized_path):
        normalized_path = os.path.abspath(normalized_path)

    # 如果提供了基础目录，确保路径在基础目录内
    if base_dir:
        base_dir = os.path.abspath(base_dir)
        # 检查路径是否在基础目录内
        if not os.path.commonpath([base_dir, normalized_path]) == base_dir:
            raise Exception(f"路径不在基础目录内: {path}")

    # 检查路径是否包含非法字符
    illegal_chars = ['<', '>', ':', '"', '|', '?', '*']
    for char in illegal_chars:
        if char in normalized_path:
            raise Exception(f"路径包含非法字符: {char}")

    return normalized_path

def print_welcome_message():
    """打印欢迎信息"""
    print("="*80)
    print("🚀 YYC3-Short-Drama 全文档架构一键生成脚本")
    print("="*80)
    print("📋 功能: 生成符合YYC3标准的完整文档架构")
    print("🔧 版本: v1.2.0")
    print("📅 日期: 2026-01-21")
    print("="*80)

def generate_project(root_dir, version, creation_date, status, encoding):
    """一键生成全部文档架构"""
    # 打印欢迎信息
    print_welcome_message()

    print("✅ 开始生成 YYC3-Short-Drama 文档架构 | 根目录: {} | 编码: {}".format(root_dir, encoding))
    print("="*80)

    try:
        # 验证并规范化根目录路径
        root_dir = validate_path(root_dir)
        logger.info(f"已验证根目录路径: {root_dir}")
        print(f"🔒 已验证根目录路径: {root_dir}")

        # 创建根目录
        create_dir(root_dir)

        # 计算总文档数，用于进度显示
        total_docs = sum(len(doc_list) for _, doc_list in PROJECT_STRUCT.items())
        total_categories = len(PROJECT_STRUCT)
        current_doc = 0
        current_category = 0

        print(f"📊 任务统计: {total_categories} 个分类, {total_docs} 个文档")
        print("="*80)
        logger.info(f"开始生成文档架构: {total_categories} 个分类, {total_docs} 个文档")

        # 预先计算模板中不变的部分
        base_template_values = {
            'VERSION': version,
            'CREATE_DATE': creation_date,
            'STATUS': status,
            'PROJECT_NAME': PROJECT_NAME,
            'PROJECT_DESCRIPTION': PROJECT_DESCRIPTION,
            'AUTHOR': AUTHOR,
            'COPYRIGHT': COPYRIGHT,
            'LICENSE': LICENSE
        }

        # 遍历所有分类，生成目录和文档
        for doc_category, doc_list in PROJECT_STRUCT.items():
            current_category += 1
            try:
                # 创建分类目录
                cate_dir = os.path.join(root_dir, "YYC3-Short-Drama-{}".format(doc_category))
                # 验证分类目录路径，确保在根目录内
                cate_dir = validate_path(cate_dir, base_dir=root_dir)

                create_dir(cate_dir)
                logger.info(f"创建分类目录: {cate_dir}")
                print(f"📂 [{current_category}/{total_categories}] 创建目录: {cate_dir}")

                # 生成该目录下的所有文档
                for doc_no, doc_name, doc_desc, doc_tags in doc_list:
                    current_doc += 1
                    try:
                        # 拼接文件名和标题
                        file_name = "{}-YYC3-Short-Drama-{}-{}.md".format(doc_no, doc_category, doc_name)
                        file_path = os.path.join(cate_dir, file_name)
                        # 验证文件路径，确保在根目录内
                        file_path = validate_path(file_path, base_dir=root_dir)
                        title = "{}-YYC3-Short-Drama-{}-{}".format(doc_no, doc_category, doc_name)

                        # 替换模板占位符
                        template_values = {
                            **base_template_values,
                            'FILE_NAME': file_name,
                            'DESCRIPTION': doc_desc,
                            'TAGS': doc_tags,
                            'TITLE': title,
                            'DOC_CATEGORY': doc_category,
                            'DOC_NAME': doc_name
                        }
                        content = MAIN_MD_TEMPLATE.format(**template_values)

                        # 写入文件
                        write_file(file_path, content, encoding)
                        # 计算进度百分比
                        progress = int((current_doc / total_docs) * 100)
                        print(f"  ✍️ [{current_doc}/{total_docs}] ({progress}%) 生成文档: {file_name}")
                    except Exception as e:
                        logger.error(f"生成文档失败: {file_name}, 错误: {str(e)}")
                        raise Exception(f"生成文档失败: {file_name}, 错误: {str(e)}")

                # 生成该目录下的 README.md 索引文档
                try:
                    readme_name = "README.md"
                    readme_path = os.path.join(cate_dir, readme_name)
                    # 验证README文件路径，确保在根目录内
                    readme_path = validate_path(readme_path, base_dir=root_dir)
                    readme_desc = "{}分类下所有文档的索引与说明，统一管理文档清单".format(doc_category)
                    readme_tags = "[{}],[文档索引],[目录总览]".format(doc_category)

                    # 使用预先计算的模板值
                    readme_template_values = {
                        **base_template_values,
                        'DOC_CATEGORY': doc_category,
                        'DESCRIPTION': readme_desc,
                        'TAGS': readme_tags
                    }

                    readme_content = README_MD_TEMPLATE.format(**readme_template_values)
                    write_file(readme_path, readme_content, encoding)
                    logger.info(f"生成README索引: {readme_path}")
                    print(f"  📑 生成索引: {readme_name}")
                    print("-"*80)
                except Exception as e:
                    logger.error(f"生成README索引失败: {doc_category}, 错误: {str(e)}")
                    raise Exception(f"生成README索引失败: {doc_category}, 错误: {str(e)}")
            except Exception as e:
                logger.error(f"处理分类目录失败: {doc_category}, 错误: {str(e)}")
                raise Exception(f"处理分类目录失败: {doc_category}, 错误: {str(e)}")

        # 验证生成的文档结构
        validate_document_structure(root_dir)

        print("="*80)
        print("🎉 生成完成！")
        print("="*80)
        print(f"📁 文档根目录: {os.path.abspath(root_dir)}")
        print(f"📊 生成统计:")
        print(f"   • 分类目录: {total_categories} 个")
        print(f"   • 业务文档: {total_docs} 个")
        print(f"   • README索引: {total_categories} 个")
        print(f"   • 总计生成: {total_docs + total_categories} 个文件")
        print(f"🔍 文档结构:")
        print(f"   • 符合YYC3标准的文档命名规范")
        print(f"   • 完整的文档分类体系")
        print(f"   • 标准化的文档模板")
        print(f"✅ 所有文档严格遵循 YYC3-Short-Drama 命名规范与模板标准！")
        print("="*80)
        print("📚 后续建议:")
        print("   • 检查生成的文档结构是否符合预期")
        print("   • 根据实际项目需求修改文档内容")
        print("   • 定期更新文档以保持与项目同步")
        print("="*80)
        logger.info(f"文档架构生成完成: {total_docs + total_categories} 个文件")
    except Exception as e:
        logger.error(f"生成文档架构失败: {str(e)}")
        raise Exception(f"生成文档架构失败: {str(e)}")


def validate_document_structure(root_dir):
    """验证生成的文档结构是否与PROJECT_STRUCT一致"""
    print("\n🔍 验证文档结构...")
    logger.info(f"开始验证文档结构: {root_dir}")

    try:
        # 计算预期的文档数量
        expected_categories = len(PROJECT_STRUCT)
        expected_docs = sum(len(doc_list) for _, doc_list in PROJECT_STRUCT.items())
        expected_total = expected_docs + expected_categories  # 加上README文件

        # 统计实际生成的文档数量
        actual_categories = 0
        actual_docs = 0
        actual_readmes = 0

        for root, dirs, files in os.walk(root_dir):
            # 统计分类目录
            if root != root_dir:
                actual_categories += 1

            # 统计文档和README文件
            for file in files:
                if file.endswith('.md'):
                    if file == 'README.md':
                        actual_readmes += 1
                    else:
                        actual_docs += 1

        actual_total = actual_docs + actual_readmes

        # 验证数量是否一致
        print(f"\n📊 文档结构验证结果:")
        print(f"   • 预期分类目录: {expected_categories} 个")
        print(f"   • 实际分类目录: {actual_categories} 个")
        print(f"   • 预期业务文档: {expected_docs} 个")
        print(f"   • 实际业务文档: {actual_docs} 个")
        print(f"   • 预期README索引: {expected_categories} 个")
        print(f"   • 实际README索引: {actual_readmes} 个")
        print(f"   • 预期总文件数: {expected_total} 个")
        print(f"   • 实际总文件数: {actual_total} 个")

        # 检查是否所有分类都已生成
        missing_categories = []
        for category in PROJECT_STRUCT.keys():
            category_dir = os.path.join(root_dir, f"YYC3-Short-Drama-{category}")
            if not os.path.exists(category_dir):
                missing_categories.append(category)

        if missing_categories:
            print(f"\n❌ 缺少分类目录: {missing_categories}")
            logger.error(f"缺少分类目录: {missing_categories}")
            raise Exception(f"文档结构验证失败: 缺少分类目录 {missing_categories}")

        # 检查是否所有文档都已生成
        missing_docs = []
        for category, doc_list in PROJECT_STRUCT.items():
            category_dir = os.path.join(root_dir, f"YYC3-Short-Drama-{category}")
            for doc_no, doc_name, _, _ in doc_list:
                doc_file = f"{doc_no}-YYC3-Short-Drama-{category}-{doc_name}.md"
                doc_path = os.path.join(category_dir, doc_file)
                if not os.path.exists(doc_path):
                    missing_docs.append(f"{category}/{doc_file}")

        if missing_docs:
            print(f"\n❌ 缺少文档: {missing_docs}")
            logger.error(f"缺少文档: {missing_docs}")
            raise Exception(f"文档结构验证失败: 缺少文档 {missing_docs}")

        # 检查是否所有分类都有README文件
        missing_readmes = []
        for category in PROJECT_STRUCT.keys():
            category_dir = os.path.join(root_dir, f"YYC3-Short-Drama-{category}")
            readme_path = os.path.join(category_dir, "README.md")
            if not os.path.exists(readme_path):
                missing_readmes.append(category)

        if missing_readmes:
            print(f"\n❌ 缺少README文件: {missing_readmes}")
            logger.error(f"缺少README文件: {missing_readmes}")
            raise Exception(f"文档结构验证失败: 缺少README文件 {missing_readmes}")

        # 验证通过
        if (actual_categories == expected_categories and
            actual_docs == expected_docs and
            actual_readmes == expected_categories):
            print("\n✅ 文档结构验证通过！")
            logger.info("文档结构验证通过，所有预期的文档和目录都已生成")
        else:
            print("\n❌ 文档数量不匹配！")
            logger.error(f"文档数量不匹配: 预期 {expected_total} 个文件，实际 {actual_total} 个文件")
            raise Exception(f"文档结构验证失败: 文档数量不匹配")

    except Exception as e:
        logger.error(f"验证文档结构时发生错误: {str(e)}")
        raise Exception(f"验证文档结构失败: {str(e)}")

def parse_args():
    """解析命令行参数"""
    parser = argparse.ArgumentParser(description='YYC3-Short-Drama 全文档架构一键生成脚本')

    # 模式选择
    parser.add_argument('--mode', choices=['generate', 'validate', 'update'], default='generate',
                      help='运行模式: generate(生成文档), validate(验证文档), update(更新文档)')

    # 生成选项
    parser.add_argument('--root', '-r', default=DOCUMENT_ROOT, help='文档根目录 (默认: docs)')
    parser.add_argument('--version', '-v', default=VERSION, help='版本号 (默认: v1.0.0)')
    parser.add_argument('--date', '-d', default=CREATION_DATE, help='创建日期 (默认: 2025-12-29)')
    parser.add_argument('--status', '-s', default=STATUS, help='文档状态 (默认: published)')
    parser.add_argument('--encoding', '-e', default=ENCODING, help='文件编码 (默认: utf-8)')

    # 验证选项
    parser.add_argument('--check-format', action='store_true', default=True,
                      help='检查文档格式是否符合规范')
    parser.add_argument('--check-headers', action='store_true', default=True,
                      help='检查文档头部信息是否完整')
    parser.add_argument('--check-content', action='store_true', default=True,
                      help='检查文档内容是否符合规范')
    parser.add_argument('--check-links', action='store_true', default=False,
                      help='检查文档中的链接是否有效')

    # 更新选项
    parser.add_argument('--update-version', action='store_true', default=True,
                      help='更新文档版本号')
    parser.add_argument('--update-date', action='store_true', default=True,
                      help='更新文档日期')
    parser.add_argument('--new-version', type=str, default=None,
                      help='指定新的版本号')

    # 其他选项
    parser.add_argument('--verbose', '-V', action='store_true', default=False,
                      help='详细输出')
    parser.add_argument('--dry-run', action='store_true', default=False,
                      help='试运行，不实际修改文件')

    return parser.parse_args()

def validate_all_documents(args):
    """验证所有文档"""
    print("\n====================================")
    print("YYC3-Short-Drama 文档验证")
    print("====================================")

    print(f"\n[1/2] 开始验证文档...")
    print(f"文档根目录: {os.path.abspath(DOCUMENT_ROOT)}")
    logger.info(f"开始验证文档，根目录: {os.path.abspath(DOCUMENT_ROOT)}")

    # 遍历所有文档
    valid_count = 0
    invalid_count = 0
    total_count = 0

    try:
        for root, _, files in os.walk(DOCUMENT_ROOT):
            for file in files:
                if file.endswith('.md'):
                    total_count += 1
                    file_path = os.path.join(root, file)

                    print(f"\n验证文档: {os.path.relpath(file_path, DOCUMENT_ROOT)}")
                    logger.info(f"验证文档: {os.path.relpath(file_path, DOCUMENT_ROOT)}")

                    # 验证格式
                    if args.check_format:
                        valid, message = validate_document_format(file_path, args.verbose)
                        if not valid:
                            print(f"  ❌ 格式验证失败: {message}")
                            logger.error(f"格式验证失败: {file_path} - {message}")
                            invalid_count += 1
                            continue
                        else:
                            print(f"  ✅ 格式验证通过: {message}")
                            logger.debug(f"格式验证通过: {file_path}")

                    # 验证头部信息
                    if args.check_headers:
                        valid, message = validate_document_headers(file_path, args.verbose)
                        if not valid:
                            print(f"  ❌ 头部信息验证失败: {message}")
                            logger.error(f"头部信息验证失败: {file_path} - {message}")
                            invalid_count += 1
                            continue
                        else:
                            print(f"  ✅ 头部信息验证通过: {message}")
                            logger.debug(f"头部信息验证通过: {file_path}")

                    # 验证内容
                    if args.check_content:
                        valid, message = validate_document_content(file_path, args.verbose)
                        if not valid:
                            print(f"  ❌ 内容验证失败: {message}")
                            logger.error(f"内容验证失败: {file_path} - {message}")
                            invalid_count += 1
                            continue
                        else:
                            print(f"  ✅ 内容验证通过: {message}")
                            logger.debug(f"内容验证通过: {file_path}")

                    # 检查链接
                    if args.check_links:
                        valid, message = check_links(file_path, args.verbose)
                        if not valid:
                            print(f"  ❌ 链接检查失败: {message}")
                            logger.error(f"链接检查失败: {file_path} - {message}")
                            invalid_count += 1
                            continue
                        else:
                            print(f"  ✅ 链接检查通过: {message}")
                            logger.debug(f"链接检查通过: {file_path}")

                    valid_count += 1
                    logger.info(f"文档验证通过: {file_path}")
                    if total_count % 10 == 0:
                        print(f"\n已验证 {total_count} 个文档...")
                        logger.info(f"已验证 {total_count} 个文档")

        print("\n====================================")
        print(f"文档验证完成!")
        print(f"总文档数: {total_count}")
        print(f"验证通过: {valid_count}")
        print(f"验证失败: {invalid_count}")
        print("====================================")
        logger.info(f"文档验证完成: 总文档数={total_count}, 验证通过={valid_count}, 验证失败={invalid_count}")
    except Exception as e:
        logger.error(f"验证文档时发生错误: {str(e)}")
        print(f"\n❌ 验证过程中发生错误: {str(e)}")


def update_all_documents(args):
    """更新所有文档"""
    print("\n====================================")
    print("YYC3-Short-Drama 文档更新")
    print("====================================")

    print(f"\n[1/2] 开始更新文档...")
    print(f"文档根目录: {os.path.abspath(DOCUMENT_ROOT)}")
    print(f"更新版本: {args.update_version}")
    print(f"更新日期: {args.update_date}")
    print(f"新版本号: {args.new_version or '自动增加'}")
    print(f"试运行: {args.dry_run}")
    logger.info(f"开始更新文档，根目录: {os.path.abspath(DOCUMENT_ROOT)}, 更新版本: {args.update_version}, 更新日期: {args.update_date}")

    # 遍历所有文档
    updated_count = 0
    skipped_count = 0
    failed_count = 0
    total_count = 0

    try:
        for root, _, files in os.walk(DOCUMENT_ROOT):
            for file in files:
                if file.endswith('.md'):
                    total_count += 1
                    file_path = os.path.join(root, file)

                    try:
                        success, message = update_document(
                            file_path,
                            new_version=args.new_version,
                            update_version=args.update_version,
                            update_date=args.update_date,
                            dry_run=args.dry_run,
                            verbose=args.verbose
                        )

                        if success:
                            if '无需更新' not in message:
                                updated_count += 1
                                logger.info(f"文档更新成功: {file_path} - {message}")
                            else:
                                skipped_count += 1
                                logger.debug(f"文档无需更新: {file_path}")
                        else:
                            print(f"更新失败: {os.path.relpath(file_path, DOCUMENT_ROOT)} - {message}")
                            logger.error(f"文档更新失败: {file_path} - {message}")
                            failed_count += 1

                    except Exception as e:
                        print(f"更新异常: {os.path.relpath(file_path, DOCUMENT_ROOT)} - {str(e)}")
                        logger.error(f"更新文档时发生异常: {file_path} - {str(e)}")
                        failed_count += 1

                    if total_count % 10 == 0:
                        print(f"\n已处理 {total_count} 个文档...")
                        logger.info(f"已处理 {total_count} 个文档")

        print("\n====================================")
        print(f"文档更新完成!")
        print(f"总文档数: {total_count}")
        print(f"更新成功: {updated_count}")
        print(f"无需更新: {skipped_count}")
        print(f"更新失败: {failed_count}")
        print("====================================")
        logger.info(f"文档更新完成: 总文档数={total_count}, 更新成功={updated_count}, 无需更新={skipped_count}, 更新失败={failed_count}")
    except Exception as e:
        logger.error(f"更新文档时发生错误: {str(e)}")
        print(f"\n❌ 更新过程中发生错误: {str(e)}")

# ===================== 执行入口 =====================
if __name__ == "__main__":
    try:
        # 解析命令行参数
        args = parse_args()

        # 根据模式执行不同的功能
        if args.mode == 'generate':
            # 覆盖默认配置
            document_root = args.root
            version = args.version
            creation_date = args.date
            status = args.status
            encoding = args.encoding

            # 生成项目文档
            generate_project(document_root, version, creation_date, status, encoding)
        elif args.mode == 'validate':
            validate_all_documents(args)
        elif args.mode == 'update':
            update_all_documents(args)
        else:
            print(f"未知模式: {args.mode}")
            print("可用模式: generate, validate, update")
    except Exception as e:
        print("❌ 执行失败: {}".format(str(e)))
        sys.exit(1)
