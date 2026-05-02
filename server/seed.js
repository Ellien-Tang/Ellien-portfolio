import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from './models/Project.js'
import Article from './models/Article.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'

const projectsData = [
  {
    id: 'lowcode-platform',
    title: '智能营销页面搭建平台',
    description: '基于 Vue 3 的低代码平台，支持拖拽式页面搭建...',
    image: '/project-ai-chat.jpg',
    tags: ['Vue 3', 'Node.js', 'SSE', 'OpenAI API'],
    techIcons: ['vue', 'nodejs', 'openai'],
    link: '/projects/ai-chat-app',
    github: 'https://github.com/yourname/ai-chat',
    highlights: [
      '基于 SSE 实现流式响应，首字到达时间 < 500ms',
      '设计对话上下文管理，支持多轮记忆与历史回溯',
      '封装可复用的 Chat 组件，支持 Markdown 渲染与代码高亮'
    ],
    timeline: [
      {
        phase: '需求分析',
        date: '2024.03',
        title: '确定核心功能与架构设计',
        description: '调研市面上主流低代码平台，确定以"JSON Schema 驱动渲染"为核心架构。设计组件元数据结构，支持 props、slots、events 的定义。',
        image: '/timeline-lowcode-1.jpg',
        highlights: ['确定 JSON Schema 规范', '设计组件注册机制']
      },
      {
        phase: '核心开发',
        date: '2024.04',
        title: '实现拖拽引擎与组件渲染器',
        description: '基于 Vue 3 的渲染函数 h() 实现动态组件渲染。使用 SortableJS 实现拖拽排序，通过 provide/inject 实现跨层级状态通信。',
        image: '/timeline-lowcode-2.jpg',
        highlights: ['封装 Draggable 组件', '实现组件属性面板']
      },
      {
        phase: '性能优化',
        date: '2024.05',
        title: '虚拟滚动与懒加载优化',
        description: '当页面组件超过 50 个时出现明显卡顿。引入虚拟滚动只渲染可视区域组件，使用动态 import() 实现组件懒加载，首屏渲染时间从 2.3s 降至 0.8s。',
        image: '/timeline-lowcode-3.jpg',
        highlights: ['虚拟滚动减少 DOM 节点', '懒加载减少首屏 JS 体积']
      },
      {
        phase: '上线部署',
        date: '2024.06',
        title: 'Docker 容器化与 CI/CD',
        description: '配置 Nginx 反向代理，使用 Docker 多阶段构建优化镜像体积。接入 GitHub Actions 实现自动化部署。',
        image: '/timeline-lowcode-4.jpg',
        highlights: ['镜像体积从 800MB 压缩到 120MB', '自动化部署流程']
      }
    ]
  },
  {
    id: 'ai-chat-app',
    title: 'AI 对话助手',
    description: '基于 Vue 3 + Node.js 的 AI 对话应用，支持流式输出、对话历史管理、多轮上下文理解。',
    image: '/project-ai-chat.jpg',
    tags: ['Vue 3', 'Node.js', 'SSE', 'OpenAI API'],
    techIcons: ['vue', 'nodejs', 'openai'],
    link: '/projects/ai-chat-app',
    github: 'https://github.com/yourname/ai-chat',
    highlights: [
      '基于 SSE 实现流式响应，首字到达时间 < 500ms',
      '设计对话上下文管理，支持多轮记忆与历史回溯',
      '封装可复用的 Chat 组件，支持 Markdown 渲染与代码高亮'
    ]
  },
  {
    id: 'react-portfolio',
    title: 'React 个人作品集',
    description: '本网站，使用 React 18 + Tailwind CSS + Framer Motion 构建，包含项目展示、博客、时间线等模块。',
    image: '/project-portfolio.jpg',
    tags: ['React', 'Tailwind', 'Framer Motion', 'Vite'],
    techIcons: ['react', 'tailwind', 'framer'],
    link: '/projects/react-portfolio',
    github: 'https://github.com/yourname/portfolio',
    highlights: [
      '使用 Framer Motion 实现流畅的页面过渡与交互动画',
      '基于 IntersectionObserver 实现导航栏滚动高亮',
      '封装可复用的技术栈图标组件，支持 hover 浮现效果'
    ]
  }
]

const articlesData = [
  {
    id: 'debounce-throttle',
    title: '手写防抖与节流',
    summary: '从实际场景出发，深入理解 debounce 和 throttle 的实现原理与应用场景。',
    tags: ['JavaScript', '手写题'],
    date: '2024-03-15',
    readTime: '8 min',
    content: `# 手写防抖与节流

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
\`\`\`

## 两者对比

| 特性 | 防抖 Debounce | 节流 Throttle |
|------|--------------|---------------|
| 触发时机 | 停止触发后执行 | 固定间隔执行 |
| 使用场景 | 搜索、表单验证 | 滚动、resize、射击游戏 |
| 类比 | 电梯关门 | 水龙头滴水 |

## 总结

- **防抖**：等你不折腾了再执行
- **节流**：不管你折腾多快，我按我的节奏来`
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

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Project.deleteMany({})
    await Article.deleteMany({})
    console.log('Cleared existing data')

    // Insert new data
    await Project.insertMany(projectsData)
    console.log(`Inserted ${projectsData.length} projects`)

    await Article.insertMany(articlesData)
    console.log(`Inserted ${articlesData.length} articles`)

    console.log('Seed completed successfully!')
    process.exit(0)
  } catch (err) {
    console.error('Seed error:', err)
    process.exit(1)
  }
}

seed()
