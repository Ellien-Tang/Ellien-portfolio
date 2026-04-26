export const projects = [
  {
    id: 'lowcode-platform',
    title: '智能营销页面搭建平台',
    description: '基于 Vue 3 的低代码平台，支持拖拽式页面搭建...',
    // ... 其他字段保持不变
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
        image: '/timeline-lowcode-1.jpg',  // 后面放真实截图
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