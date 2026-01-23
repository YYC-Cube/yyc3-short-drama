---
@file: 152-YYC3-Short-Drama-运维阶段-监控与告警配置.md
@description: YYC3-Short-Drama 系统性能、日志、业务指标的监控配置与告警规则
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [运维阶段],[监控告警],[可观测性]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 152-YYC3-Short-Drama-运维阶段-监控与告警配置

## 概述

本文档详细描述YYC3-Short-Drama-运维阶段-监控与告警配置相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范监控与告警配置相关的业务标准与技术落地要求
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

### 3. 监控与告警配置

#### 3.1 监控架构

**监控体系**

```
┌─────────────────────────────────────────────────────────┐
│                    监控层                            │
├─────────────────────────────────────────────────────────┤
│  Prometheus  │  Grafana  │  AlertManager  │  ELK   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    数据层                            │
├─────────────────────────────────────────────────────────┤
│  应用监控  │  系统监控  │  业务监控  │  日志监控 │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    目标层                            │
├─────────────────────────────────────────────────────────┤
│  应用服务  │  数据库  │  缓存  │  消息队列  │
└─────────────────────────────────────────────────────────┘
```

**监控组件**

| 组件 | 版本 | 用途 | 部署方式 |
|------|------|------|----------|
| Prometheus | 2.45.0 | 指标采集和存储 | Docker |
| Grafana | 9.5.0 | 可视化展示 | Docker |
| AlertManager | 0.25.0 | 告警管理 | Docker |
| Node Exporter | 1.6.0 | 系统指标采集 | Docker |
| Blackbox Exporter | 0.23.0 | 探针监控 | Docker |
| Elasticsearch | 8.8.0 | 日志存储 | Docker |
| Logstash | 8.8.0 | 日志处理 | Docker |
| Kibana | 8.8.0 | 日志可视化 | Docker |

#### 3.2 应用监控

**应用指标**

| 指标类型 | 指标名称 | 阈值 | 告警级别 | 说明 |
|----------|----------|------|----------|------|
| 性能 | api_response_time_p95 | > 500ms | 警告 | API响应时间P95 |
| 性能 | api_response_time_p99 | > 1000ms | 严重 | API响应时间P99 |
| 性能 | api_error_rate | > 1% | 警告 | API错误率 |
| 性能 | api_error_rate | > 5% | 严重 | API错误率严重 |
| 可用性 | service_up | = 0 | 严重 | 服务不可用 |
| 可用性 | service_up | < 3 | 警告 | 副本数不足 |
| 资源 | memory_usage | > 80% | 警告 | 内存使用率 |
| 资源 | memory_usage | > 90% | 严重 | 内存使用率严重 |
| 资源 | cpu_usage | > 80% | 警告 | CPU使用率 |
| 资源 | cpu_usage | > 90% | 严重 | CPU使用率严重 |
| 资源 | disk_usage | > 80% | 警告 | 磁盘使用率 |
| 资源 | disk_usage | > 90% | 严重 | 磁盘使用率严重 |

**Prometheus配置**

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

rule_files:
  - "alerts/*.yml"

scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']
  
  - job_name: 'api-gateway'
    static_configs:
      - targets: ['api-gateway:9091']
  
  - job_name: 'user-service'
    static_configs:
      - targets: ['user-service:9092']
  
  - job_name: 'content-service'
    static_configs:
      - targets: ['content-service:9093']
  
  - job_name: 'ai-service'
    static_configs:
      - targets: ['ai-service:9094']
  
  - job_name: 'payment-service'
    static_configs:
      - targets: ['payment-service:9095']
  
  - job_name: 'social-service'
    static_configs:
      - targets: ['social-service:9096']
  
  - job_name: 'recommend-service'
    static_configs:
      - targets: ['recommend-service:9097']
```

**告警规则**

```yaml
groups:
  - name: api_alerts
    rules:
      - alert: HighResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "API响应时间过高"
          description: "API响应时间P95超过500ms，当前值: {{ $value }}s"
      
      - alert: CriticalResponseTime
        expr: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 1.0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "API响应时间严重"
          description: "API响应时间P99超过1000ms，当前值: {{ $value }}s"
      
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.01
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "API错误率过高"
          description: "API错误率超过1%，当前值: {{ $value | humanizePercentage }}"
      
      - alert: CriticalErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "API错误率严重"
          description: "API错误率超过5%，当前值: {{ $value | humanizePercentage }}"
      
      - alert: ServiceDown
        expr: up{job=~"api.*"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "服务不可用"
          description: "服务 {{ $labels.job }} 已下线"
  
  - name: resource_alerts
    rules:
      - alert: HighMemoryUsage
        expr: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "内存使用率过高"
          description: "节点 {{ $labels.instance }} 内存使用率超过80%，当前值: {{ $value }}%"
      
      - alert: CriticalMemoryUsage
        expr: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 > 90
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "内存使用率严重"
          description: "节点 {{ $labels.instance }} 内存使用率超过90%，当前值: {{ $value }}%"
      
      - alert: HighCPUUsage
        expr: (100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "CPU使用率过高"
          description: "节点 {{ $labels.instance }} CPU使用率超过80%，当前值: {{ $value }}%"
      
      - alert: CriticalCPUUsage
        expr: (100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)) > 90
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "CPU使用率严重"
          description: "节点 {{ $labels.instance }} CPU使用率超过90%，当前值: {{ $value }}%"
      
      - alert: HighDiskUsage
        expr: (node_filesystem_size_bytes - node_filesystem_avail_bytes) / node_filesystem_size_bytes * 100 > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "磁盘使用率过高"
          description: "节点 {{ $labels.instance }} 磁盘 {{ $labels.mountpoint }} 使用率超过80%，当前值: {{ $value }}%"
      
      - alert: CriticalDiskUsage
        expr: (node_filesystem_size_bytes - node_filesystem_avail_bytes) / node_filesystem_size_bytes * 100 > 90
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "磁盘使用率严重"
          description: "节点 {{ $labels.instance }} 磁盘 {{ $labels.mountpoint }} 使用率超过90%，当前值: {{ $value }}%"
```

#### 3.3 系统监控

**系统指标**

| 指标类型 | 指标名称 | 阈值 | 告警级别 | 说明 |
|----------|----------|------|----------|------|
| CPU | cpu_usage | > 80% | 警告 | CPU使用率 |
| CPU | cpu_usage | > 90% | 严重 | CPU使用率严重 |
| 内存 | memory_usage | > 80% | 警告 | 内存使用率 |
| 内存 | memory_usage | > 90% | 严重 | 内存使用率严重 |
| 磁盘 | disk_usage | > 80% | 警告 | 磁盘使用率 |
| 磁盘 | disk_usage | > 90% | 严重 | 磁盘使用率严重 |
| 网络 | network_in | > 1Gbps | 警告 | 网络入流量 |
| 网络 | network_out | > 1Gbps | 警告 | 网络出流量 |
| 进程 | process_count | > 1000 | 警告 | 进程数量 |
| 负载 | load_average | > CPU核心数 | 警告 | 系统负载 |

#### 3.4 业务监控

**业务指标**

| 指标类型 | 指标名称 | 阈值 | 告警级别 | 说明 |
|----------|----------|------|----------|------|
| 用户 | daily_active_users | < 预期值的80% | 警告 | 日活跃用户数 |
| 用户 | user_registration_rate | < 预期值的80% | 警告 | 用户注册率 |
| 内容 | script_generation_count | < 预期值的80% | 警告 | 剧本生成数量 |
| 内容 | content_upload_count | < 预期值的80% | 警告 | 内容上传数量 |
| 支付 | payment_success_rate | < 95% | 警告 | 支付成功率 |
| 支付 | payment_success_rate | < 90% | 严重 | 支付成功率严重 |
| 社交 | daily_message_count | < 预期值的80% | 警告 | 日消息数量 |
| 推荐 | recommendation_click_rate | < 预期值的80% | 警告 | 推荐点击率 |

#### 3.5 告警配置

**告警级别**

| 级别 | 响应时间 | 处理时间 | 通知方式 | 负责人 |
|------|----------|----------|----------|--------|
| 严重 | 5分钟 | 30分钟 | 电话、短信、邮件 | 运维负责人 |
| 警告 | 15分钟 | 1小时 | 短信、邮件 | 运维负责人 |
| 信息 | 1小时 | 4小时 | 邮件 | 运维负责人 |

**告警通知**

**邮件通知**
- 接收人：运维团队、相关开发团队
- 发送频率：每次告警
- 邮件模板：包含告警级别、告警内容、告警时间、处理建议

**短信通知**
- 接收人：运维负责人、相关开发负责人
- 发送频率：严重告警实时发送，警告告警每小时汇总
- 短信模板：包含告警级别、告警内容、告警时间

**电话通知**
- 接收人：运维负责人
- 发送频率：严重告警实时拨打
- 电话内容：口头告知告警情况

**企业微信通知**
- 接收人：运维群、相关开发群
- 发送频率：每次告警
- 消息模板：包含告警级别、告警内容、告警时间、处理建议

**AlertManager配置**

```yaml
global:
  resolve_timeout: 5m

route:
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  receiver: 'default'
  routes:
    - match:
        severity: critical
      receiver: 'critical'
    - match:
        severity: warning
      receiver: 'warning'

receivers:
  - name: 'default'
    email_configs:
      - to: 'ops@example.com'
        from: 'alertmanager@example.com'
        smarthost: 'smtp.example.com:587'
        auth_username: 'alertmanager@example.com'
        auth_password: 'password'
  
  - name: 'critical'
    email_configs:
      - to: 'ops@example.com,dev@example.com'
        from: 'alertmanager@example.com'
        smarthost: 'smtp.example.com:587'
        auth_username: 'alertmanager@example.com'
        auth_password: 'password'
    wechat_configs:
      - corp_id: 'your-corp-id'
        api_secret: 'your-api-secret'
        to_party: '1'
        agent_id: 'your-agent-id'
    webhook_configs:
      - url: 'http://sms-gateway:8080/send'
        send_resolved: true
  
  - name: 'warning'
    email_configs:
      - to: 'ops@example.com'
        from: 'alertmanager@example.com'
        smarthost: 'smtp.example.com:587'
        auth_username: 'alertmanager@example.com'
        auth_password: 'password'
    wechat_configs:
      - corp_id: 'your-corp-id'
        api_secret: 'your-api-secret'
        to_party: '1'
        agent_id: 'your-agent-id'
```

#### 3.6 监控仪表板

**Grafana仪表板**

**系统概览仪表板**
- CPU使用率趋势
- 内存使用率趋势
- 磁盘使用率趋势
- 网络流量趋势
- 系统负载趋势

**应用性能仪表板**
- API响应时间趋势
- API错误率趋势
- API请求量趋势
- 服务可用性状态
- 慢查询TOP10

**业务指标仪表板**
- 日活跃用户数
- 用户注册数
- 剧本生成数
- 内容上传数
- 支付成功率
- 推荐点击率

**告警仪表板**
- 当前告警列表
- 告警历史趋势
- 告警级别分布
- 告警处理状态

#### 3.7 监控最佳实践

**监控指标选择**
- 选择关键业务指标
- 选择关键技术指标
- 选择资源使用指标
- 避免监控指标过多

**告警阈值设置**
- 基于历史数据设置阈值
- 预留合理的缓冲空间
- 定期调整阈值
- 避免告警过于频繁

**告警通知优化**
- 合理设置告警级别
- 合理设置通知频率
- 合理设置通知方式
- 避免告警疲劳

**监控数据保留**
- 热数据保留7天
- 温数据保留30天
- 冷数据保留90天
- 定期清理过期数据

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
