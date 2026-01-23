---
@file: 067-YYC3-Short-Drama-API文档-技术类型-WebSocket实时通信接口.md
@description: YYC3-Short-Drama 实时聊天、消息推送等WebSocket接口的设计与调用规范
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [API接口],[技术类型],[WebSocket]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 067-YYC3-Short-Drama-API文档-技术类型-WebSocket实时通信接口

## 概述

本文档详细描述YYC3-Short-Drama-API文档-技术类型-WebSocket实时通信接口相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范技术类型-WebSocket实时通信接口相关的业务标准与技术落地要求
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

### 3. WebSocket实时通信接口

#### 3.1 WebSocket连接

##### 3.1.1 连接地址

```
WebSocket连接地址：wss://api.yyc3.com/ws

连接参数：
- token: JWT认证令牌
- clientId: 客户端唯一标识
- deviceType: 设备类型（web/mobile/desktop）

示例：
wss://api.yyc3.com/ws?token=xxx&clientId=xxx&deviceType=web
```

##### 3.1.2 连接流程

```typescript
// frontend/utils/websocket.ts
export class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  connect(url: string, token: string) {
    const wsUrl = `${url}?token=${token}`;
    
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.startHeartbeat();
    };

    this.ws.onmessage = (event) => {
      this.handleMessage(event.data);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket closed');
      this.stopHeartbeat();
      this.reconnect();
    };
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
        this.connect(this.url!, this.token!);
      }, this.reconnectDelay);
    }
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 30000);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  private handleMessage(data: string) {
    const message = JSON.parse(data);
    
    switch (message.type) {
      case 'pong':
        // 心跳响应
        break;
      case 'notification':
        // 处理通知
        this.handleNotification(message.data);
        break;
      case 'chat':
        // 处理聊天消息
        this.handleChatMessage(message.data);
        break;
      case 'drama_update':
        // 处理短剧更新
        this.handleDramaUpdate(message.data);
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.stopHeartbeat();
  }
}

export const wsClient = new WebSocketClient();
```

#### 3.2 消息类型

##### 3.2.1 客户端消息

```typescript
// 心跳消息
{
  "type": "ping",
  "timestamp": 1640995200000
}

// 认证消息
{
  "type": "auth",
  "token": "jwt-token",
  "clientId": "client-uuid"
}

// 聊天消息
{
  "type": "chat",
  "data": {
    "roomId": "room-001",
    "message": "你好",
    "messageType": "text"
  }
}

// 加入房间
{
  "type": "join_room",
  "data": {
    "roomId": "room-001",
    "roomType": "drama_chat"
  }
}

// 离开房间
{
  "type": "leave_room",
  "data": {
    "roomId": "room-001"
  }
}
```

##### 3.2.2 服务端消息

```typescript
// 心跳响应
{
  "type": "pong",
  "timestamp": 1640995200000
}

// 认证成功
{
  "type": "auth_success",
  "data": {
    "userId": "user-001",
    "sessionId": "session-uuid"
  }
}

// 认证失败
{
  "type": "auth_error",
  "data": {
    "error": "Token无效或已过期"
  }
}

// 通知消息
{
  "type": "notification",
  "data": {
    "id": "notif-001",
    "type": "system",
    "title": "系统通知",
    "content": "您的短剧已审核通过",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}

// 聊天消息
{
  "type": "chat",
  "data": {
    "id": "msg-001",
    "roomId": "room-001",
    "senderId": "user-001",
    "senderName": "张三",
    "message": "你好",
    "messageType": "text",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}

// 用户加入房间
{
  "type": "user_joined",
  "data": {
    "roomId": "room-001",
    "userId": "user-001",
    "userName": "张三",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}

// 用户离开房间
{
  "type": "user_left",
  "data": {
    "roomId": "room-001",
    "userId": "user-001",
    "userName": "张三",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 3.3 房间管理

##### 3.3.1 房间类型

```
房间类型：
- drama_chat: 短剧聊天室
- live_stream: 直播间
- ai_assistant: AI助手对话
- cultural_circle: 文化圈
```

##### 3.3.2 房间操作

```typescript
// frontend/services/room.service.ts
export class RoomService {
  private wsClient: WebSocketClient;

  constructor(wsClient: WebSocketClient) {
    this.wsClient = wsClient;
  }

  joinRoom(roomId: string, roomType: string) {
    this.wsClient.send({
      type: 'join_room',
      data: {
        roomId,
        roomType,
      },
    });
  }

  leaveRoom(roomId: string) {
    this.wsClient.send({
      type: 'leave_room',
      data: {
        roomId,
      },
    });
  }

  sendChatMessage(roomId: string, message: string, messageType: string = 'text') {
    this.wsClient.send({
      type: 'chat',
      data: {
        roomId,
        message,
        messageType,
      },
    });
  }
}

export const roomService = new RoomService(wsClient);
```

#### 3.4 服务端实现

##### 3.4.1 WebSocket服务器

```typescript
// backend/websocket/ws.server.ts
import { WebSocketServer, WebSocket } from 'ws';
import { verifyToken } from '@/utils/jwt';
import { logger } from '@/utils/logger';

export class WSServer {
  private wss: WebSocketServer;
  private clients: Map<string, WebSocket> = new Map();
  private rooms: Map<string, Set<string>> = new Map();

  constructor(port: number) {
    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', (ws: WebSocket, req) => {
      this.handleConnection(ws, req);
    });

    logger.info(`WebSocket server started on port ${port}`);
  }

  private async handleConnection(ws: WebSocket, req: any) {
    const token = new URL(req.url, 'http://localhost').searchParams.get('token');
    const clientId = new URL(req.url, 'http://localhost').searchParams.get('clientId');

    try {
      const user = await verifyToken(token!);
      const userId = user.id;

      this.clients.set(userId, ws);
      logger.info(`User ${userId} connected via WebSocket`);

      ws.on('message', (data: string) => {
        this.handleMessage(userId, data);
      });

      ws.on('close', () => {
        this.handleDisconnection(userId);
      });

      ws.on('error', (error) => {
        logger.error(`WebSocket error for user ${userId}`, error);
      });

      ws.send(JSON.stringify({
        type: 'auth_success',
        data: {
          userId,
          sessionId: clientId,
        },
      }));
    } catch (error) {
      logger.error('WebSocket authentication failed', error as Error);
      ws.send(JSON.stringify({
        type: 'auth_error',
        data: {
          error: 'Token无效或已过期',
        },
      }));
      ws.close();
    }
  }

  private handleMessage(userId: string, data: string) {
    try {
      const message = JSON.parse(data);

      switch (message.type) {
        case 'ping':
          this.handlePing(userId);
          break;
        case 'chat':
          this.handleChat(userId, message.data);
          break;
        case 'join_room':
          this.handleJoinRoom(userId, message.data);
          break;
        case 'leave_room':
          this.handleLeaveRoom(userId, message.data);
          break;
        default:
          logger.warn(`Unknown message type: ${message.type}`);
      }
    } catch (error) {
      logger.error('Failed to parse WebSocket message', error as Error);
    }
  }

  private handlePing(userId: string) {
    const ws = this.clients.get(userId);
    if (ws) {
      ws.send(JSON.stringify({
        type: 'pong',
        timestamp: Date.now(),
      }));
    }
  }

  private handleChat(userId: string, data: any) {
    const { roomId, message, messageType } = data;
    
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }

    const roomMembers = this.rooms.get(roomId)!;
    
    if (!roomMembers.has(userId)) {
      logger.warn(`User ${userId} not in room ${roomId}`);
      return;
    }

    const chatMessage = {
      type: 'chat',
      data: {
        id: generateId(),
        roomId,
        senderId: userId,
        message,
        messageType,
        timestamp: new Date().toISOString(),
      },
    };

    roomMembers.forEach((memberId) => {
      const ws = this.clients.get(memberId);
      if (ws) {
        ws.send(JSON.stringify(chatMessage));
      }
    });
  }

  private handleJoinRoom(userId: string, data: any) {
    const { roomId, roomType } = data;

    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }

    const roomMembers = this.rooms.get(roomId)!;
    roomMembers.add(userId);

    const joinMessage = {
      type: 'user_joined',
      data: {
        roomId,
        userId,
        timestamp: new Date().toISOString(),
      },
    };

    roomMembers.forEach((memberId) => {
      const ws = this.clients.get(memberId);
      if (ws) {
        ws.send(JSON.stringify(joinMessage));
      }
    });

    logger.info(`User ${userId} joined room ${roomId}`);
  }

  private handleLeaveRoom(userId: string, data: any) {
    const { roomId } = data;

    const roomMembers = this.rooms.get(roomId);
    
    if (roomMembers) {
      roomMembers.delete(userId);

      const leaveMessage = {
        type: 'user_left',
        data: {
          roomId,
          userId,
          timestamp: new Date().toISOString(),
        },
      };

      roomMembers.forEach((memberId) => {
        const ws = this.clients.get(memberId);
        if (ws) {
          ws.send(JSON.stringify(leaveMessage));
        }
      });

      if (roomMembers.size === 0) {
        this.rooms.delete(roomId);
      }
    }

    logger.info(`User ${userId} left room ${roomId}`);
  }

  private handleDisconnection(userId: string) {
    this.clients.delete(userId);

    this.rooms.forEach((members, roomId) => {
      if (members.has(userId)) {
        members.delete(userId);

        const leaveMessage = {
          type: 'user_left',
          data: {
            roomId,
            userId,
            timestamp: new Date().toISOString(),
          },
        };

        members.forEach((memberId) => {
          const ws = this.clients.get(memberId);
          if (ws) {
            ws.send(JSON.stringify(leaveMessage));
          }
        });

        if (members.size === 0) {
          this.rooms.delete(roomId);
        }
      }
    });

    logger.info(`User ${userId} disconnected`);
  }

  broadcast(type: string, data: any) {
    const message = JSON.stringify({ type, data });

    this.clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  }
}

export const wsServer = new WSServer(3001);
```

#### 3.5 安全与性能

##### 3.5.1 安全措施

```
安全要求：
- 使用WSS协议（WebSocket Secure）
- JWT令牌认证
- 速率限制
- 消息大小限制
- 恶意连接检测
- IP白名单（可选）
```

##### 3.5.2 性能优化

```
优化策略：
- 心跳机制保持连接
- 连接池管理
- 消息压缩
- 负载均衡
- 水平扩展
- 消息队列缓冲
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
