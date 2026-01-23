---
@file: 143-YYC3-Short-Drama-部署发布-容器化部署配置.md
@description: YYC3-Short-Drama Docker+K8s容器化部署的配置文件、镜像构建、编排规则
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-24
@updated: 2026-01-24
@status: published
@tags: [部署发布],[容器化],[Docker]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 143-YYC3-Short-Drama-部署发布-容器化部署配置

## 概述

本文档详细描述YYC3-Short-Drama项目的容器化部署配置，包括Docker镜像构建、Kubernetes编排配置、服务网格部署等内容。

## 核心内容

### 1. 容器化架构概述

#### 1.1 技术栈
- **容器技术**: Docker 20.10+
- **编排平台**: Kubernetes v1.25+
- **服务网格**: Istio (可选)
- **镜像仓库**: Docker Hub, 阿里云容器镜像服务

#### 1.2 微服务拆分
- **前端服务**: Next.js应用，负责用户界面
- **API网关**: 处理请求路由和认证
- **用户服务**: 用户管理、认证授权
- **内容服务**: 剧本、文化资源管理
- **AI服务**: AI剧本生成、优化服务
- **支付服务**: 星币经济系统

### 2. Docker配置

#### 2.1 前端应用Dockerfile
```dockerfile
# 使用Node.js 18作为基础镜像
FROM node:18-alpine AS base

# 安装依赖
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 复制package文件并安装依赖
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 重新构建生产依赖
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建应用
RUN npm run build

# 生产环境运行
FROM base AS runner
WORKDIR /app

# 创建非root用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 安装精简版openssl用于https请求
RUN apk add --no-cache openssl

# 复制构建产物
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

#### 2.2 构建脚本
```bash
#!/bin/bash
# build.sh

# 设置镜像标签
IMAGE_NAME="yyc3-short-drama-frontend"
VERSION=$(git rev-parse --short HEAD)

# 构建Docker镜像
docker build -t $IMAGE_NAME:$VERSION .
docker tag $IMAGE_NAME:$VERSION $IMAGE_NAME:latest

echo "Docker镜像构建完成: $IMAGE_NAME:$VERSION"
```

#### 2.3 Docker Compose配置
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL:-http://localhost:3000}
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:3000/api}
    volumes:
      - ./logs:/app/logs
    depends_on:
      - redis
      - mysql
    restart: unless-stopped
    networks:
      - app-network

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_MASTER_PASS}
      MYSQL_DATABASE: ${DB_MASTER_NAME}
      MYSQL_USER: ${DB_MASTER_USER}
      MYSQL_PASSWORD: ${DB_MASTER_PASS}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    restart: unless-stopped
    networks:
      - app-network
    command: >
      --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_unicode_ci
      --innodb-flush-method=fsync
      --innodb-use-native-aio=1

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    networks:
      - app-network
    command: redis-server --appendonly yes

  mongodb:
    image: mongo:6
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped
    networks:
      - app-network

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    networks:
      - app-network

volumes:
  mysql_data:
  redis_data:
  mongo_data:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

### 3. Kubernetes配置

#### 3.1 命名空间配置
```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: yyc3-short-drama
  labels:
    name: yyc3-short-drama
```

#### 3.2 ConfigMap配置
```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: yyc3-short-drama
data:
  NEXT_PUBLIC_APP_URL: "https://yp.mymgmt.top"
  NEXT_PUBLIC_API_URL: "https://yp.mymgmt.top/api"
  NODE_ENV: "production"
  LOG_LEVEL: "info"
```

#### 3.3 Secret配置
```yaml
# k8s/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: yyc3-short-drama
type: Opaque
data:
  # Base64编码的敏感信息
  DB_MASTER_PASS: <base64_encoded_password>
  JWT_SECRET: <base64_encoded_secret>
  REDIS_PASSWORD: <base64_encoded_redis_password>
  OPENAI_API_KEY: <base64_encoded_openai_key>
```

#### 3.4 Deployment配置
```yaml
# k8s/frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
  namespace: yyc3-short-drama
  labels:
    app: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: yyc3-short-drama-frontend:latest
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        volumeMounts:
        - name: logs-volume
          mountPath: /app/logs
      volumes:
      - name: logs-volume
        persistentVolumeClaim:
          claimName: logs-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  namespace: yyc3-short-drama
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

#### 3.5 Ingress配置
```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: frontend-ingress
  namespace: yyc3-short-drama
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-connect-timeout: "600"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "600"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "600"
spec:
  tls:
  - hosts:
    - yp.mymgmt.top
    secretName: yp-mymgmt-tls
  rules:
  - host: yp.mymgmt.top
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
```

### 4. 持久化存储配置

#### 4.1 PV/PVC配置
```yaml
# k8s/storage.yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: logs-pv
  namespace: yyc3-short-drama
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data/logs
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: logs-pvc
  namespace: yyc3-short-drama
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

### 5. 监控与日志

#### 5.1 Prometheus监控配置
```yaml
# k8s/monitoring.yaml
apiVersion: v1
kind: ServiceMonitor
metadata:
  name: frontend-monitor
  namespace: yyc3-short-drama
  labels:
    app: frontend
spec:
  selector:
    matchLabels:
      app: frontend
  endpoints:
  - port: http
    interval: 30s
```

#### 5.2 日志收集配置
```yaml
# k8s/logging.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluentd-config
  namespace: yyc3-short-drama
data:
  fluent.conf: |
    <source>
      @type tail
      path /var/log/containers/*.log
      pos_file /var/log/fluentd-containers.log.pos
      tag kubernetes.*
      read_from_head true
      <parse>
        @type json
        time_format %Y-%m-%dT%H:%M:%S.%NZ
      </parse>
    </source>
    
    <match kubernetes.**>
      @type elasticsearch
      host "#{ENV['ELASTICSEARCH_HOST']}"
      port "#{ENV['ELASTICSEARCH_PORT']}"
      logstash_format true
      flush_interval 10s
    </match>
```

### 6. CI/CD集成

#### 6.1 GitHub Actions部署工作流
```yaml
# .github/workflows/deploy.yml
name: Deploy to Kubernetes

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build application
      run: npm run build
      
    - name: Login to DockerHub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
        
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: |
          ${{ secrets.DOCKERHUB_USERNAME }}/yyc3-short-drama:${{ github.sha }}
          ${{ secrets.DOCKERHUB_USERNAME }}/yyc3-short-drama:latest
          
    - name: Set up Kubectl
      uses: azure/setup-kubectl@v3
      with:
        version: 'latest'
        
    - name: Set up Kustomize
      run: |
        curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash
        sudo mv kustomize /usr/local/bin
        
    - name: Deploy to Kubernetes
      run: |
        # 更新Deployment中的镜像标签
        kustomize edit set image yyc3-short-drama-frontend=${{ secrets.DOCKERHUB_USERNAME }}/yyc3-short-drama:${{ github.sha }}
        
        # 应用配置
        kubectl apply -k ./
```

### 7. 安全配置

#### 7.1 Pod安全策略
```yaml
# k8s/security.yaml
apiVersion: v1
kind: PodSecurityPolicy
metadata:
  name: restricted-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
    - 'downwardAPI'
    - 'persistentVolumeClaim'
  hostNetwork: false
  hostIPC: false
  hostPID: false
  runAsUser:
    rule: 'MustRunAsNonRoot'
  seLinux:
    rule: 'RunAsAny'
  fsGroup:
    rule: 'MustRunAs'
    ranges:
      - min: 1
        max: 65535
  supplementalGroups:
    rule: 'MustRunAs'
    ranges:
      - min: 1
        max: 65535
```

#### 7.2 网络策略
```yaml
# k8s/network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: frontend-netpol
  namespace: yyc3-short-drama
spec:
  podSelector:
    matchLabels:
      app: frontend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to: []
    ports:
    - protocol: TCP
      port: 443
    - protocol: TCP
      port: 53
```

### 8. 部署验证

#### 8.1 健康检查端点
```javascript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || 'unknown'
  });
}
```

#### 8.2 部署验证脚本
```bash
#!/bin/bash
# verify-deployment.sh

NAMESPACE="yyc3-short-drama"
DEPLOYMENT="frontend-deployment"

echo "验证部署状态..."

# 检查Pod状态
kubectl get pods -n $NAMESPACE

# 检查服务状态
kubectl get svc -n $NAMESPACE

# 检查部署状态
kubectl rollout status deployment/$DEPLOYMENT -n $NAMESPACE

# 进行健康检查
SERVICE_IP=$(kubectl get svc frontend-service -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
if [ ! -z "$SERVICE_IP" ]; then
  HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$SERVICE_IP/api/health)
  if [ $HEALTH_STATUS -eq 200 ]; then
    echo "部署验证成功！健康检查返回状态码: $HEALTH_STATUS"
  else
    echo "部署验证失败！健康检查返回状态码: $HEALTH_STATUS"
    exit 1
  fi
else
  echo "服务尚未分配外部IP，请等待LoadBalancer分配..."
fi
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」