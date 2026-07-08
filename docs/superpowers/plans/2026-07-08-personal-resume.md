# Personal Resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal resume web app with Vue 3 + Element Plus + Tailwind CSS, tab-based navigation, responsive design, deployable to GitHub Pages.

**Architecture:** Vue 3 SPA with Vue Router for tab switching. Static resume data in a single JSON file. Layout components (header/footer/nav) shared across all routes. Section components render each resume category. TypeScript types ensure data integrity.

**Tech Stack:** Vue 3 + TypeScript + Vite + Vue Router 4 + Element Plus 2 + Tailwind CSS 4

---

## File Structure Map

```
my_resume/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── env.d.ts
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── style.css                  # Tailwind imports + global styles
│   ├── types/
│   │   └── resume.ts              # TypeScript interfaces for resume data
│   ├── data/
│   │   └── resume.json            # Resume content (user-editable)
│   ├── composables/
│   │   └── useResume.ts           # Import & type resume JSON
│   ├── router/
│   │   └── index.ts               # Vue Router config
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.vue      # Top nav (desktop) + hamburger (mobile)
│   │   │   └── AppFooter.vue      # Footer bar
│   │   └── sections/
│   │       ├── AboutMe.vue        # Avatar, name, contacts, summary
│   │       ├── Experience.vue     # Timeline, current job highlighted
│   │       ├── Education.vue      # Education list
│   │       ├── Skills.vue         # Skill tags grouped by category
│   │       └── Projects.vue       # Project cards grid
│   └── views/
│       └── HomeView.vue           # Not used directly; each route renders its section
└── .github/
    └── workflows/
        └── deploy.yml             # GitHub Pages deploy action
```

Each file has one clear responsibility:
- Layout files (`AppHeader`, `AppFooter`)  handle page chrome and navigation
- Section files (`AboutMe`, `Experience`, etc.)  render a single resume category
- `useResume.ts` provides typed access to JSON data
- `resume.ts` defines the data contract
- `resume.json` is the single source of truth for all content

---

### Task 1: Project scaffolding

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `env.d.ts`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "my-resume",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 2: Create index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>个人简历</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 3: Create vite.config.ts**

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

- [ ] **Step 5: Create tsconfig.app.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForEmits": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "env.d.ts"]
}
```

- [ ] **Step 6: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 7: Create env.d.ts**

```ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

- [ ] **Step 8: Install dependencies**

```bash
npm install
```
Expected: installs vite, vue, typescript, @vitejs/plugin-vue

- [ ] **Step 9: Verify scaffolding**

```bash
npx vite --host 2>&1 | head -5
```
Expected: Vite dev server starts without errors

---

### Task 2: Install and configure Tailwind CSS + Element Plus + Vue Router

**Files:**
- Modify: `package.json`, `src/main.ts`, `src/style.css`

- [ ] **Step 1: Install additional packages**

```bash
npm install vue-router element-plus tailwindcss @tailwindcss/vite @element-plus/icons-vue
```

- [ ] **Step 2: Create src/style.css**
Create directory first:
```bash
mkdir -p src
```

```css
@import "tailwindcss";

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
```

- [ ] **Step 3: Create src/main.ts**

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
```

- [ ] **Step 4: Verify install**

```bash
npx vite build 2>&1
```
Expected: Build succeeds (even though App.vue and router don't exist yet — we'll create them next)

---

### Task 3: Create TypeScript types and resume data

**Files:**
- Create: `src/types/resume.ts`, `src/data/resume.json`, `src/composables/useResume.ts`

- [ ] **Step 1: Create src/types/resume.ts**

```ts
export interface Basics {
  name: string
  avatar: string
  title: string
  email: string
  phone: string
  github: string
  linkedin: string
  summary: string
}

export interface ExperienceItem {
  company: string
  role: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

export interface EducationItem {
  school: string
  major: string
  degree: string
  startDate: string
  endDate: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface ProjectItem {
  name: string
  image: string
  description: string
  techStack: string[]
  link: string
  github: string
}

export interface Resume {
  basics: Basics
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: SkillGroup[]
  projects: ProjectItem[]
}
```

- [ ] **Step 2: Create src/data/resume.json**

```json
{
  "basics": {
    "name": "张三",
    "avatar": "",
    "title": "前端工程师",
    "email": "zhangsan@example.com",
    "phone": "138-0000-0000",
    "github": "https://github.com/zhangsan",
    "linkedin": "https://linkedin.com/in/zhangsan",
    "summary": "热爱技术的前端工程师，X 年 Web 开发经验，专注于 Vue 生态。"
  },
  "experience": [
    {
      "company": "某上市公司",
      "role": "高级前端工程师",
      "startDate": "2023-01",
      "endDate": "",
      "current": true,
      "description": [
        "负责核心业务模块的前端架构设计与开发",
        "推动团队采用 Vue 3 + TypeScript 技术栈"
      ]
    },
    {
      "company": "某科技公司",
      "role": "前端工程师",
      "startDate": "2020-07",
      "endDate": "2022-12",
      "current": false,
      "description": [
        "参与多个 ToB 项目的前端开发",
        "维护内部组件库"
      ]
    }
  ],
  "education": [
    {
      "school": "某大学",
      "major": "计算机科学与技术",
      "degree": "本科",
      "startDate": "2016-09",
      "endDate": "2020-06"
    }
  ],
  "skills": [
    {
      "category": "编程语言",
      "items": ["JavaScript", "TypeScript", "HTML", "CSS"]
    },
    {
      "category": "框架 & 库",
      "items": ["Vue 3", "React", "Element Plus", "Tailwind CSS"]
    },
    {
      "category": "工具",
      "items": ["Git", "Vite", "Webpack", "VS Code", "Figma"]
    }
  ],
  "projects": [
    {
      "name": "示例项目",
      "image": "",
      "description": "这是一个示例项目的描述，介绍项目的主要功能和亮点。",
      "techStack": ["Vue 3", "TypeScript", "Element Plus"],
      "link": "https://example.com",
      "github": "https://github.com/zhangsan/example"
    }
  ]
}
```

- [ ] **Step 3: Create src/composables/useResume.ts**

```ts
import resumeData from '@/data/resume.json'
import type { Resume } from '@/types/resume'

export function useResume(): Resume {
  return resumeData as Resume
}
```

---

### Task 4: Set up Vue Router

**Files:**
- Create: `src/router/index.ts`

- [ ] **Step 1: Create src/router/index.ts**

```ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/about'
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/components/sections/AboutMe.vue')
    },
    {
      path: '/experience',
      name: 'Experience',
      component: () => import('@/components/sections/Experience.vue')
    },
    {
      path: '/education',
      name: 'Education',
      component: () => import('@/components/sections/Education.vue')
    },
    {
      path: '/skills',
      name: 'Skills',
      component: () => import('@/components/sections/Skills.vue')
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('@/components/sections/Projects.vue')
    }
  ]
})

export default router
```

Using hash history (`createWebHashHistory`) because GitHub Pages doesn't support HTML5 history mode without extra config.

---

### Task 5: Create layout components

**Files:**
- Create: `src/components/layout/AppHeader.vue`, `src/components/layout/AppFooter.vue`

- [ ] **Step 1: Create src/components/layout/AppHeader.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from '@element-plus/icons-vue'

const activeIndex = ref('/about')
const drawerVisible = ref(false)

const menuItems = [
  { path: '/about', label: '关于我' },
  { path: '/experience', label: '工作经历' },
  { path: '/education', label: '教育背景' },
  { path: '/skills', label: '技能' },
  { path: '/projects', label: '项目作品' }
]

function handleSelect(path: string) {
  activeIndex.value = path
  drawerVisible.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
    <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
      <span class="text-lg font-bold text-gray-800">Resume</span>

      <!-- Desktop nav -->
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        class="hidden md:flex border-none! bg-transparent!"
        @select="handleSelect"
      >
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          {{ item.label }}
        </el-menu-item>
      </el-menu>

      <!-- Mobile hamburger -->
      <button class="md:hidden p-2" @click="drawerVisible = true">
        <el-icon :size="22"><Menu /></el-icon>
      </button>
    </div>

    <!-- Mobile drawer -->
    <el-drawer
      v-model="drawerVisible"
      direction="ltr"
      size="70%"
      title="导航"
    >
      <el-menu
        :default-active="activeIndex"
        class="border-none!"
        @select="handleSelect"
      >
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          {{ item.label }}
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </header>
</template>
```

- [ ] **Step 2: Create src/components/layout/AppFooter.vue**

```vue
<template>
  <footer class="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
    <p>&copy; {{ new Date().getFullYear() }} Personal Resume. All rights reserved.</p>
  </footer>
</template>
```

---

### Task 6: Create section components

**Files:**
- Create: `src/components/sections/AboutMe.vue`, `src/components/sections/Experience.vue`, `src/components/sections/Education.vue`, `src/components/sections/Skills.vue`, `src/components/sections/Projects.vue`

- [ ] **Step 1: Create src/components/sections/AboutMe.vue**

```vue
<script setup lang="ts">
import { useResume } from '@/composables/useResume'
import { User, Message, Phone, Link } from '@element-plus/icons-vue'

const { basics } = useResume()

const contacts = [
  { icon: Message, value: basics.email, href: `mailto:${basics.email}` },
  { icon: Phone, value: basics.phone },
  { icon: Link, value: basics.github, href: basics.github },
  { icon: Link, value: basics.linkedin, href: basics.linkedin }
].filter(c => c.value)
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <div class="flex flex-col md:flex-row items-center gap-8">
      <el-avatar :size="128" :src="basics.avatar" class="shrink-0">
        <el-icon :size="48"><User /></el-icon>
      </el-avatar>

      <div class="text-center md:text-left">
        <h1 class="text-3xl font-bold text-gray-900">{{ basics.name }}</h1>
        <p class="text-lg text-gray-500 mt-1">{{ basics.title }}</p>

        <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
          <a
            v-for="c in contacts"
            :key="c.value"
            :href="c.href"
            :target="c.href ? '_blank' : undefined"
            class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 transition-colors"
          >
            <el-icon :size="16"><component :is="c.icon" /></el-icon>
            <span>{{ c.value }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-3">关于我</h2>
      <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{ basics.summary }}</p>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Create src/components/sections/Experience.vue**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useResume } from '@/composables/useResume'
import { TrophyBase } from '@element-plus/icons-vue'

const { experience } = useResume()

const sortedExperience = computed(() => {
  return [...experience].sort((a, b) => {
    if (a.current && !b.current) return -1
    if (!a.current && b.current) return 1
    return b.startDate.localeCompare(a.startDate)
  })
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-8">工作经历</h2>

    <el-timeline>
      <el-timeline-item
        v-for="item in sortedExperience"
        :key="item.company + item.startDate"
        :timestamp="item.startDate + ' — ' + (item.current ? '至今' : item.endDate)"
        placement="top"
      >
        <div
          class="p-4 rounded-lg"
          :class="item.current ? 'bg-blue-50 border border-blue-200' : ''"
        >
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="text-lg font-semibold text-gray-900">{{ item.company }}</h3>
            <el-tag v-if="item.current" type="primary" size="small">
              <el-icon :size="14" class="mr-1"><TrophyBase /></el-icon>
              当前在职
            </el-tag>
          </div>
          <p class="text-gray-600 mt-1">{{ item.role }}</p>
          <ul class="mt-3 space-y-1">
            <li
              v-for="desc in item.description"
              :key="desc"
              class="text-sm text-gray-600 pl-4 relative before:content-['•'] before:absolute before:left-0"
            >
              {{ desc }}
            </li>
          </ul>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
```

- [ ] **Step 3: Create src/components/sections/Education.vue**

```vue
<script setup lang="ts">
import { useResume } from '@/composables/useResume'
import { School } from '@element-plus/icons-vue'

const { education } = useResume()
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-8">教育背景</h2>

    <div class="grid gap-4">
      <div
        v-for="item in education"
        :key="item.school"
        class="flex items-start gap-4 p-5 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
      >
        <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <el-icon :size="22" color="#409EFF"><School /></el-icon>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900">{{ item.school }}</h3>
          <p class="text-gray-600">{{ item.major }} · {{ item.degree }}</p>
          <p class="text-sm text-gray-400 mt-1">{{ item.startDate }} — {{ item.endDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 4: Create src/components/sections/Skills.vue**

```vue
<script setup lang="ts">
import { useResume } from '@/composables/useResume'

const { skills } = useResume()
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-8">技能</h2>

    <div class="space-y-6">
      <div v-for="group in skills" :key="group.category">
        <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          {{ group.category }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <el-tag
            v-for="skill in group.items"
            :key="skill"
            size="large"
            class="text-sm!"
          >
            {{ skill }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 5: Create src/components/sections/Projects.vue**

```vue
<script setup lang="ts">
import { useResume } from '@/composables/useResume'
import { Link, Promotion } from '@element-plus/icons-vue'

const { projects } = useResume()
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-8">项目作品</h2>

    <div class="grid md:grid-cols-2 gap-6">
      <el-card
        v-for="project in projects"
        :key="project.name"
        shadow="hover"
        :body-style="{ padding: '0' }"
      >
        <div
          v-if="project.image"
          class="h-48 bg-gray-100 overflow-hidden"
        >
          <img
            :src="project.image"
            :alt="project.name"
            class="w-full h-full object-cover"
          />
        </div>
        <div
          v-else
          class="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
        >
          <el-icon :size="48" color="#a0aec0"><Promotion /></el-icon>
        </div>

        <div class="p-5">
          <h3 class="text-lg font-semibold text-gray-900">{{ project.name }}</h3>
          <p class="text-sm text-gray-600 mt-2 leading-relaxed">{{ project.description }}</p>

          <div class="flex flex-wrap gap-1.5 mt-3">
            <el-tag
              v-for="tech in project.techStack"
              :key="tech"
              size="small"
            >
              {{ tech }}
            </el-tag>
          </div>

          <div class="flex gap-4 mt-4">
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              class="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600"
            >
              <el-icon :size="14"><Link /></el-icon>
              在线预览
            </a>
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              class="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <el-icon :size="14"><Link /></el-icon>
              源代码
            </a>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
```

---

### Task 7: Create App.vue root component

**Files:**
- Create: `src/App.vue`

- [ ] **Step 1: Create src/App.vue**

```vue
<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()

watch(
  () => route.path,
  (path) => {
    document.title = getPageTitle(path)
  },
  { immediate: true }
)

function getPageTitle(path: string): string {
  const titles: Record<string, string> = {
    '/about': '关于我 - 个人简历',
    '/experience': '工作经历 - 个人简历',
    '/education': '教育背景 - 个人简历',
    '/skills': '技能 - 个人简历',
    '/projects': '项目作品 - 个人简历'
  }
  return titles[path] || '个人简历'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
```

---

### Task 8: Configure GitHub Pages deployment

**Files:**
- Modify: `vite.config.ts`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Update vite.config.ts base path**

Update `vite.config.ts` — add `base` config. The file should now be:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/my_resume/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

Note: `/my_resume/` matches the repository name. If the repo is renamed, update this value.

- [ ] **Step 2: Create .github/workflows/deploy.yml**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

### Task 9: Verify the project builds and runs

- [ ] **Step 1: Build the project**

```bash
npm run build
```
Expected: Build succeeds with no errors. Output in `dist/`.

- [ ] **Step 2: Start dev server and check**

```bash
npm run dev
```
Expected: Dev server starts. Open http://localhost:5173 and verify:
- The page loads without errors
- Navigation tabs switch between sections
- Mobile responsive works (resize browser < 768px)
- All 5 sections render content from resume.json

- [ ] **Step 3: Fix any issues found during verification**

---

### Task 10: Commit all changes

- [ ] **Step 1: Add all files and commit**

```bash
git add -A
git commit -m "feat: initialize personal resume project with Vue 3"
```
