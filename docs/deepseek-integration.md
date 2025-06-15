# Deepseek API 集成文档

## 概述
本文档描述了如何在项目中集成和使用 Deepseek API，通过 Supabase Edge Functions 进行调用。

## 技术实现

### 1. 组合式函数 (Composable)
在 `composables/useDeepseek.ts` 中实现了 `useDeepseek` 组合式函数，提供以下功能：
- API 调用封装
- 加载状态管理
- 错误处理

### 2. 组件实现
在 `components/DeepseekChat.vue` 中实现了聊天界面组件，包含：
- 文本输入区域
- 发送按钮
- 加载状态显示
- 错误信息展示
- 响应结果展示

### 3. 页面集成
在 `pages/index.vue` 中集成了聊天组件，提供了简洁的用户界面。

## 使用方法

### API 调用
```typescript
const { callDeepseek, loading, error } = useDeepseek()

// 调用 API
const result = await callDeepseek('你的问题')
```

### 组件使用
```vue
<template>
  <DeepseekChat />
</template>
```

## 注意事项
1. API 调用需要确保网络连接正常
2. 建议对用户输入进行适当的验证和过滤
3. 需要处理可能的 API 错误响应 