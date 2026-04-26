export const articles = [
  {
    id: 'debounce-throttle',
    title: '手写防抖与节流',
    summary: '从实际场景出发，深入理解 debounce 和 throttle 的实现原理与应用场景。',
    tags: ['JavaScript', '手写题'],
    date: '2024-03-15',
    readTime: '8 min',
    content: `
# 手写防抖与节流

## 什么是防抖（Debounce）

防抖的核心思想：**事件触发后，等待一段时间才执行，如果在这段时间内再次触发，则重新计时**。

### 实际场景

- 搜索框输入，用户停止输入 500ms 后才发送请求
- 窗口 resize，停止调整后才重新计算布局

### 实现代码

\`\`\`javascript
function debounce(fn, delay) {
  let timer = null;
  
  return function (...args) {
    if (timer) clearTimeout(timer);
    
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 使用
const handleSearch = debounce((query) => {
  console.log('搜索:', query);
}, 500);

input.addEventListener('input', (e) => handleSearch(e.target.value));
\`\`\`

## 什么是节流（Throttle）

节流的核心思想：**规定时间内，只执行一次**。

### 实际场景

- 滚动加载更多，每隔 200ms 检查一次是否到达底部
- 游戏射击，限制发射频率

### 实现代码

\`\`\`javascript
function throttle(fn, interval) {
  let lastTime = 0;
  
  return function (...args) {
    const now = Date.now();
    
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 使用时间戳版
function throttle(fn, interval) {
  let timer = null;
  
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, interval);
    }
  };
}
\`\`\`

## 两者对比

| 特性 | 防抖 Debounce | 节流 Throttle |
|------|--------------|---------------|
| 触发时机 | 停止触发后执行 | 固定间隔执行 |
| 使用场景 | 搜索、表单验证 | 滚动、resize、射击游戏 |
| 类比 | 电梯关门 | 水龙头滴水 |

## 总结

- **防抖**：等你不折腾了再执行
- **节流**：不管你折腾多快，我按我的节奏来
    `
  },
  {
    id: 'deep-clone',
    title: '深拷贝的完整实现',
    summary: '处理循环引用、Symbol、Date、RegExp 等边缘情况的深拷贝方案。',
    tags: ['JavaScript', '手写题'],
    date: '2024-03-20',
    readTime: '12 min'
  },
  {
    id: 'promise-all',
    title: '手写 Promise.all',
    summary: '理解 Promise 并发控制，实现一个符合 Promise/A+ 规范的 Promise.all。',
    tags: ['JavaScript', '手写题'],
    date: '2024-03-25',
    readTime: '10 min'
  },
  {
    id: 'vue-reactive',
    title: 'Vue 3 响应式原理',
    summary: '从 Proxy 到依赖收集，彻底理解 Vue 3 的响应式系统。',
    tags: ['Vue', '源码'],
    date: '2024-04-01',
    readTime: '15 min'
  },
  {
    id: 'react-fiber',
    title: 'React Fiber 架构',
    summary: '理解 React 16 重构背后的动机，Fiber 树的工作原理与调度机制。',
    tags: ['React', '源码'],
    date: '2024-04-08',
    readTime: '18 min'
  },
  {
    id: 'vite-build',
    title: 'Vite 构建优化实践',
    summary: '代码分割、懒加载、预构建，让 Vite 项目构建速度飞起来。',
    tags: ['Vite', '工程化'],
    date: '2024-04-15',
    readTime: '10 min'
  },
  {
    id: 'performance',
    title: '前端性能优化清单',
    summary: '从加载到渲染，系统梳理前端性能优化的 20 个关键点。',
    tags: ['性能', '工程化'],
    date: '2024-04-20',
    readTime: '20 min'
  },
  {
    id: 'closure',
    title: '闭包与作用域链',
    summary: '从 ECMAScript 规范角度理解闭包，以及常见的闭包面试题解析。',
    tags: ['JavaScript', '基础'],
    date: '2024-04-22',
    readTime: '8 min'
  }
]