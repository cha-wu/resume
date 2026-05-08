// ==================== 内容配置方案 ====================

import { SectionItem } from '../types'

// 辅助函数：创建段落
const p = (left = '', right = '') => ({ left, right })

// 辅助函数：创建小标题段落
const h = (left = '', right = '') => ({
  left: `#### ${left}`,
  right: right ? `#### ${right}` : '',
})

export const sectionConfig: SectionItem[] = [
  {
    title: '实践经历',
    content: [
      p(
        '**某某科技公司 · 全栈开发工程师** [Link](https://example.com)',
        '2021.7 - 至今'
      ),
      p(
        '负责公司核心产品的前后端开发工作，使用 React + Next.js + Node.js 技术栈。'
      ),
      p('*全栈开发工程师* '),
      p(
        '参与产品架构设计，推动前端工程化建设，引入 TypeScript 提升代码质量。'
      ),
      p(
        '**某互联网公司 · 前端开发工程师**',
        '2019.7 - 2021.6'
      ),
      p('*前端开发工程师*'),
      p(
        '负责公司官网及管理后台的前端开发，使用 Vue.js + Element UI。'
      ),
    ],
  },
  {
    title: '个人能力',
    content: [
      p(
        '- *前端技能*：熟练掌握 React、Vue、TypeScript，了解前端工程化和性能优化。'
      ),
      p(
        '- *后端技能*：熟悉 Node.js、Express/Koa，了解 MySQL、MongoDB 等数据库。'
      ),
      p(
        '- *工程化*：熟悉 Webpack、Vite 等构建工具，了解 CI/CD 流程。'
      ),
      p(
        '- *其他*：良好的代码风格和团队协作能力，热衷于学习新技术。'
      ),
    ],
  },
  {
    title: '个人作品',
    content: [
      h('个人博客'),
      p(
        '使用 Next.js + Notion API 搭建的个人博客，支持 Markdown 渲染、暗黑模式。'
      ),
      h('开源项目'),
      p(
        '在 GitHub 上维护多个开源项目，累计获得 500+ Star。'
      ),
    ],
  },
  {
    title: '项目经历',
    content: [
      p('**企业级管理系统**'),
      p('基于 React + Ant Design Pro 的企业级后台管理系统'),
      p('负责权限管理、数据可视化等核心模块开发。'),
      p('**小程序商城**'),
      p('使用 Taro 开发的多端小程序商城'),
      p('实现商品展示、购物车、订单管理等功能。'),
    ],
  },
]
