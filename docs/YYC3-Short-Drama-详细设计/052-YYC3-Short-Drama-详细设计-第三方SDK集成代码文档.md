---
@file: 052-YYC3-Short-Drama-详细设计-第三方SDK集成代码文档.md
@description: YYC3-Short-Drama 第三方服务SDK的集成规范与代码实现，包含支付、短信、存储等
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2025-12-31
@status: published
@tags: [详细设计],[第三方集成],[SDK规范]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 052-YYC3-Short-Drama-详细设计-第三方SDK集成代码文档

## 概述

本文档详细描述YYC3-Short-Drama-详细设计-第三方SDK集成代码文档相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的河洛文化数字传承创新平台，致力于运用现代科技手段传承和弘扬河洛文化，打造河洛文化数字传承平台。平台融合人工智能、虚拟现实、区块链等前沿技术，以洛阳为核心，深度挖掘河洛文化的历史底蕴。

#### 1.2 文档目标
- 规范第三方SDK集成代码文档相关的业务标准与技术落地要求
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

### 3. 第三方SDK集成代码文档

#### 3.1 SDK集成架构设计

##### 3.1.1 架构概览

```
┌─────────────────────────────────────────────────────────┐
│                  第三方SDK集成架构                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐│
│  │  支付服务    │    │  短信服务    │    │  存储服务    ││
│  │  Payment    │    │   SMS       │    │  Storage    ││
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘│
│         │                  │                  │         │
│         └──────────────────┼──────────────────┘         │
│                            │                            │
│                    ┌───────▼────────┐                   │
│                    │  SDK抽象层     │                   │
│                    │  SDK Adapter  │                   │
│                    └───────┬────────┘                   │
│                            │                            │
│                    ┌───────▼────────┐                   │
│                    │  统一接口层    │                   │
│                    │ Unified API   │                   │
│                    └───────┬────────┘                   │
│                            │                            │
│         ┌──────────────────┼──────────────────┐        │
│         │                  │                  │        │
│  ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐│
│  │  应用层      │   │  配置管理    │   │  错误处理    ││
│  │ Application │   │  Config     │   │  Error      ││
│  └─────────────┘   └─────────────┘   └─────────────┘│
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │              监控与日志系统                        │  │
│  │        Monitoring & Logging System              │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

##### 3.1.2 集成原则

1. **统一接口**：所有第三方SDK通过统一的抽象层访问
2. **可替换性**：支持不同厂商的SDK无缝切换
3. **错误隔离**：第三方服务故障不影响系统核心功能
4. **重试机制**：自动重试失败请求，提高可用性
5. **监控告警**：实时监控SDK调用状态和性能指标
6. **配置管理**：集中管理SDK配置，支持动态更新
7. **安全防护**：保护API密钥和敏感信息
8. **降级策略**：在第三方服务不可用时提供降级方案

#### 3.2 支付SDK集成

##### 3.2.1 支付宝SDK集成

```typescript
// backend/integrations/payment/alipay.service.ts
import AlipaySdk from 'alipay-sdk';
import { logger } from '@/utils/logger';
import { ExternalServiceError } from '@/shared/errors';

export interface AlipayConfig {
  appId: string;
  privateKey: string;
  alipayPublicKey: string;
  gateway: string;
  notifyUrl: string;
}

export interface AlipayPaymentParams {
  outTradeNo: string;
  totalAmount: number;
  subject: string;
  body?: string;
  buyerId?: string;
}

export interface AlipayRefundParams {
  outTradeNo: string;
  refundAmount: number;
  refundReason?: string;
}

export class AlipayService {
  private client: AlipaySdk;

  constructor(private config: AlipayConfig) {
    this.client = new AlipaySdk({
      appId: config.appId,
      privateKey: config.privateKey,
      alipayPublicKey: config.alipayPublicKey,
      gateway: config.gateway,
    });
  }

  async createPayment(params: AlipayPaymentParams): Promise<string> {
    logger.info('Creating Alipay payment', { outTradeNo: params.outTradeNo });

    try {
      const result = await this.client.exec('alipay.trade.create', {
        notify_url: this.config.notifyUrl,
        biz_content: {
          out_trade_no: params.outTradeNo,
          total_amount: params.totalAmount.toFixed(2),
          subject: params.subject,
          body: params.body,
          buyer_id: params.buyerId,
        },
      });

      if (result.code !== '10000') {
        throw new ExternalServiceError('Alipay', result.msg || '创建支付失败');
      }

      logger.info('Alipay payment created', {
        outTradeNo: params.outTradeNo,
        tradeNo: result.trade_no,
      });

      return result.trade_no;
    } catch (error) {
      logger.error('Failed to create Alipay payment', error as Error, {
        outTradeNo: params.outTradeNo,
      });
      throw new ExternalServiceError('Alipay', '创建支付失败');
    }
  }

  async queryPayment(outTradeNo: string): Promise<any> {
    logger.info('Querying Alipay payment', { outTradeNo });

    try {
      const result = await this.client.exec('alipay.trade.query', {
        biz_content: {
          out_trade_no: outTradeNo,
        },
      });

      if (result.code !== '10000') {
        throw new ExternalServiceError('Alipay', result.msg || '查询支付失败');
      }

      logger.info('Alipay payment queried', {
        outTradeNo,
        tradeStatus: result.trade_status,
      });

      return result;
    } catch (error) {
      logger.error('Failed to query Alipay payment', error as Error, {
        outTradeNo,
      });
      throw new ExternalServiceError('Alipay', '查询支付失败');
    }
  }

  async refund(params: AlipayRefundParams): Promise<string> {
    logger.info('Creating Alipay refund', { outTradeNo: params.outTradeNo });

    try {
      const result = await this.client.exec('alipay.trade.refund', {
        biz_content: {
          out_trade_no: params.outTradeNo,
          refund_amount: params.refundAmount.toFixed(2),
          refund_reason: params.refundReason,
        },
      });

      if (result.code !== '10000') {
        throw new ExternalServiceError('Alipay', result.msg || '退款失败');
      }

      logger.info('Alipay refund created', {
        outTradeNo: params.outTradeNo,
        refundFee: result.refund_fee,
      });

      return result.fund_change;
    } catch (error) {
      logger.error('Failed to create Alipay refund', error as Error, {
        outTradeNo: params.outTradeNo,
      });
      throw new ExternalServiceError('Alipay', '退款失败');
    }
  }

  verifyNotify(params: any): boolean {
    try {
      const signVerified = this.client.checkNotifySign(params);
      logger.info('Alipay notify verified', { signVerified });
      return signVerified;
    } catch (error) {
      logger.error('Failed to verify Alipay notify', error as Error);
      return false;
    }
  }
}

export const createAlipayService = (config: AlipayConfig) => {
  return new AlipayService(config);
};
```

##### 3.2.2 微信支付SDK集成

```typescript
// backend/integrations/payment/wechatpay.service.ts
import { Wechatpay, Formatter } from 'wechatpay-node-v3';
import { logger } from '@/utils/logger';
import { ExternalServiceError } from '@/shared/errors';

export interface WechatPayConfig {
  appId: string;
  mchId: string;
  privateKey: string;
  serialNo: string;
  apiV3Key: string;
  notifyUrl: string;
}

export interface WechatPaymentParams {
  outTradeNo: string;
  totalAmount: number;
  description: string;
  openid?: string;
}

export interface WechatRefundParams {
  outTradeNo: string;
  outRefundNo: string;
  refundAmount: number;
  totalAmount: number;
  reason?: string;
}

export class WechatPayService {
  private client: Wechatpay;

  constructor(private config: WechatPayConfig) {
    this.client = new Wechatpay({
      appid: config.appId,
      mchid: config.mchId,
      serial_no: config.serialNo,
      privateKey: config.privateKey,
      apiv3_private_key: config.apiV3Key,
    });
  }

  async createPayment(params: WechatPaymentParams): Promise<any> {
    logger.info('Creating WeChat payment', { outTradeNo: params.outTradeNo });

    try {
      const result = await this.client.transactions_jsapi({
        description: params.description,
        out_trade_no: params.outTradeNo,
        notify_url: this.config.notifyUrl,
        amount: {
          total: Math.round(params.totalAmount * 100),
          currency: 'CNY',
        },
        payer: params.openid ? {
          openid: params.openid,
        } : undefined,
      });

      logger.info('WeChat payment created', {
        outTradeNo: params.outTradeNo,
        prepayId: result.prepay_id,
      });

      return result;
    } catch (error) {
      logger.error('Failed to create WeChat payment', error as Error, {
        outTradeNo: params.outTradeNo,
      });
      throw new ExternalServiceError('WeChat Pay', '创建支付失败');
    }
  }

  async queryPayment(outTradeNo: string): Promise<any> {
    logger.info('Querying WeChat payment', { outTradeNo });

    try {
      const result = await this.client.query({
        out_trade_no: outTradeNo,
      });

      logger.info('WeChat payment queried', {
        outTradeNo,
        tradeState: result.trade_state,
      });

      return result;
    } catch (error) {
      logger.error('Failed to query WeChat payment', error as Error, {
        outTradeNo,
      });
      throw new ExternalServiceError('WeChat Pay', '查询支付失败');
    }
  }

  async refund(params: WechatRefundParams): Promise<any> {
    logger.info('Creating WeChat refund', { outTradeNo: params.outTradeNo });

    try {
      const result = await this.client.refunds({
        out_trade_no: params.outTradeNo,
        out_refund_no: params.outRefundNo,
        reason: params.reason || '用户退款',
        amount: {
          refund: Math.round(params.refundAmount * 100),
          total: Math.round(params.totalAmount * 100),
          currency: 'CNY',
        },
      });

      logger.info('WeChat refund created', {
        outTradeNo: params.outTradeNo,
        refundId: result.refund_id,
      });

      return result;
    } catch (error) {
      logger.error('Failed to create WeChat refund', error as Error, {
        outTradeNo: params.outTradeNo,
      });
      throw new ExternalServiceError('WeChat Pay', '退款失败');
    }
  }

  verifyNotify(params: any): boolean {
    try {
      const signature = params['wechatpay-signature'];
      const timestamp = params['wechatpay-timestamp'];
      const nonce = params['wechatpay-nonce'];
      const body = params.body;

      const verified = this.client.verifySignature({
        signature,
        timestamp,
        nonce,
        body,
      });

      logger.info('WeChat notify verified', { verified });
      return verified;
    } catch (error) {
      logger.error('Failed to verify WeChat notify', error as Error);
      return false;
    }
  }
}

export const createWechatPayService = (config: WechatPayConfig) => {
  return new WechatPayService(config);
};
```

##### 3.2.3 统一支付服务

```typescript
// backend/services/payment/unified-payment.service.ts
import { AlipayService } from '@/integrations/payment/alipay.service';
import { WechatPayService } from '@/integrations/payment/wechatpay.service';
import { logger } from '@/utils/logger';
import { ValidationError, ExternalServiceError } from '@/shared/errors';

export type PaymentMethod = 'alipay' | 'wechat';

export interface PaymentParams {
  method: PaymentMethod;
  outTradeNo: string;
  totalAmount: number;
  subject: string;
  body?: string;
  openid?: string;
}

export interface RefundParams {
  method: PaymentMethod;
  outTradeNo: string;
  refundAmount: number;
  totalAmount: number;
  reason?: string;
}

export class UnifiedPaymentService {
  private alipayService?: AlipayService;
  private wechatPayService?: WechatPayService;

  setAlipayService(service: AlipayService) {
    this.alipayService = service;
  }

  setWechatPayService(service: WechatPayService) {
    this.wechatPayService = service;
  }

  async createPayment(params: PaymentParams): Promise<any> {
    logger.info('Creating payment', {
      method: params.method,
      outTradeNo: params.outTradeNo,
      totalAmount: params.totalAmount,
    });

    switch (params.method) {
      case 'alipay':
        if (!this.alipayService) {
          throw new ValidationError('支付宝服务未配置');
        }
        return await this.alipayService.createPayment({
          outTradeNo: params.outTradeNo,
          totalAmount: params.totalAmount,
          subject: params.subject,
          body: params.body,
        });

      case 'wechat':
        if (!this.wechatPayService) {
          throw new ValidationError('微信支付服务未配置');
        }
        return await this.wechatPayService.createPayment({
          outTradeNo: params.outTradeNo,
          totalAmount: params.totalAmount,
          description: params.subject,
          openid: params.openid,
        });

      default:
        throw new ValidationError('不支持的支付方式');
    }
  }

  async queryPayment(method: PaymentMethod, outTradeNo: string): Promise<any> {
    logger.info('Querying payment', { method, outTradeNo });

    switch (method) {
      case 'alipay':
        if (!this.alipayService) {
          throw new ValidationError('支付宝服务未配置');
        }
        return await this.alipayService.queryPayment(outTradeNo);

      case 'wechat':
        if (!this.wechatPayService) {
          throw new ValidationError('微信支付服务未配置');
        }
        return await this.wechatPayService.queryPayment(outTradeNo);

      default:
        throw new ValidationError('不支持的支付方式');
    }
  }

  async refund(params: RefundParams): Promise<any> {
    logger.info('Creating refund', {
      method: params.method,
      outTradeNo: params.outTradeNo,
      refundAmount: params.refundAmount,
    });

    switch (params.method) {
      case 'alipay':
        if (!this.alipayService) {
          throw new ValidationError('支付宝服务未配置');
        }
        return await this.alipayService.refund({
          outTradeNo: params.outTradeNo,
          refundAmount: params.refundAmount,
          refundReason: params.reason,
        });

      case 'wechat':
        if (!this.wechatPayService) {
          throw new ValidationError('微信支付服务未配置');
        }
        return await this.wechatPayService.refund({
          outTradeNo: params.outTradeNo,
          outRefundNo: `refund-${Date.now()}`,
          refundAmount: params.refundAmount,
          totalAmount: params.totalAmount,
          reason: params.reason,
        });

      default:
        throw new ValidationError('不支持的支付方式');
    }
  }

  verifyNotify(method: PaymentMethod, params: any): boolean {
    logger.info('Verifying payment notify', { method });

    switch (method) {
      case 'alipay':
        if (!this.alipayService) {
          return false;
        }
        return this.alipayService.verifyNotify(params);

      case 'wechat':
        if (!this.wechatPayService) {
          return false;
        }
        return this.wechatPayService.verifyNotify(params);

      default:
        return false;
    }
  }
}

export const unifiedPaymentService = new UnifiedPaymentService();
```

#### 3.3 短信SDK集成

##### 3.3.1 阿里云短信SDK集成

```typescript
// backend/integrations/sms/aliyun.service.ts
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
import { logger } from '@/utils/logger';
import { ExternalServiceError } from '@/shared/errors';

export interface AliyunSMSConfig {
  accessKeyId: string;
  accessKeySecret: string;
  endpoint?: string;
  signName: string;
}

export interface SendSMSParams {
  phoneNumbers: string;
  templateCode: string;
  templateParam: Record<string, string>;
}

export class AliyunSMSService {
  private client: Dysmsapi20170525;

  constructor(private config: AliyunSMSConfig) {
    const openApiConfig = new $OpenApi.Config({
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      endpoint: config.endpoint || 'dysmsapi.aliyuncs.com',
    });

    this.client = new Dysmsapi20170525(openApiConfig);
  }

  async sendSMS(params: SendSMSParams): Promise<boolean> {
    logger.info('Sending Aliyun SMS', {
      phoneNumbers: params.phoneNumbers,
      templateCode: params.templateCode,
    });

    try {
      const request = new $Dysmsapi20170525.SendSmsRequest({
        phoneNumbers: params.phoneNumbers,
        signName: this.config.signName,
        templateCode: params.templateCode,
        templateParam: JSON.stringify(params.templateParam),
      });

      const response = await this.client.sendSms(request);

      if (response.body.code !== 'OK') {
        throw new ExternalServiceError('Aliyun SMS', response.body.message || '发送短信失败');
      }

      logger.info('Aliyun SMS sent successfully', {
        phoneNumbers: params.phoneNumbers,
        bizId: response.body.bizId,
      });

      return true;
    } catch (error) {
      logger.error('Failed to send Aliyun SMS', error as Error, {
        phoneNumbers: params.phoneNumbers,
      });
      throw new ExternalServiceError('Aliyun SMS', '发送短信失败');
    }
  }

  async sendBatchSMS(
    phoneNumbers: string[],
    templateCode: string,
    templateParams: Record<string, string>[]
  ): Promise<boolean> {
    logger.info('Sending Aliyun batch SMS', {
      phoneNumbers,
      templateCode,
    });

    try {
      const request = new $Dysmsapi20170525.SendBatchSmsRequest({
        phoneNumberJson: JSON.stringify(phoneNumbers),
        signNameJson: JSON.stringify(Array(phoneNumbers.length).fill(this.config.signName)),
        templateCode,
        templateParamJson: JSON.stringify(templateParams),
      });

      const response = await this.client.sendBatchSms(request);

      if (response.body.code !== 'OK') {
        throw new ExternalServiceError('Aliyun SMS', response.body.message || '发送批量短信失败');
      }

      logger.info('Aliyun batch SMS sent successfully', {
        phoneNumbers,
        bizId: response.body.bizId,
      });

      return true;
    } catch (error) {
      logger.error('Failed to send Aliyun batch SMS', error as Error, {
        phoneNumbers,
      });
      throw new ExternalServiceError('Aliyun SMS', '发送批量短信失败');
    }
  }
}

export const createAliyunSMSService = (config: AliyunSMSConfig) => {
  return new AliyunSMSService(config);
};
```

##### 3.3.2 腾讯云短信SDK集成

```typescript
// backend/integrations/sms/tencent.service.ts
import tencentcloud from 'tencentcloud-sdk-nodejs';
import { logger } from '@/utils/logger';
import { ExternalServiceError } from '@/shared/errors';

const SmsClient = tencentcloud.sms.v20210111.Client;

export interface TencentSMSConfig {
  secretId: string;
  secretKey: string;
  region: string;
  appId: string;
  signName: string;
}

export interface SendSMSParams {
  phoneNumbers: string[];
  templateId: string;
  templateParams: string[];
}

export class TencentSMSService {
  private client: SmsClient;

  constructor(private config: TencentSMSConfig) {
    const clientConfig = {
      credential: {
        secretId: config.secretId,
        secretKey: config.secretKey,
      },
      region: config.region,
      profile: {
        httpProfile: {
          endpoint: 'sms.tencentcloudapi.com',
        },
      },
    };

    this.client = new SmsClient(clientConfig);
  }

  async sendSMS(params: SendSMSParams): Promise<boolean> {
    logger.info('Sending Tencent SMS', {
      phoneNumbers: params.phoneNumbers,
      templateId: params.templateId,
    });

    try {
      const request = {
        PhoneNumberSet: params.phoneNumbers.map(phone => `+86${phone}`),
        SmsSdkAppId: this.config.appId,
        SignName: this.config.signName,
        TemplateId: params.templateId,
        TemplateParamSet: params.templateParams,
      };

      const response = await this.client.SendSms(request);

      if (response.SendStatusSet?.[0].Code !== 'Ok') {
        throw new ExternalServiceError(
          'Tencent SMS',
          response.SendStatusSet?.[0].Message || '发送短信失败'
        );
      }

      logger.info('Tencent SMS sent successfully', {
        phoneNumbers: params.phoneNumbers,
        serialNo: response.SendStatusSet?.[0].SerialNo,
      });

      return true;
    } catch (error) {
      logger.error('Failed to send Tencent SMS', error as Error, {
        phoneNumbers: params.phoneNumbers,
      });
      throw new ExternalServiceError('Tencent SMS', '发送短信失败');
    }
  }
}

export const createTencentSMSService = (config: TencentSMSConfig) => {
  return new TencentSMSService(config);
};
```

##### 3.3.3 统一短信服务

```typescript
// backend/services/sms/unified-sms.service.ts
import { AliyunSMSService } from '@/integrations/sms/aliyun.service';
import { TencentSMSService } from '@/integrations/sms/tencent.service';
import { logger } from '@/utils/logger';
import { ValidationError } from '@/shared/errors';

export type SMSProvider = 'aliyun' | 'tencent';

export interface SendSMSParams {
  provider: SMSProvider;
  phoneNumbers: string | string[];
  templateCode: string;
  templateId?: string;
  templateParams: Record<string, string> | string[];
}

export class UnifiedSMSService {
  private aliyunService?: AliyunSMSService;
  private tencentService?: TencentSMSService;

  setAliyunService(service: AliyunSMSService) {
    this.aliyunService = service;
  }

  setTencentService(service: TencentSMSService) {
    this.tencentService = service;
  }

  async sendSMS(params: SendSMSParams): Promise<boolean> {
    logger.info('Sending SMS', {
      provider: params.provider,
      phoneNumbers: params.phoneNumbers,
    });

    switch (params.provider) {
      case 'aliyun':
        if (!this.aliyunService) {
          throw new ValidationError('阿里云短信服务未配置');
        }
        return await this.aliyunService.sendSMS({
          phoneNumbers: params.phoneNumbers as string,
          templateCode: params.templateCode,
          templateParam: params.templateParams as Record<string, string>,
        });

      case 'tencent':
        if (!this.tencentService) {
          throw new ValidationError('腾讯云短信服务未配置');
        }
        return await this.tencentService.sendSMS({
          phoneNumbers: Array.isArray(params.phoneNumbers) ? params.phoneNumbers : [params.phoneNumbers],
          templateId: params.templateId || params.templateCode,
          templateParams: params.templateParams as string[],
        });

      default:
        throw new ValidationError('不支持的短信服务商');
    }
  }
}

export const unifiedSMSService = new UnifiedSMSService();
```

#### 3.4 存储SDK集成

##### 3.4.1 阿里云OSS SDK集成

```typescript
// backend/integrations/storage/aliyun.service.ts
import OSS from 'ali-oss';
import { logger } from '@/utils/logger';
import { ExternalServiceError } from '@/shared/errors';

export interface AliyunOSSConfig {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
  endpoint?: string;
}

export interface UploadOptions {
  contentType?: string;
  headers?: Record<string, string>;
}

export class AliyunOSSService {
  private client: OSS;

  constructor(private config: AliyunOSSConfig) {
    this.client = new OSS({
      region: config.region,
      accessKeyId: config.accessKeyId,
      accessKeySecret: config.accessKeySecret,
      bucket: config.bucket,
      endpoint: config.endpoint,
    });
  }

  async upload(
    path: string,
    buffer: Buffer,
    options: UploadOptions = {}
  ): Promise<string> {
    logger.info('Uploading to Aliyun OSS', { path, size: buffer.length });

    try {
      const result = await this.client.put(path, buffer, {
        headers: options.headers,
        mime: options.contentType,
      });

      logger.info('Uploaded to Aliyun OSS successfully', {
        path,
        url: result.url,
      });

      return result.url;
    } catch (error) {
      logger.error('Failed to upload to Aliyun OSS', error as Error, { path });
      throw new ExternalServiceError('Aliyun OSS', '文件上传失败');
    }
  }

  async download(path: string): Promise<Buffer> {
    logger.info('Downloading from Aliyun OSS', { path });

    try {
      const result = await this.client.get(path);

      logger.info('Downloaded from Aliyun OSS successfully', {
        path,
        size: result.content.length,
      });

      return result.content;
    } catch (error) {
      logger.error('Failed to download from Aliyun OSS', error as Error, { path });
      throw new ExternalServiceError('Aliyun OSS', '文件下载失败');
    }
  }

  async delete(path: string): Promise<void> {
    logger.info('Deleting from Aliyun OSS', { path });

    try {
      await this.client.delete(path);

      logger.info('Deleted from Aliyun OSS successfully', { path });
    } catch (error) {
      logger.error('Failed to delete from Aliyun OSS', error as Error, { path });
      throw new ExternalServiceError('Aliyun OSS', '文件删除失败');
    }
  }

  async deleteMultiple(paths: string[]): Promise<void> {
    logger.info('Deleting multiple files from Aliyun OSS', { count: paths.length });

    try {
      await this.client.deleteMulti(paths);

      logger.info('Deleted multiple files from Aliyun OSS successfully', {
        count: paths.length,
      });
    } catch (error) {
      logger.error('Failed to delete multiple files from Aliyun OSS', error as Error);
      throw new ExternalServiceError('Aliyun OSS', '批量删除文件失败');
    }
  }

  async getSignedUrl(path: string, expires: number = 3600): Promise<string> {
    try {
      const url = this.client.signatureUrl(path, {
        expires,
      });

      logger.info('Generated signed URL from Aliyun OSS', { path, expires });

      return url;
    } catch (error) {
      logger.error('Failed to generate signed URL from Aliyun OSS', error as Error, {
        path,
      });
      throw new ExternalServiceError('Aliyun OSS', '生成签名URL失败');
    }
  }

  async exists(path: string): Promise<boolean> {
    try {
      await this.client.head(path);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const createAliyunOSSService = (config: AliyunOSSConfig) => {
  return new AliyunOSSService(config);
};
```

##### 3.4.2 腾讯云COS SDK集成

```typescript
// backend/integrations/storage/tencent.service.ts
import { COS } from 'cos-nodejs-sdk-v5';
import { logger } from '@/utils/logger';
import { ExternalServiceError } from '@/shared/errors';

export interface TencentCOSConfig {
  secretId: string;
  secretKey: string;
  region: string;
  bucket: string;
}

export interface UploadOptions {
  contentType?: string;
  headers?: Record<string, string>;
}

export class TencentCOSService {
  private client: COS;

  constructor(private config: TencentCOSConfig) {
    this.client = new COS({
      SecretId: config.secretId,
      SecretKey: config.secretKey,
    });
  }

  async upload(
    path: string,
    buffer: Buffer,
    options: UploadOptions = {}
  ): Promise<string> {
    logger.info('Uploading to Tencent COS', { path, size: buffer.length });

    try {
      const result = await this.client.putObject({
        Bucket: config.bucket,
        Region: config.region,
        Key: path,
        Body: buffer,
        ContentType: options.contentType,
      });

      const url = `https://${config.bucket}.cos.${config.region}.myqcloud.com/${path}`;

      logger.info('Uploaded to Tencent COS successfully', {
        path,
        url,
      });

      return url;
    } catch (error) {
      logger.error('Failed to upload to Tencent COS', error as Error, { path });
      throw new ExternalServiceError('Tencent COS', '文件上传失败');
    }
  }

  async download(path: string): Promise<Buffer> {
    logger.info('Downloading from Tencent COS', { path });

    try {
      const result = await this.client.getObject({
        Bucket: this.config.bucket,
        Region: this.config.region,
        Key: path,
      });

      logger.info('Downloaded from Tencent COS successfully', {
        path,
        size: result.ContentLength,
      });

      return result.Body as Buffer;
    } catch (error) {
      logger.error('Failed to download from Tencent COS', error as Error, { path });
      throw new ExternalServiceError('Tencent COS', '文件下载失败');
    }
  }

  async delete(path: string): Promise<void> {
    logger.info('Deleting from Tencent COS', { path });

    try {
      await this.client.deleteObject({
        Bucket: this.config.bucket,
        Region: this.config.region,
        Key: path,
      });

      logger.info('Deleted from Tencent COS successfully', { path });
    } catch (error) {
      logger.error('Failed to delete from Tencent COS', error as Error, { path });
      throw new ExternalServiceError('Tencent COS', '文件删除失败');
    }
  }

  async deleteMultiple(paths: string[]): Promise<void> {
    logger.info('Deleting multiple files from Tencent COS', { count: paths.length });

    try {
      await this.client.deleteMultipleObject({
        Bucket: this.config.bucket,
        Region: this.config.region,
        Objects: paths.map(path => ({ Key: path })),
      });

      logger.info('Deleted multiple files from Tencent COS successfully', {
        count: paths.length,
      });
    } catch (error) {
      logger.error('Failed to delete multiple files from Tencent COS', error as Error);
      throw new ExternalServiceError('Tencent COS', '批量删除文件失败');
    }
  }

  async getSignedUrl(path: string, expires: number = 3600): Promise<string> {
    try {
      const url = this.client.getObjectUrl({
        Bucket: this.config.bucket,
        Region: this.config.region,
        Key: path,
        Sign: true,
        Expires: expires,
      });

      logger.info('Generated signed URL from Tencent COS', { path, expires });

      return url;
    } catch (error) {
      logger.error('Failed to generate signed URL from Tencent COS', error as Error, {
        path,
      });
      throw new ExternalServiceError('Tencent COS', '生成签名URL失败');
    }
  }

  async exists(path: string): Promise<boolean> {
    try {
      await this.client.headObject({
        Bucket: this.config.bucket,
        Region: this.config.region,
        Key: path,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const createTencentCOSService = (config: TencentCOSConfig) => {
  return new TencentCOSService(config);
};
```

##### 3.4.3 统一存储服务

```typescript
// backend/services/storage/unified-storage.service.ts
import { AliyunOSSService } from '@/integrations/storage/aliyun.service';
import { TencentCOSService } from '@/integrations/storage/tencent.service';
import { logger } from '@/utils/logger';
import { ValidationError } from '@/shared/errors';

export type StorageProvider = 'aliyun' | 'tencent';

export interface UploadOptions {
  contentType?: string;
  headers?: Record<string, string>;
}

export class UnifiedStorageService {
  private aliyunService?: AliyunOSSService;
  private tencentService?: TencentCOSService;

  setAliyunService(service: AliyunOSSService) {
    this.aliyunService = service;
  }

  setTencentService(service: TencentCOSService) {
    this.tencentService = service;
  }

  async upload(
    provider: StorageProvider,
    path: string,
    buffer: Buffer,
    options: UploadOptions = {}
  ): Promise<string> {
    logger.info('Uploading file', {
      provider,
      path,
      size: buffer.length,
    });

    switch (provider) {
      case 'aliyun':
        if (!this.aliyunService) {
          throw new ValidationError('阿里云存储服务未配置');
        }
        return await this.aliyunService.upload(path, buffer, options);

      case 'tencent':
        if (!this.tencentService) {
          throw new ValidationError('腾讯云存储服务未配置');
        }
        return await this.tencentService.upload(path, buffer, options);

      default:
        throw new ValidationError('不支持的存储服务商');
    }
  }

  async download(provider: StorageProvider, path: string): Promise<Buffer> {
    logger.info('Downloading file', { provider, path });

    switch (provider) {
      case 'aliyun':
        if (!this.aliyunService) {
          throw new ValidationError('阿里云存储服务未配置');
        }
        return await this.aliyunService.download(path);

      case 'tencent':
        if (!this.tencentService) {
          throw new ValidationError('腾讯云存储服务未配置');
        }
        return await this.tencentService.download(path);

      default:
        throw new ValidationError('不支持的存储服务商');
    }
  }

  async delete(provider: StorageProvider, path: string): Promise<void> {
    logger.info('Deleting file', { provider, path });

    switch (provider) {
      case 'aliyun':
        if (!this.aliyunService) {
          throw new ValidationError('阿里云存储服务未配置');
        }
        return await this.aliyunService.delete(path);

      case 'tencent':
        if (!this.tencentService) {
          throw new ValidationError('腾讯云存储服务未配置');
        }
        return await this.tencentService.delete(path);

      default:
        throw new ValidationError('不支持的存储服务商');
    }
  }

  async getSignedUrl(
    provider: StorageProvider,
    path: string,
    expires: number = 3600
  ): Promise<string> {
    switch (provider) {
      case 'aliyun':
        if (!this.aliyunService) {
          throw new ValidationError('阿里云存储服务未配置');
        }
        return await this.aliyunService.getSignedUrl(path, expires);

      case 'tencent':
        if (!this.tencentService) {
          throw new ValidationError('腾讯云存储服务未配置');
        }
        return await this.tencentService.getSignedUrl(path, expires);

      default:
        throw new ValidationError('不支持的存储服务商');
    }
  }
}

export const unifiedStorageService = new UnifiedStorageService();
```

#### 3.5 AI服务SDK集成

##### 3.5.1 OpenAI SDK集成

```typescript
// backend/integrations/ai/openai.service.ts
import OpenAI from 'openai';
import { logger } from '@/utils/logger';
import { ExternalServiceError } from '@/shared/errors';

export interface OpenAIConfig {
  apiKey: string;
  baseURL?: string;
  model?: string;
}

export interface ChatCompletionParams {
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  maxTokens?: number;
}

export class OpenAIService {
  private client: OpenAI;
  private defaultModel: string;

  constructor(private config: OpenAIConfig) {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
    });
    this.defaultModel = config.model || 'gpt-3.5-turbo';
  }

  async chatCompletion(params: ChatCompletionParams): Promise<string> {
    logger.info('Calling OpenAI chat completion', {
      model: this.defaultModel,
      messageCount: params.messages.length,
    });

    try {
      const response = await this.client.chat.completions.create({
        model: this.defaultModel,
        messages: params.messages,
        temperature: params.temperature || 0.7,
        max_tokens: params.maxTokens || 1000,
      });

      const content = response.choices[0]?.message?.content || '';

      logger.info('OpenAI chat completion successful', {
        model: this.defaultModel,
        tokensUsed: response.usage?.total_tokens,
      });

      return content;
    } catch (error) {
      logger.error('Failed to call OpenAI chat completion', error as Error);
      throw new ExternalServiceError('OpenAI', 'AI对话失败');
    }
  }

  async generateScript(prompt: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的短剧编剧，擅长创作引人入胜的故事情节。',
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    return await this.chatCompletion({
      messages,
      temperature: 0.8,
      maxTokens: 2000,
    });
  }
}

export const createOpenAIService = (config: OpenAIConfig) => {
  return new OpenAIService(config);
};
```

#### 3.6 配置管理

```typescript
// shared/config/sdk.config.ts
export interface SDKConfig {
  payment: {
    alipay: {
      enabled: boolean;
      appId: string;
      privateKey: string;
      alipayPublicKey: string;
      gateway: string;
      notifyUrl: string;
    };
    wechatpay: {
      enabled: boolean;
      appId: string;
      mchId: string;
      privateKey: string;
      serialNo: string;
      apiV3Key: string;
      notifyUrl: string;
    };
  };
  sms: {
    aliyun: {
      enabled: boolean;
      accessKeyId: string;
      accessKeySecret: string;
      endpoint: string;
      signName: string;
    };
    tencent: {
      enabled: boolean;
      secretId: string;
      secretKey: string;
      region: string;
      appId: string;
      signName: string;
    };
  };
  storage: {
    aliyun: {
      enabled: boolean;
      region: string;
      accessKeyId: string;
      accessKeySecret: string;
      bucket: string;
      endpoint: string;
    };
    tencent: {
      enabled: boolean;
      secretId: string;
      secretKey: string;
      region: string;
      bucket: string;
    };
  };
  ai: {
    openai: {
      enabled: boolean;
      apiKey: string;
      baseURL: string;
      model: string;
    };
  };
}

export const sdkConfig: SDKConfig = {
  payment: {
    alipay: {
      enabled: process.env.ALIPAY_ENABLED === 'true',
      appId: process.env.ALIPAY_APP_ID || '',
      privateKey: process.env.ALIPAY_PRIVATE_KEY || '',
      alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY || '',
      gateway: process.env.ALIPAY_GATEWAY || 'https://openapi.alipay.com/gateway.do',
      notifyUrl: process.env.ALIPAY_NOTIFY_URL || '',
    },
    wechatpay: {
      enabled: process.env.WECHATPAY_ENABLED === 'true',
      appId: process.env.WECHATPAY_APP_ID || '',
      mchId: process.env.WECHATPAY_MCH_ID || '',
      privateKey: process.env.WECHATPAY_PRIVATE_KEY || '',
      serialNo: process.env.WECHATPAY_SERIAL_NO || '',
      apiV3Key: process.env.WECHATPAY_API_V3_KEY || '',
      notifyUrl: process.env.WECHATPAY_NOTIFY_URL || '',
    },
  },
  sms: {
    aliyun: {
      enabled: process.env.ALIYUN_SMS_ENABLED === 'true',
      accessKeyId: process.env.ALIYUN_SMS_ACCESS_KEY_ID || '',
      accessKeySecret: process.env.ALIYUN_SMS_ACCESS_KEY_SECRET || '',
      endpoint: process.env.ALIYUN_SMS_ENDPOINT || 'dysmsapi.aliyuncs.com',
      signName: process.env.ALIYUN_SMS_SIGN_NAME || '',
    },
    tencent: {
      enabled: process.env.TENCENT_SMS_ENABLED === 'true',
      secretId: process.env.TENCENT_SMS_SECRET_ID || '',
      secretKey: process.env.TENCENT_SMS_SECRET_KEY || '',
      region: process.env.TENCENT_SMS_REGION || 'ap-guangzhou',
      appId: process.env.TENCENT_SMS_APP_ID || '',
      signName: process.env.TENCENT_SMS_SIGN_NAME || '',
    },
  },
  storage: {
    aliyun: {
      enabled: process.env.ALIYUN_OSS_ENABLED === 'true',
      region: process.env.ALIYUN_OSS_REGION || '',
      accessKeyId: process.env.ALIYUN_OSS_ACCESS_KEY_ID || '',
      accessKeySecret: process.env.ALIYUN_OSS_ACCESS_KEY_SECRET || '',
      bucket: process.env.ALIYUN_OSS_BUCKET || '',
      endpoint: process.env.ALIYUN_OSS_ENDPOINT || '',
    },
    tencent: {
      enabled: process.env.TENCENT_COS_ENABLED === 'true',
      secretId: process.env.TENCENT_COS_SECRET_ID || '',
      secretKey: process.env.TENCENT_COS_SECRET_KEY || '',
      region: process.env.TENCENT_COS_REGION || '',
      bucket: process.env.TENCENT_COS_BUCKET || '',
    },
  },
  ai: {
    openai: {
      enabled: process.env.OPENAI_ENABLED === 'true',
      apiKey: process.env.OPENAI_API_KEY || '',
      baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    },
  },
};
```

#### 3.7 测试方案

```typescript
// tests/unit/integrations/payment/alipay.service.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AlipayService } from '@/integrations/payment/alipay.service';

describe('AlipayService', () => {
  let alipayService: AlipayService;

  beforeEach(() => {
    alipayService = new AlipayService({
      appId: 'test-app-id',
      privateKey: 'test-private-key',
      alipayPublicKey: 'test-public-key',
      gateway: 'https://openapi.alipay.com/gateway.do',
      notifyUrl: 'https://example.com/notify',
    });
  });

  describe('createPayment', () => {
    it('should create payment successfully', async () => {
      const params = {
        outTradeNo: 'ORDER-001',
        totalAmount: 100,
        subject: '测试订单',
      };

      vi.spyOn(alipayService['client'], 'exec').mockResolvedValue({
        code: '10000',
        msg: 'Success',
        trade_no: 'ALIPAY-001',
      } as any);

      const result = await alipayService.createPayment(params);

      expect(result).toBe('ALIPAY-001');
    });
  });
});
```

#### 3.8 SDK使用示例

```typescript
// backend/app.ts
import { sdkConfig } from '@/config/sdk.config';
import { createAlipayService, createWechatPayService } from '@/integrations/payment';
import { createAliyunSMSService, createTencentSMSService } from '@/integrations/sms';
import { createAliyunOSSService, createTencentCOSService } from '@/integrations/storage';
import { createOpenAIService } from '@/integrations/ai';
import { unifiedPaymentService } from '@/services/payment/unified-payment.service';
import { unifiedSMSService } from '@/services/sms/unified-sms.service';
import { unifiedStorageService } from '@/services/storage/unified-storage.service';

export function initializeSDKServices() {
  if (sdkConfig.payment.alipay.enabled) {
    const alipayService = createAlipayService(sdkConfig.payment.alipay);
    unifiedPaymentService.setAlipayService(alipayService);
  }

  if (sdkConfig.payment.wechatpay.enabled) {
    const wechatPayService = createWechatPayService(sdkConfig.payment.wechatpay);
    unifiedPaymentService.setWechatPayService(wechatPayService);
  }

  if (sdkConfig.sms.aliyun.enabled) {
    const aliyunSMSService = createAliyunSMSService(sdkConfig.sms.aliyun);
    unifiedSMSService.setAliyunService(aliyunSMSService);
  }

  if (sdkConfig.sms.tencent.enabled) {
    const tencentSMSService = createTencentSMSService(sdkConfig.sms.tencent);
    unifiedSMSService.setTencentService(tencentSMSService);
  }

  if (sdkConfig.storage.aliyun.enabled) {
    const aliyunOSSService = createAliyunOSSService(sdkConfig.storage.aliyun);
    unifiedStorageService.setAliyunService(aliyunOSSService);
  }

  if (sdkConfig.storage.tencent.enabled) {
    const tencentCOSService = createTencentCOSService(sdkConfig.storage.tencent);
    unifiedStorageService.setTencentService(tencentCOSService);
  }

  if (sdkConfig.ai.openai.enabled) {
    const openAIService = createOpenAIService(sdkConfig.ai.openai);
  }
}
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
