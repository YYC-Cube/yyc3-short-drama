---
@file: 142-YYC3-Short-Drama-部署发布-蓝绿部署文档.md
@description: YYC3-Short-Drama 蓝绿部署的环境配置、切换流程、回滚预案的完整规范
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-24
@updated: 2026-01-24
@status: published
@tags: [部署发布],[蓝绿部署],[高可用]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 142-YYC3-Short-Drama-部署发布-蓝绿部署文档

## 概述

本文档详细描述YYC3-Short-Drama项目蓝绿部署的环境配置、切换流程和回滚预案，确保系统在发布过程中实现零停机部署，最大程度保障服务可用性。

## 核心内容

### 1. 蓝绿部署概述

#### 1.1 蓝绿部署定义
蓝绿部署（Blue-Green Deployment）是一种部署策略，通过维护两个完全相同的生产环境（蓝色和绿色），在发布时将流量从一个环境切换到另一个环境，实现零停机部署。

#### 1.2 蓝绿部署优势
- **零停机时间**: 流量切换瞬间完成，用户无感知
- **快速回滚**: 切换流量即可回滚，无需重新部署
- **降低风险**: 新环境充分验证后再切换流量
- **简单可靠**: 部署流程简单，易于理解和实施
- **易于测试**: 可以在新环境充分测试后再切换

#### 1.3 适用场景
- **关键业务系统**: 需要高可用性的系统
- **频繁发布**: 发布频率较高的系统
- **大型应用**: 部署时间较长的应用
- **复杂系统**: 需要充分验证的系统

### 2. 环境配置

#### 2.1 环境架构

**蓝绿环境架构图**:
```
                    ┌─────────────────┐
                    │   Load Balancer │
                    │   (Nginx/ALB)  │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │   Traffic Switch │
                    │   (Service)     │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────▼─────┐  ┌───▼────┐  ┌───▼────┐
        │  Blue     │  │  Green  │  │ Canary  │
        │  v1.0.0   │  │  v1.1.0 │  │  v1.2.0 │
        │  (Active)  │  │(Standby)│  │ (Test)  │
        └───────────┘  └─────────┘  └─────────┘
              │              │              │
        ┌─────▼─────┐  ┌───▼────┐  ┌───▼────┐
        │  MySQL    │  │  MySQL  │  │  MySQL  │
        │  Primary  │  │ Replica │  │ Replica │
        └───────────┘  └─────────┘  └─────────┘
```

#### 2.2 Kubernetes配置

**Blue环境配置**:
```yaml
# blue-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-blue
  namespace: yyc3-short-drama
  labels:
    app: frontend
    version: blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
      version: blue
  template:
    metadata:
      labels:
        app: frontend
        version: blue
    spec:
      containers:
      - name: frontend
        image: yyc3-short-drama-frontend:v1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: VERSION
          value: "v1.0.0"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-blue
  namespace: yyc3-short-drama
spec:
  selector:
    app: frontend
    version: blue
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP
```

**Green环境配置**:
```yaml
# green-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-green
  namespace: yyc3-short-drama
  labels:
    app: frontend
    version: green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
      version: green
  template:
    metadata:
      labels:
        app: frontend
        version: green
    spec:
      containers:
      - name: frontend
        image: yyc3-short-drama-frontend:v1.1.0
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: VERSION
          value: "v1.1.0"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-green
  namespace: yyc3-short-drama
spec:
  selector:
    app: frontend
    version: green
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP
```

**流量切换Service配置**:
```yaml
# frontend-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: yyc3-short-drama
spec:
  selector:
    app: frontend
    version: blue
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
  loadBalancerIP: 192.168.1.100
```

#### 2.3 数据库配置

**主从复制配置**:
```sql
-- MySQL主库配置 (Blue环境)
[mysqld]
server-id = 1
log-bin = mysql-bin
binlog-format = ROW
gtid-mode = ON
enforce-gtid-consistency = ON

-- MySQL从库配置 (Green环境)
[mysqld]
server-id = 2
relay-log = relay-bin
read-only = 1
gtid-mode = ON
enforce-gtid-consistency = ON
```

**Redis配置**:
```conf
# Redis主库配置 (Blue环境)
port 6379
bind 0.0.0.0
requirepass your-redis-password
maxmemory 2gb
maxmemory-policy allkeys-lru
appendonly yes
appendfsync everysec

# Redis从库配置 (Green环境)
port 6379
bind 0.0.0.0
requirepass your-redis-password
slaveof blue-redis 6379
masterauth your-redis-password
```

### 3. 切换流程

#### 3.1 部署新版本到Green环境

**步骤1: 部署Green环境**:
```bash
# 1. 创建Green环境
kubectl apply -f k8s/green-deployment.yaml

# 2. 等待Pod就绪
kubectl wait --for=condition=ready pod \
  -l app=frontend,version=green \
  -n yyc3-short-drama \
  --timeout=5m

# 3. 检查Pod状态
kubectl get pods -n yyc3-short-drama -l app=frontend
```

**步骤2: 验证Green环境**:
```bash
# 1. 端口转发到本地
kubectl port-forward service/frontend-green 8080:80 \
  -n yyc3-short-drama

# 2. 健康检查
curl http://localhost:8080/api/health

# 3. 功能测试
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**步骤3: 数据同步验证**:
```bash
# 1. 检查MySQL主从同步
mysql -u root -p -e "SHOW SLAVE STATUS\G"

# 2. 检查Redis同步
redis-cli -a your-redis-password INFO replication

# 3. 验证数据一致性
mysql -u root -p yyc3_33 -e "SELECT COUNT(*) FROM users;"
```

#### 3.2 流量切换到Green环境

**步骤1: 更新Service选择器**:
```bash
# 1. 切换流量到Green环境
kubectl patch service frontend -n yyc3-short-drama \
  -p '{"spec":{"selector":{"version":"green"}}}'

# 2. 验证Service配置
kubectl get service frontend -n yyc3-short-drama -o yaml

# 3. 检查流量分配
kubectl get endpoints frontend -n yyc3-short-drama
```

**步骤2: 监控切换过程**:
```bash
# 1. 实时监控日志
kubectl logs -f deployment/frontend-green -n yyc3-short-drama

# 2. 监控请求量
kubectl top pods -n yyc3-short-drama -l app=frontend

# 3. 检查错误率
curl http://monitoring/api/metrics/errors
```

**步骤3: 验证服务正常**:
```bash
# 1. 健康检查
curl http://yyc3-short-drama/api/health

# 2. 功能验证
curl -X POST http://yyc3-short-drama/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 3. 性能测试
ab -n 1000 -c 100 http://yyc3-short-drama/api/health
```

#### 3.3 清理Blue环境

**步骤1: 确认Green环境稳定**:
```bash
# 1. 检查Green环境状态
kubectl get pods -n yyc3-short-drama -l version=green

# 2. 检查错误率
curl http://monitoring/api/metrics/errors

# 3. 检查用户反馈
curl http://monitoring/api/feedback
```

**步骤2: 停止Blue环境**:
```bash
# 1. 停止Blue环境Deployment
kubectl scale deployment frontend-blue --replicas=0 \
  -n yyc3-short-drama

# 2. 等待Pod停止
kubectl wait --for=delete pod \
  -l app=frontend,version=blue \
  -n yyc3-short-drama \
  --timeout=5m

# 3. 验证Blue环境已停止
kubectl get pods -n yyc3-short-drama -l version=blue
```

**步骤3: 清理Blue环境资源**:
```bash
# 1. 删除Blue环境Service
kubectl delete service frontend-blue -n yyc3-short-drama

# 2. 删除Blue环境Deployment
kubectl delete deployment frontend-blue -n yyc3-short-drama

# 3. 验证资源已清理
kubectl get all -n yyc3-short-drama -l version=blue
```

### 4. 回滚预案

#### 4.1 快速回滚

**回滚到Blue环境**:
```bash
#!/bin/bash
# rollback-to-blue.sh

set -e

NAMESPACE="yyc3-short-drama"
LOG_FILE="/var/log/blue-green-rollback.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

rollback_to_blue() {
    log "开始回滚到Blue环境..."
    
    # 1. 启动Blue环境
    log "启动Blue环境..."
    kubectl scale deployment frontend-blue --replicas=3 -n "$NAMESPACE"
    
    # 2. 等待Blue环境就绪
    log "等待Blue环境就绪..."
    kubectl wait --for=condition=ready pod \
      -l app=frontend,version=blue \
      -n "$NAMESPACE" \
      --timeout=5m
    
    # 3. 验证Blue环境健康
    log "验证Blue环境健康..."
    kubectl port-forward service/frontend-blue 8080:80 -n "$NAMESPACE" &
    PF_PID=$!
    sleep 5
    
    if curl -f http://localhost:8080/api/health; then
        log "Blue环境健康检查通过"
    else
        log "错误: Blue环境健康检查失败"
        kill $PF_PID
        exit 1
    fi
    
    kill $PF_PID
    
    # 4. 切换流量到Blue环境
    log "切换流量到Blue环境..."
    kubectl patch service frontend -n "$NAMESPACE" \
      -p '{"spec":{"selector":{"version":"blue"}}}'
    
    # 5. 验证流量切换
    log "验证流量切换..."
    sleep 10
    if curl -f http://yyc3-short-drama/api/health; then
        log "流量切换成功"
    else
        log "错误: 流量切换失败"
        exit 1
    fi
    
    log "回滚到Blue环境成功！"
}

main() {
    rollback_to_blue
}

main "$@"
```

#### 4.2 自动回滚

**自动回滚触发条件**:
```yaml
# auto-rollback-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: auto-rollback-config
  namespace: yyc3-short-drama
data:
  error_rate_threshold: "0.01"
  response_time_threshold: "2000"
  availability_threshold: "0.99"
  rollback_enabled: "true"
```

**自动回滚脚本**:
```bash
#!/bin/bash
# auto-rollback.sh

set -e

NAMESPACE="yyc3-short-drama"
LOG_FILE="/var/log/auto-rollback.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

check_metrics() {
    log "检查系统指标..."
    
    # 获取错误率
    ERROR_RATE=$(curl -s http://monitoring/api/metrics/error_rate)
    log "错误率: $ERROR_RATE"
    
    # 获取响应时间
    RESPONSE_TIME=$(curl -s http://monitoring/api/metrics/response_time)
    log "响应时间: ${RESPONSE_TIME}ms"
    
    # 获取可用性
    AVAILABILITY=$(curl -s http://monitoring/api/metrics/availability)
    log "可用性: $AVAILABILITY"
    
    # 检查是否需要回滚
    if (( $(echo "$ERROR_RATE > 0.01" | bc -l) )) || \
       (( $(echo "$RESPONSE_TIME > 2000" | bc -l) )) || \
       (( $(echo "$AVAILABILITY < 0.99" | bc -l) )); then
        log "检测到异常，触发自动回滚"
        return 1
    fi
    
    return 0
}

auto_rollback() {
    log "开始自动回滚..."
    
    # 检查指标
    if ! check_metrics; then
        # 执行回滚
        /scripts/rollback-to-blue.sh
        
        # 发送告警
        curl -X POST http://alertmanager/api/v1/alerts \
          -H "Content-Type: application/json" \
          -d '{
            "alerts": [{
              "labels": {
                "alertname": "AutoRollbackTriggered",
                "severity": "critical"
              },
              "annotations": {
                "description": "自动回滚已触发"
              }
            }]
          }'
        
        log "自动回滚完成"
    else
        log "系统指标正常，无需回滚"
    fi
}

main() {
    while true; do
        auto_rollback
        sleep 60
    done
}

main "$@"
```

### 5. 监控与验证

#### 5.1 监控指标

**业务指标**:
- 请求量
- 错误率
- 响应时间
- 用户活跃度

**系统指标**:
- CPU使用率
- 内存使用率
- 磁盘I/O
- 网络流量

**环境指标**:
- Blue环境状态
- Green环境状态
- 流量分配
- 数据同步状态

#### 5.2 监控配置

**Prometheus配置**:
```yaml
# prometheus-blue-green.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'blue-environment'
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names:
            - yyc3-short-drama
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_version]
        action: keep
        regex: blue

  - job_name: 'green-environment'
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names:
            - yyc3-short-drama
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_version]
        action: keep
        regex: green
```

**Grafana仪表板**:
```json
{
  "dashboard": {
    "title": "Blue-Green Deployment Dashboard",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total{version=\"blue\"}[5m])",
            "legendFormat": "Blue"
          },
          {
            "expr": "rate(http_requests_total{version=\"green\"}[5m])",
            "legendFormat": "Green"
          }
        ]
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "rate(http_errors_total{version=\"blue\"}[5m])",
            "legendFormat": "Blue"
          },
          {
            "expr": "rate(http_errors_total{version=\"green\"}[5m])",
            "legendFormat": "Green"
          }
        ]
      },
      {
        "title": "Response Time",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, http_response_time_seconds{version=\"blue\"})",
            "legendFormat": "Blue"
          },
          {
            "expr": "histogram_quantile(0.95, http_response_time_seconds{version=\"green\"})",
            "legendFormat": "Green"
          }
        ]
      }
    ]
  }
}
```

#### 5.3 验证清单

**部署前验证**:
- [ ] Blue环境运行正常
- [ ] Green环境配置正确
- [ ] 数据库同步正常
- [ ] 监控配置完成
- [ ] 回滚脚本就绪

**部署中验证**:
- [ ] Green环境部署成功
- [ ] 健康检查通过
- [ ] 功能测试通过
- [ ] 性能测试通过
- [ ] 数据一致性验证通过

**部署后验证**:
- [ ] 流量切换成功
- [ ] 服务运行正常
- [ ] 错误率正常
- [ ] 响应时间正常
- [ ] 用户反馈良好

### 6. 最佳实践

#### 6.1 部署前
- **充分测试**: 在测试环境充分测试
- **准备回滚**: 确保回滚方案可用
- **监控准备**: 配置完善的监控告警
- **通知相关方**: 提前通知相关人员

#### 6.2 部署中
- **逐步验证**: 逐步验证每个步骤
- **密切监控**: 实时监控系统状态
- **快速响应**: 准备快速响应机制
- **及时沟通**: 及时沟通部署进展

#### 6.3 部署后
- **持续监控**: 持续监控系统状态
- **收集反馈**: 收集用户反馈
- **分析数据**: 分析部署数据
- **总结经验**: 总结部署经验

### 7. 联系方式

#### 7.1 紧急联系
- **技术负责人**: admin@0379.email
- **运维团队**: admin@0379.email
- **GitHub Issues**: https://github.com/YYC-Cube/yyc3-short-drama/issues

#### 7.2 支持资源
- **文档**: https://github.com/YYC-Cube/yyc3-short-drama/wiki
- **监控**: 系统监控平台
- **日志**: 日志分析平台

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
