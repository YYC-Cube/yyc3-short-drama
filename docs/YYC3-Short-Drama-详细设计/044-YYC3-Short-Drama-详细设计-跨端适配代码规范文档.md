---
@file: 044-YYC3-Short-Drama-详细设计-跨端适配代码规范文档.md
@description: YYC3-Short-Drama 小程序、APP、H5多端适配的代码规范与兼容方案
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2025-12-31
@updated: 2026-01-24
@status: published
@tags: [详细设计],[跨端开发],[适配规范]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 044-YYC3-Short-Drama-详细设计-跨端适配代码规范文档

## 概述

本文档详细描述YYC3-Short-Drama短剧平台的跨端适配代码规范，包括小程序、APP、H5多端适配的代码规范与兼容方案，为跨端开发团队提供清晰的开发指导。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC3-Short-Drama项目是一个基于「五高五标五化」理念的AI驱动短剧创作与分发平台，致力于通过人工智能技术赋能短剧内容创作，打造智能化的短剧生态体系。平台融合AI剧本生成、智能推荐、VR/AR沉浸式体验、星值经济体系等创新功能，为用户提供从创作到消费的全链路服务。平台需要支持小程序、APP、H5多端访问，确保用户在不同设备上都能获得一致的用户体验。

#### 1.2 文档目标
- 提供完整的跨端适配代码规范
- 详细描述小程序、APP、H5多端适配方案
- 为跨端开发团队提供清晰的开发指导
- 确保跨端代码符合YYC³标准规范

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：确保多端应用稳定运行，保障用户体验
- **高性能**：优化多端渲染性能和加载速度，提升用户体验
- **高安全性**：保护用户数据和隐私安全，建立多层次安全防护
- **高扩展性**：支持多端业务快速扩展，适应未来发展需求
- **高可维护性**：便于后续维护和升级，降低运维成本

#### 2.2 五标体系
- **标准化**：统一的跨端代码规范和项目结构
- **规范化**：严格的跨端编码规范和代码审查
- **自动化**：使用自动化工具提高跨端开发效率
- **智能化**：使用智能工具辅助跨端开发
- **可视化**：使用可视化工具监控跨端项目状态

#### 2.3 五化架构
- **流程化**：标准化的跨端开发流程和代码审查流程
- **文档化**：完善的跨端代码注释和文档
- **工具化**：使用高效的跨端开发工具和构建工具
- **数字化**：使用数字化工具管理跨端项目
- **生态化**：使用开源工具和框架

### 3. 跨端适配架构

#### 3.1 技术栈选择

**小程序端**
- 框架：Taro 3.x（支持微信小程序、支付宝小程序、抖音小程序等）
- 状态管理：Zustand
- UI组件：Taro UI
- 网络请求：Taro.request
- 路由：Taro Router

**APP端**
- 框架：React Native
- 状态管理：Zustand
- UI组件：React Native Elements / NativeBase
- 网络请求：Axios
- 路由：React Navigation
- 原生模块：React Native Native Modules

**H5端**
- 框架：React 18
- 状态管理：Zustand
- UI组件：Ant Design Mobile / Vant
- 网络请求：Axios
- 路由：React Router v6

#### 3.2 共享代码架构

**代码分层**
```
shared/                  # 共享代码
├── components/          # 共享组件
│   ├── ui/            # UI基础组件
│   └── business/      # 业务组件
├── hooks/             # 共享Hooks
├── services/          # 共享服务
├── stores/            # 共享状态管理
├── utils/             # 共享工具函数
├── types/             # 共享类型定义
├── constants/         # 共享常量
└── config/            # 共享配置
```

**平台特定代码**
```
platforms/
├── miniapp/           # 小程序端
│   ├── app.config.ts
│   ├── app.tsx
│   └── pages/
├── app/               # APP端
│   ├── App.tsx
│   ├── index.js
│   └── screens/
└── h5/                # H5端
    ├── main.tsx
    └── pages/
```

### 4. 跨端适配方案

#### 4.1 环境适配

**平台检测**
```typescript
export const platform = {
  isMiniApp: process.env.TARO_ENV !== undefined,
  isApp: process.env.REACT_APP_PLATFORM === 'app',
  isH5: process.env.REACT_APP_PLATFORM === 'h5',
  isWeChat: process.env.TARO_ENV === 'weapp',
  isAlipay: process.env.TARO_ENV === 'alipay',
  isDouyin: process.env.TARO_ENV === 'tt',
  isIOS: typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent),
  isAndroid: typeof navigator !== 'undefined' && /Android/.test(navigator.userAgent),
};

export const getPlatform = (): 'miniapp' | 'app' | 'h5' => {
  if (platform.isMiniApp) return 'miniapp';
  if (platform.isApp) return 'app';
  return 'h5';
};
```

**环境变量配置**
```typescript
// shared/config/env.ts
export const env = {
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.yyc3.com',
  APP_ID: process.env.APP_ID || '',
  APP_SECRET: process.env.APP_SECRET || '',
  PLATFORM: process.env.PLATFORM || 'h5',
};
```

#### 4.2 样式适配

**响应式设计**
```scss
// shared/styles/responsive.scss
$breakpoints: (
  xs: 320px,
  sm: 375px,
  md: 768px,
  lg: 1024px,
  xl: 1440px,
);

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

@mixin respond-to-max($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (max-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}
```

**平台特定样式**
```scss
// shared/styles/platform.scss
.yyc-button {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;

  // 小程序特定样式
  .yyc-platform--miniapp & {
    padding: 10px 20px;
    font-size: 14px;
  }

  // APP特定样式
  .yyc-platform--app & {
    padding: 14px 28px;
    font-size: 18px;
  }

  // H5特定样式
  .yyc-platform--h5 & {
    padding: 12px 24px;
    font-size: 16px;
  }
}
```

#### 4.3 组件适配

**平台适配组件**
```typescript
// shared/components/platform/PlatformView.tsx
import React from 'react';
import { View as TaroView, Text as TaroText } from '@tarojs/components';
import { View as RNView, Text as RNText } from 'react-native';
import { platform } from '@/utils/platform';

interface PlatformViewProps {
  children: React.ReactNode;
  className?: string;
  style?: any;
}

export const PlatformView: React.FC<PlatformViewProps> = ({ children, className, style }) => {
  if (platform.isMiniApp) {
    return <TaroView className={className} style={style}>{children}</TaroView>;
  }
  if (platform.isApp) {
    return <RNView style={style}>{children}</RNView>;
  }
  return <div className={className} style={style}>{children}</div>;
};

interface PlatformTextProps {
  children: React.ReactNode;
  className?: string;
  style?: any;
}

export const PlatformText: React.FC<PlatformTextProps> = ({ children, className, style }) => {
  if (platform.isMiniApp) {
    return <TaroText className={className} style={style}>{children}</TaroText>;
  }
  if (platform.isApp) {
    return <RNText style={style}>{children}</RNText>;
  }
  return <span className={className} style={style}>{children}</span>;
};
```

**平台适配按钮**
```typescript
// shared/components/ui/Button.tsx
import React from 'react';
import { Button as TaroButton } from '@tarojs/components';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { platform } from '@/utils/platform';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
}) => {
  if (platform.isMiniApp) {
    return (
      <TaroButton
        className={`yyc-button yyc-button--${type} yyc-button--${size} ${className}`.trim()}
        disabled={disabled || loading}
        onClick={onClick}
      >
        {loading ? '加载中...' : children}
      </TaroButton>
    );
  }

  if (platform.isApp) {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          styles[`button--${type}`],
          styles[`button--${size}`],
          disabled && styles.button--disabled,
        ]}
        disabled={disabled || loading}
        onPress={onClick}
      >
        <Text style={[styles.text, styles[`text--${type}`]]}>
          {loading ? '加载中...' : children}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <button
      className={`yyc-button yyc-button--${type} yyc-button--${size} ${className}`.trim()}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? '加载中...' : children}
    </button>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  'button--primary': {
    backgroundColor: '#1890ff',
  },
  'button--secondary': {
    backgroundColor: '#52c41a',
  },
  'button--danger': {
    backgroundColor: '#ff4d4f',
  },
  'button--small': {
    padding: 8,
  },
  'button--medium': {
    padding: 12,
  },
  'button--large': {
    padding: 16,
  },
  'button--disabled': {
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  'text--primary': {
    color: '#fff',
  },
  'text--secondary': {
    color: '#fff',
  },
  'text--danger': {
    color: '#fff',
  },
});
```

#### 4.4 API适配

**统一请求封装**
```typescript
// shared/utils/request.ts
import Taro from '@tarojs/taro';
import axios from 'axios';
import { platform } from './platform';

interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  headers?: Record<string, string>;
  params?: any;
}

class Request {
  async request<T>(config: RequestConfig): Promise<T> {
    if (platform.isMiniApp) {
      return this.taroRequest<T>(config);
    }
    return this.axiosRequest<T>(config);
  }

  private async taroRequest<T>(config: RequestConfig): Promise<T> {
    const response = await Taro.request({
      url: config.url,
      method: config.method || 'GET',
      data: config.data,
      header: config.headers,
      data: config.params,
    });

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return response.data as T;
    }

    throw new Error(`请求失败: ${response.statusCode}`);
  }

  private async axiosRequest<T>(config: RequestConfig): Promise<T> {
    const response = await axios({
      url: config.url,
      method: config.method || 'GET',
      data: config.data,
      headers: config.headers,
      params: config.params,
    });

    return response.data as T;
  }

  get<T>(url: string, params?: any): Promise<T> {
    return this.request<T>({ url, method: 'GET', params });
  }

  post<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ url, method: 'POST', data });
  }

  put<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({ url, method: 'PUT', data });
  }

  delete<T>(url: string): Promise<T> {
    return this.request<T>({ url, method: 'DELETE' });
  }
}

export const request = new Request();
```

#### 4.5 路由适配

**统一路由封装**
```typescript
// shared/utils/router.ts
import Taro from '@tarojs/taro';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '@react-navigation/native';
import { platform } from './platform';

export const useRouter = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();

  return {
    push: (path: string) => {
      if (platform.isMiniApp) {
        Taro.navigateTo({ url: path });
      } else if (platform.isApp) {
        navigation.navigate(path);
      } else {
        navigate(path);
      }
    },
    replace: (path: string) => {
      if (platform.isMiniApp) {
        Taro.redirectTo({ url: path });
      } else if (platform.isApp) {
        navigation.reset({
          index: 0,
          routes: [{ name: path }],
        });
      } else {
        navigate(path, { replace: true });
      }
    },
    back: () => {
      if (platform.isMiniApp) {
        Taro.navigateBack();
      } else if (platform.isApp) {
        navigation.goBack();
      } else {
        navigate(-1);
      }
    },
  };
};
```

#### 4.6 存储适配

**统一存储封装**
```typescript
// shared/utils/storage.ts
import Taro from '@tarojs/taro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { platform } from './platform';

class Storage {
  async setItem(key: string, value: string): Promise<void> {
    if (platform.isMiniApp) {
      await Taro.setStorage({ key, data: value });
    } else if (platform.isApp) {
      await AsyncStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, value);
    }
  }

  async getItem(key: string): Promise<string | null> {
    if (platform.isMiniApp) {
      const result = await Taro.getStorage({ key });
      return result.data;
    } else if (platform.isApp) {
      return await AsyncStorage.getItem(key);
    }
    return localStorage.getItem(key);
  }

  async removeItem(key: string): Promise<void> {
    if (platform.isMiniApp) {
      await Taro.removeStorage({ key });
    } else if (platform.isApp) {
      await AsyncStorage.removeItem(key);
    } else {
      localStorage.removeItem(key);
    }
  }

  async clear(): Promise<void> {
    if (platform.isMiniApp) {
      await Taro.clearStorage();
    } else if (platform.isApp) {
      await AsyncStorage.clear();
    } else {
      localStorage.clear();
    }
  }
}

export const storage = new Storage();
```

### 5. 平台特定实现

#### 5.1 小程序端

**小程序配置**
```typescript
// platforms/miniapp/app.config.ts
export default {
  pages: [
    'pages/home/index',
    'pages/drama/index',
    'pages/user/index',
    'pages/creator/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'YYC³短剧',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#999',
    selectedColor: '#1890ff',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png',
      },
      {
        pagePath: 'pages/drama/index',
        text: '短剧',
        iconPath: 'assets/icons/drama.png',
        selectedIconPath: 'assets/icons/drama-active.png',
      },
      {
        pagePath: 'pages/creator/index',
        text: '创作',
        iconPath: 'assets/icons/creator.png',
        selectedIconPath: 'assets/icons/creator-active.png',
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: 'assets/icons/user.png',
        selectedIconPath: 'assets/icons/user-active.png',
      },
    ],
  },
};
```

**小程序页面**
```typescript
// platforms/miniapp/pages/home/index.tsx
import React from 'react';
import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { DramaList } from '@/shared/components/business/DramaList';

export default function Home() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View className="home-page">
      <Text className="home-page__title">YYC³短剧</Text>
      <DramaList />
    </View>
  );
}
```

#### 5.2 APP端

**APP配置**
```typescript
// platforms/app/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from '@/shared/stores';
import { HomeScreen } from './screens/HomeScreen';
import { DramaScreen } from './screens/DramaScreen';
import { CreatorScreen } from './screens/CreatorScreen';
import { UserScreen } from './screens/UserScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '首页' }} />
      <Tab.Screen name="Drama" component={DramaScreen} options={{ title: '短剧' }} />
      <Tab.Screen name="Creator" component={CreatorScreen} options={{ title: '创作' }} />
      <Tab.Screen name="User" component={UserScreen} options={{ title: '我的' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
```

**APP页面**
```typescript
// platforms/app/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DramaList } from '@/shared/components/business/DramaList';

export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>YYC³短剧</Text>
      <DramaList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
});
```

#### 5.3 H5端

**H5配置**
```typescript
// platforms/h5/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/shared/stores';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```

**H5页面**
```typescript
// platforms/h5/pages/HomePage.tsx
import React from 'react';
import { DramaList } from '@/shared/components/business/DramaList';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1 className="home-page__title">YYC³短剧</h1>
      <DramaList />
    </div>
  );
};
```

### 6. 性能优化

#### 6.1 代码分割

**动态导入**
```typescript
// shared/components/business/DramaList.tsx
import React, { lazy, Suspense } from 'react';

const DramaCard = lazy(() => import('./DramaCard'));

export const DramaList: React.FC = () => {
  return (
    <div className="drama-list">
      <Suspense fallback={<div>加载中...</div>}>
        <DramaCard />
      </Suspense>
    </div>
  );
};
```

#### 6.2 图片优化

**响应式图片**
```typescript
// shared/components/ui/Image.tsx
import React from 'react';
import { Image as TaroImage } from '@tarojs/components';
import { Image as RNImage, ImageStyle } from 'react-native';
import { platform } from '@/utils/platform';

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: any;
  width?: number;
  height?: number;
}

export const Image: React.FC<ImageProps> = ({ src, alt, className, style, width, height }) => {
  if (platform.isMiniApp) {
    return (
      <TaroImage
        src={src}
        className={className}
        style={style}
        mode="aspectFill"
      />
    );
  }

  if (platform.isApp) {
    return (
      <RNImage
        source={{ uri: src }}
        style={[style, { width, height } as ImageStyle]}
        resizeMode="cover"
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
    />
  );
};
```

#### 6.3 缓存策略

**数据缓存**
```typescript
// shared/utils/cache.ts
class Cache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private ttl: number = 5 * 60 * 1000; // 5分钟

  set(key: string, data: any, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });

    if (ttl) {
      setTimeout(() => {
        this.delete(key);
      }, ttl);
    }
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.ttl) {
      this.delete(key);
      return null;
    }

    return item.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cache = new Cache();
```

### 7. 测试策略

#### 7.1 单元测试

```typescript
// shared/components/ui/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### 7.2 E2E测试

```typescript
// e2e/drama.spec.ts
import { test, expect } from '@playwright/test';

test('should display drama list', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.drama-list')).toBeVisible();
  await expect(page.locator('.drama-card')).toHaveCount(10);
});

test('should navigate to drama detail', async ({ page }) => {
  await page.goto('/');
  await page.click('.drama-card:first-child');

  await expect(page).toHaveURL(/\/dramas\/.*/);
  await expect(page.locator('.drama-detail')).toBeVisible();
});
```

### 8. 总结

本文档详细描述了YYC3-Short-Drama短剧平台的跨端适配代码规范，包括小程序、APP、H5多端适配的代码规范与兼容方案。通过这些适配方案的实施，可以确保多端代码结构清晰、易于维护、可扩展性强，为平台的稳定运行和业务扩展提供坚实的跨端基础。

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
