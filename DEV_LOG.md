# 开发过程日志

## 项目背景

个人网站前端使用 React + Vite + Tailwind CSS 构建，项目展示和博客文章数据原本硬编码在 `src/data/projects.js` 和 `src/data/articles.js` 中。每次更新内容都需要修改源码、重新 build、生成 dist、重新部署到 Sealos，流程繁琐。

本次开发目标：
- 将数据迁移到数据库，通过 API 动态读取
- 建立 Docker 镜像并推送到阿里云镜像仓库
- 通过私有镜像部署到 Sealos
- 提供后台管理界面，方便日常更新内容

---

## 技术选型

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端 | React + Vite + Tailwind CSS | 保持现有技术栈不变 |
| 后端 | Node.js + Express | 轻量，文档丰富 |
| 数据库 | MongoDB Atlas / Sealos MongoDB | 云数据库，后期切换到 Sealos 自建 |
| ORM | Mongoose | MongoDB 的 Node.js 驱动 |
| API | RESTful JSON | 标准接口 |
| 部署 | Docker + 阿里云 ACR + Sealos | 按用户要求的流程 |

---

## 开发历程

### Phase 1：后端服务搭建

**添加内容：**
- 创建 `server/` 目录结构
- `server/server.js`：Express 入口，提供 API + 静态文件托管 + SPA fallback
- `server/models/Project.js`：Mongoose Project 模型
- `server/models/Article.js`：Mongoose Article 模型
- `server/routes/projects.js`：`/api/projects` RESTful CRUD
- `server/routes/articles.js`：`/api/articles` RESTful CRUD
- `server/seed.js`：数据库初始化脚本，将原有静态数据导入 MongoDB
- `server/.env.example`：环境变量模板

**前端改造：**
- 新增 `src/services/api.js`：统一 API 请求封装
- 修改 `Projects.jsx`、`ProjectDetail.jsx`、`BlogList.jsx`、`ArticleDetail.jsx`、`BlogMarquee.jsx`：从静态 `import` 改为 `useEffect` + API 调用

**Git 提交：**
```
feat: add Node.js + Express backend with MongoDB Atlas
```

---

### Phase 2：Docker 镜像构建

**添加内容：**
- `Dockerfile`：多阶段构建，先 build 前端，再打包 Node.js 服务
- `docker-compose.yml`：本地一键启动配置
- `.dockerignore`：排除无用文件

**镜像推送：**
- 登录阿里云个人版镜像仓库
- 构建并推送 `v1.0.0` 到 ACR

---

### Phase 3：Sealos 部署踩坑与修复

#### 问题 1：镜像地址拼接错误

**现象：**
Sealos 应用一直处于"创建中"，Pod 无法启动。

**原因：**
用户在 Sealos 表单里填写镜像地址时，把仓库名带上了，导致 Sealos 自动拼接后变成：
```
...ellien-portfolio:v1.0.0/ellien-tang/ellien-portfolio:v1.0.0
```

**解决：**
修正镜像地址为完整正确路径，删除重复后缀。

---

#### 问题 2：前端文件路径错误（Linux 大小写敏感）

**现象：**
Docker build 报错：`Could not resolve './Navbar' in src/components/Home.jsx`

**原因：**
`Home.jsx` 中导入的是 `./Navbar`，实际文件名是 `./NavBar.jsx`。Windows 不区分大小写所以本地正常，但 Linux 容器区分大小写导致构建失败。

**解决：**
修正导入路径为 `./NavBar`。

**Git 提交：**
```
fix: correct NavBar import case sensitivity for Linux build
```

---

#### 问题 3：容器内 dist 路径错误

**现象：**
页面显示 `Error: ENOENT: no such file or directory, stat '/dist/index.html'`

**原因：**
Dockerfile 中 `COPY server/ ./` 把后端代码放到了 `/app/` 根目录，但 `server.js` 里写死了 `../dist`（预期自己在 `/app/server/` 子目录里），导致它去 `/dist` 找文件，而实际文件在 `/app/dist`。

**解决：**
修改 Dockerfile，将 server 代码放到 `/app/server/`，dist 放在 `/app/dist`，使路径对齐。构建 `v1.0.1` 推送。

```dockerfile
COPY server/ ./server/
COPY --from=builder /app/dist ./dist
CMD ["node", "server/server.js"]
```

---

#### 问题 4：环境变量带分号导致端口解析错误

**现象：**
容器反复重启，503 错误，日志为空。

**原因：**
用户在 Sealos 里配的环境变量值带了末尾分号：`PORT=3000;`，Express 把 `"3000;"` 当成 UNIX Socket 路径监听，启动失败。

**解决：**
去掉环境变量值末尾的分号。同时发现 MongoDB URI 中的 `=` 会导致 Sealos 解析混乱，遂修改 `server.js` 自动补全连接参数逻辑，让用户可以只传基础 URI。

构建 `v1.0.2` 推送。

---

#### 问题 5：MongoDB Atlas 网络白名单限制

**现象：**
页面能打开，但项目和文章加载失败，报错 `Operation projects.find() buffering timed out after 10000ms`

**原因：**
Sealos 服务器的出口 IP 不在 MongoDB Atlas 的 Network Access 白名单里，连接被拒绝。

**解决：**
放弃 Atlas，直接在 Sealos 应用市场部署 MongoDB 实例，使用内网地址连接，彻底规避网络白名单问题。

**最终环境变量：**
```
PORT=3000
MONGODB_URI=mongodb://root:vtp3N828uZd6X811@portfolio-db-mongodb.ns-2feoxkqw.svc:27017/portfolio?authSource=admin
```

---

#### 问题 6：seed.js 路径变化

**现象：**
容器终端里执行 `node seed.js` 报错 `Cannot find module '/app/seed.js'`

**原因：**
Dockerfile 修改后，seed.js 从 `/app/seed.js` 变成了 `/app/server/seed.js`。

**解决：**
执行 `node server/seed.js`。

数据导入成功，网站正常显示。

---

### Phase 4：Admin 管理后台

**需求：**
用户希望有一个可视化界面管理项目和文章，而不是每次敲 curl 命令。

**添加内容：**
- `src/admin/Login.jsx`：简单密码登录（密码 `admin123`）
- `src/admin/AdminLayout.jsx`：后台布局 + 导航
- `src/admin/ProjectManager.jsx`：项目列表、新增、编辑、删除
- `src/admin/ArticleManager.jsx`：文章列表、新增、编辑、删除（支持 Markdown）
- 修改 `src/App.jsx`：添加 `/admin` 路由

**Git 提交：**
```
feat: add admin dashboard for managing projects and articles
```

构建 `v1.0.3` 推送。

---

### Phase 5：图片粘贴/拖拽上传功能

**需求：**
用户希望在管理后台写文章和项目时，可以直接粘贴或拖拽图片到 Markdown 编辑器里，自动生成图片链接并插入正文，而不是手动把图片放到 `public/` 目录再手写路径。

**方案设计：**

前后端分离架构下，有三种常见方案：
1. 手动放 `public/` — 零代码但体验差，每次要重新 build
2. 第三方图床 — 外链可控性差，后期迁移麻烦
3. **自建上传接口 + 粘贴/拖拽监听** — 体验最好，图片存在本地，可控性强

用户选择方案 3，于是需要前后端一起改：后端提供 `POST /api/upload`，前端在 textarea 和 input 上监听 `paste` / `drop` 事件。

**添加内容：**

| 文件 | 说明 |
|------|------|
| `server/routes/upload.js` | 新增 multer 上传路由，限制 5MB，仅接受图片，保存到 `server/uploads/`，返回 `/uploads/{filename}` |
| `server/server.js` | 引入 upload 路由；增加 `/uploads` 静态文件服务（放在 dist 之前，避免被 SPA fallback 拦截） |
| `src/admin/useImageUpload.js` | 前端通用上传 hook：封装 `uploadImage()`、`insertAtCursor()`、`handlePasteImage()`、`handleDropImage()` |
| `src/admin/ArticleManager.jsx` | 重写 textarea 区域，支持 onPaste / onDrop 上传图片，上传中显示遮罩，成功后在光标处插入 `![...](...)` |
| `src/admin/ProjectManager.jsx` | 封面图输入框支持 onPaste / onDrop，直接替换 `image` 字段值为上传后的 URL |
| `src/components/ArticleDetail.jsx` | ReactMarkdown 的 `img` 组件增加圆角、阴影、`loading="lazy"`，提升阅读体验 |
| `Dockerfile` | 增加 `RUN mkdir -p /app/server/uploads && chmod 755 ...`，确保容器启动时上传目录存在且有写权限 |
| `docker-compose.yml` | 增加 volumes 挂载 `./uploads:/app/server/uploads`，防止容器重启后图片丢失 |

**遇到的问题与解决：**

| 问题 | 原因 | 解决 |
|------|------|------|
| PowerShell 不支持 `&&` 连接命令 | Windows PowerShell 语法差异 | 改用 `;` 分隔命令 |
| 后端语法检查超时 | `node --check` 对 `server.js` 通过，但启动时会阻塞等待 MongoDB | 改用 `node --check` 做静态语法检查，测试上传时另起进程并设短超时 |
| Invoke-WebRequest 不支持 `-Form` | PowerShell 5.1 缺少该参数 | 改用 `curl.exe` 直接调用系统 curl |
| 进程残留导致端口占用 | 测试服务器启动后未正常退出 | 通过端口查找并强制结束进程 |
| git 提交前未清理测试文件 | `server/test-server.err` 和 `server/uploads/` 下的测试图片不应进仓库 | 提交前手动删除测试产物，保留空 `uploads/` 目录 |

**Git 提交：**
```
feat: support image paste/drop upload in markdown editor

- Add multer-based /api/upload endpoint for image uploads
- Serve uploaded images via /uploads static route
- Add useImageUpload hook with paste/drop handlers
- ArticleManager: support paste/drop image into textarea
- ProjectManager: support paste/drop image for cover image field
- ArticleDetail: style markdown images with rounded corners and shadow
- Update Dockerfile to ensure uploads directory exists
- Add uploads volume to docker-compose for persistence

chore: bump version to v1.0.4
```

构建 `v1.0.4` 推送。

---

## 最终部署配置

### Sealos 应用配置

| 配置项 | 值 |
|--------|-----|
| 镜像地址 | `crpi-htlq24wphi9j4514.cn-hangzhou.personal.cr.aliyuncs.com/ellien-tang/ellien-portfolio:v1.0.4` |
| 容器端口 | `3000` |
| CPU | `0.5` 核 |
| 内存 | `512Mi` |
| 环境变量 `PORT` | `3000` |
| 环境变量 `MONGODB_URI` | `mongodb://root:vtp3N828uZd6X811@portfolio-db-mongodb.ns-2feoxkqw.svc:27017/portfolio?authSource=admin` |

### 阿里云镜像仓库

- 仓库：`crpi-htlq24wphi9j4514.cn-hangzhou.personal.cr.aliyuncs.com/ellien-tang/ellien-portfolio`
- 当前版本：`v1.0.4`

---

## 版本记录

| 版本 | 说明 |
|------|------|
| v1.0.0 | 初始后端 + Docker 多阶段构建 |
| v1.0.1 | 修复容器内 dist 路径问题 |
| v1.0.2 | 修复环境变量解析问题，自动补全 MongoDB 连接参数 |
| v1.0.3 | 增加 Admin 管理后台（项目/文章增删改查） |
| v1.0.4 | 增加图片粘贴/拖拽上传功能，Markdown 编辑器支持直接插入图片 |

---

## 使用方式

1. 访问网站首页：`https://你的域名/`
2. 访问管理后台：`https://你的域名/admin`
3. 后台密码：`admin123`
4. 以后更新内容直接进后台操作，无需重新 build 和部署
