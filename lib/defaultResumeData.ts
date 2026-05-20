// ==================== 默认简历数据 ====================

import { ResumeData } from './types'

export const defaultResumeData: ResumeData = {
  header: {
    name: '茶无',
    github: 'cha-wu',
    job: '前端工程师',
    profiles: [
      '热爱编程，专注于前端开发领域，熟悉 React、Vue 等主流框架',
    ],
    contacts: [
      { address: 'cha-wu@example.com', type: 'mail' },
      { address: 'github.com/cha-wu', type: 'github' },
      { address: '3262895854', type: 'qq' },
    ],
  },
  sections: [
    {
      title: '教育经历',
      content: [
        {
          right: '重庆邮电大学  计算机科学与技术  本科',
          bold: true,
        },
      ],
    },
    {
      title: '技能特长',
      content: [
        { right: 'React、Vue、Next.js', showDot: true },
        { right: 'TypeScript、JavaScript、Python', showDot: true },
        { right: 'Git、Webpack、Vite', showDot: true },
      ],
    },
    {
      title: '项目经验',
      content: [
        {
          right: '校园猫咪管理系统（团队项目）前端核心开发',
          bold: true,
        },
        {
          right: '基于Vite + React + JSX搭建前端工程化项目结构，配置路由判断实现web端与移动端界面UI的转换和打包优化，提升开发构建效率。协同后端定义接口文档，并基于文档预先封装请求方法与数据结构，实现前后端并行开发。负责主页面布局与核心 UI 组件猫咪信息、健康记录查看的开发，实现响应式设计。添加了内容懒加载：只加载用户当前视口可见的内容，提升系统资源利用率与用户体验，同时作为技术基础实现了无限滚动效果。配合后端完成数据交互，实现猫咪档案增删改查、领养状态动态更新等核心业务逻辑。设计并实现交互反馈优化（加载状态、错误提示），前后端联调，提升用户体验。',
          showDot: true,
        },
      ],
    },
  ],
  option: {
    docName: '个人简历',
    printName: '张三-前端工程师-简历',
  },
}
