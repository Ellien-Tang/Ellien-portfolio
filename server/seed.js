import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import Project from './models/Project.js'
import Article from './models/Article.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'
const BLOG_DIR = 'E:/Kimi_Agent_系统设计博客文件名翻译/system-design-blogs'

const blogMeta = [
  {
    id: 'load-balancing',
    file: '01-load-balancing-strategies-and-techniques.md',
    title: '负载均衡策略与技术精讲',
    tags: ['系统设计', '负载均衡', '面试'],
    date: '2024-03-15',
  },
  {
    id: 'proxy-servers',
    file: '02-proxy-servers.md',
    title: '代理服务器：代理如何工作',
    tags: ['系统设计', '代理', 'Nginx', '面试'],
    date: '2024-03-22',
  },
  {
    id: 'caching-and-cdns',
    file: '03-caching-and-cdns.md',
    title: '缓存与 CDN 终极指南',
    tags: ['系统设计', '缓存', 'CDN', '面试'],
    date: '2024-03-29',
  },
  {
    id: 'api-design',
    file: '04-api-design.md',
    title: 'API 设计 101：从基础到最佳实践',
    tags: ['系统设计', 'API', 'REST', '面试'],
    date: '2024-04-05',
  },
  {
    id: 'application-protocols',
    file: '05-application-protocols.md',
    title: '系统设计面试必备：应用协议详解',
    tags: ['系统设计', '协议', 'HTTP', '面试'],
    date: '2024-04-12',
  },
  {
    id: 'networking-essentials',
    file: '06-networking-essentials.md',
    title: '系统设计概念：网络基础',
    tags: ['系统设计', '网络', 'TCP/IP', '面试'],
    date: '2024-04-19',
  },
  {
    id: 'meeting-design-requirements',
    file: '07-meeting-design-requirements.md',
    title: '系统设计概念：满足设计需求',
    tags: ['系统设计', 'CAP', 'SLO', '面试'],
    date: '2024-04-26',
  },
  {
    id: 'architecture-production-web-apps',
    file: '08-architecture-production-web-apps.md',
    title: '系统设计概念：生产级 Web 应用架构',
    tags: ['系统设计', '架构', 'CI/CD', '面试'],
    date: '2024-05-03',
  },
  {
    id: 'computer-architecture',
    file: '09-computer-architecture.md',
    title: '系统设计概念：计算机架构',
    tags: ['系统设计', '计算机基础', '硬件', '面试'],
    date: '2024-05-10',
  },
  {
    id: 'mastering-databases',
    file: '10-mastering-databases.md',
    title: '系统设计面试：掌握数据库',
    tags: ['系统设计', '数据库', 'MySQL', '面试'],
    date: '2024-05-17',
  },
  {
    id: 'six-system-design-concepts',
    file: '11-six-system-design-concepts.md',
    title: '系统设计面试的 6 大核心概念',
    tags: ['系统设计', '面试', '扩展性', '缓存'],
    date: '2024-05-24',
  },
  {
    id: 'payment-system-simplified',
    file: '12-payment-system-simplified.md',
    title: '支付系统简化',
    tags: ['系统设计', '支付', 'Stripe', '面试'],
    date: '2024-05-31',
  },
]

function readBlogContent(file) {
  return fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
}

function makeSummary(content, maxLen = 180) {
  const plain = content
    .replace(/^#.*$/gm, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>|\-\#]/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (plain.length <= maxLen) return plain
  return plain.slice(0, maxLen).replace(/\s+\S*$/, '') + '...'
}

function estimateReadTime(content) {
  const chars = content.length
  const minutes = Math.max(5, Math.ceil(chars / 500))
  return `${minutes} min`
}

const projectsData = [
  {
    id: 'react-portfolio',
    title: 'React 个人作品集',
    description:
      '本网站，使用 React 19 + Tailwind CSS + Framer Motion 构建的个人作品集，包含项目展示、博客系统、后台管理、时间线等模块。支持响应式布局与流畅的页面过渡动画。',
    image: '/project-portfolio.jpg',
    tags: ['React', 'Tailwind', 'Framer Motion', 'Vite', 'Node.js', 'MongoDB'],
    techIcons: ['react', 'tailwind', 'framer'],
    link: '/projects/react-portfolio',
    github: 'https://github.com/yourname/portfolio',
    highlights: [
      '使用 Framer Motion 实现流畅的页面过渡与交互动画',
      '基于 IntersectionObserver 实现导航栏滚动高亮',
      '封装可复用的技术栈图标组件，支持 hover 浮现效果',
      '后端使用 Express + Mongoose 实现 RESTful API',
    ],
    timeline: [
      {
        phase: '需求分析',
        date: '2025.04',
        title: '确定核心功能与视觉风格',
        description:
          '调研优秀开发者作品集网站，确定以"高对比度黑白黄"为主视觉风格。设计首页 Hero、项目展示、博客时间线、技术栈 marquee 等核心模块。',
        image: '/timeline-portfolio-1.jpg',
        highlights: ['确定高对比度视觉风格', '设计核心页面模块'],
      },
      {
        phase: '核心开发',
        date: '2025.05',
        title: '实现前端页面与后端 API',
        description:
          '使用 React 19 + Vite 搭建项目骨架，集成 Tailwind CSS v4 与 Framer Motion。开发项目卡片、博客详情页、时间线组件。后端使用 Express + MongoDB 实现项目与文章的 CRUD API。',
        image: '/timeline-portfolio-2.jpg',
        highlights: ['搭建 React 19 + Vite 骨架', '实现 MongoDB 数据持久化'],
      },
      {
        phase: '优化上线',
        date: '2025.06',
        title: '性能优化与部署',
        description:
          '使用 Lighthouse 进行性能分析，优化图片懒加载与代码分割。配置 Docker 多阶段构建，部署到云服务器并接入 CDN 加速静态资源。',
        image: '/timeline-portfolio-3.jpg',
        highlights: ['Lighthouse 性能优化', 'Docker 容器化部署'],
      },
    ],
  },
  {
    id: 'myroom-editor',
    title: '低代码看房活动页编辑器',
    description:
      '基于 React + Redux Toolkit + Koa + TypeScript 的低代码活动页编辑器，面向"线上看房 / 营销活动页搭建"场景。支持拖拽式组件编排、实时预览、Schema 持久化与历史记录。',
    image: '/project-myroom.jpg',
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'Koa', 'dnd-kit', 'Ant Design'],
    techIcons: ['react', 'typescript', 'redux'],
    link: '/projects/myroom-editor',
    github: 'https://github.com/yourname/myroom-editor',
    highlights: [
      '基于 dnd-kit 实现画布拖拽编排，支持容器嵌套与多种插入方式',
      '使用 Redux Toolkit 管理编辑器状态，实现撤销、重做、复制、删除',
      '设计 JSON Schema 驱动渲染，支持保存、恢复、导出页面配置',
      '后端使用 Koa + TypeScript 实现 Schema 持久化接口',
    ],
    timeline: [
      {
        phase: '需求分析',
        date: '2025.03',
        title: '确定编辑器核心能力',
        description:
          '调研低代码平台设计模式，确定以"JSON Schema 驱动渲染"为核心架构。设计组件元数据结构，定义 Banner、文本、表单、活动卡片、容器等 5 种基础物料。',
        image: '/timeline-myroom-1.jpg',
        highlights: ['确定 JSON Schema 规范', '设计 5 种基础物料'],
      },
      {
        phase: '核心开发',
        date: '2025.04',
        title: '实现拖拽引擎与属性面板',
        description:
          '基于 React 18 渲染函数实现动态组件渲染。使用 dnd-kit 实现拖拽排序，通过 Redux Toolkit 管理全局状态。开发按组件类型动态渲染的属性配置面板。',
        image: '/timeline-myroom-2.jpg',
        highlights: ['封装 Draggable 组件', '实现组件属性面板'],
      },
      {
        phase: '优化上线',
        date: '2025.05',
        title: '历史记录与后端持久化',
        description:
          '引入命令模式实现撤销/重做栈，支持操作历史合并策略。后端使用 Koa 实现 Schema 保存与恢复接口，数据落盘到本地 JSON 文件。',
        image: '/timeline-myroom-3.jpg',
        highlights: ['命令模式实现撤销重做', 'Koa 后端 Schema 持久化'],
      },
    ],
  },
  {
    id: 'ellien-agent',
    title: 'AI Agent 对话工作台',
    description:
      '基于 Vue 3 + Vite + Pinia + TypeScript + Express 的大模型对话与 Agent 场景 Web 端项目。支持流式响应、多轮上下文管理、RAG 知识库检索与 MCP 工具调用。',
    image: '/project-ellien-agent.jpg',
    tags: ['Vue 3', 'TypeScript', 'Pinia', 'Express', 'MCP', 'RAG'],
    techIcons: ['vue', 'typescript', 'nodejs'],
    link: '/projects/ellien-agent',
    github: 'https://github.com/yourname/ellien-agent',
    highlights: [
      '基于 fetch + ReadableStream 实现 SSE 流式响应，首字到达 < 500ms',
      '服务端实现文本分块、Embedding 建索引与相似度召回的 RAG 链路',
      '基于标准 MCP + Function Calling 实现工具调用，支持 retrieve_knowledge 等工具',
      '使用 vue-virtual-scroller 优化长会话列表渲染性能',
    ],
    timeline: [
      {
        phase: '需求分析',
        date: '2025.02',
        title: '确定 Agent 核心能力',
        description:
          '调研当前大模型对话产品形态，确定以"流式对话 + RAG 知识库 + MCP 工具调用"为核心能力。设计会话管理、消息列表、知识库上传、工具调用状态可视化等模块。',
        image: '/timeline-ellien-1.jpg',
        highlights: ['确定 Agent 三大核心能力', '设计会话与知识库模块'],
      },
      {
        phase: '核心开发',
        date: '2025.03',
        title: '实现流式对话与 RAG 检索',
        description:
          '基于 Vue 3 Composition API 开发对话面板，使用 fetch + ReadableStream 解析 SSE 数据流。服务端实现文本分块、调用 Embedding 模型建索引、相似度召回与引用来源展示。',
        image: '/timeline-ellien-2.jpg',
        highlights: ['SSE 流式响应实现', 'RAG 知识库检索链路'],
      },
      {
        phase: '优化上线',
        date: '2025.04',
        title: 'MCP 工具调用与性能优化',
        description:
          '接入 @modelcontextprotocol/sdk 实现 MCP Client，连接独立 MCP Server 并将工具能力映射给模型。使用 defineAsyncComponent 与 vue-virtual-scroller 优化长会话性能。',
        image: '/timeline-ellien-3.jpg',
        highlights: ['MCP 工具调用链路打通', '虚拟滚动优化长会话'],
      },
    ],
  },
]

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    const force = process.argv.includes('--force')
    if (!force) {
      const existingProjects = await Project.countDocuments()
      const existingArticles = await Article.countDocuments()
      if (existingProjects > 0 || existingArticles > 0) {
        console.log(
          `Database already has ${existingProjects} projects and ${existingArticles} articles.`
        )
        console.log('Use --force to overwrite, or leave as-is.')
        process.exit(0)
      }
    }

    await Project.deleteMany({})
    await Article.deleteMany({})
    console.log('Cleared existing data')

    const articles = blogMeta.map((meta) => {
      const content = readBlogContent(meta.file)
      return {
        id: meta.id,
        title: meta.title,
        summary: makeSummary(content),
        content,
        tags: meta.tags,
        date: meta.date,
        readTime: estimateReadTime(content),
        order: 0,
      }
    })
    await Article.insertMany(articles)
    console.log(`Inserted ${articles.length} articles`)

    await Project.insertMany(projectsData)
    console.log(`Inserted ${projectsData.length} projects`)

    console.log('Seed completed successfully!')
    process.exit(0)
  } catch (err) {
    console.error('Seed error:', err)
    process.exit(1)
  }
}

seed()
