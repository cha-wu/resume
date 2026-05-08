// ==================== 配置入口文件 ====================

import { optionConfig } from './schemes/option.scheme'
import { headerConfig } from './schemes/header.scheme'
import { sectionConfig } from './schemes/section.scheme'
import { ResumeConfig } from './types'

// 角标配置
export const titleConfig = {
  left: `最后同步时间：${process.env.BUILT_TIME || new Date().toLocaleString('zh-CN')}`,
  right: '',
}

export const footerConfig = {
  left: '',
  right: '[网页版简历：resume.example.com](https://resume.example.com)',
  setDefaultRightUrl: true,
}

// Gitalk 配置（可选）
// 返回 false 表示不启用
export const gitalkConfig: false | import('./types').GitalkConfig = false

// 导出完整配置
export const resumeConfig: ResumeConfig = {
  option: optionConfig,
  header: headerConfig,
  sections: sectionConfig,
  title: titleConfig,
  footer: footerConfig,
  gitalk: gitalkConfig,
}
