// ==================== 全局配置方案 ====================

import { OptionConfig } from '../types'

export const optionConfig: OptionConfig = {
  // 屏蔽简历的文字显示
  // 如果显示简历，直接设置成 false 即可
  blockMsg: false,

  // HTML页面的title
  docName: '简历 | 昴君',

  // 此处是针对SEO优化
  description: '昴君的个人简历 - 全栈开发工程师',

  // 生成PDF的默认文件名
  printName: '全栈开发工程师-昴君',

  // 设定 Github Logo 地址
  githubLogoLocation: 'https://github.com/yourusername/resume-next',

  // 是否展示界面最下方作者信息
  showAboutInfo: true,
}
