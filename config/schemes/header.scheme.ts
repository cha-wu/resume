// ==================== 头部配置方案 ====================

import { HeaderConfig, ContactType } from '../types'

export const headerConfig: HeaderConfig = {
  // 姓名
  name: '茶无',

  // GitHub地址
  github: 'cha-wu',

  // 意向的工作
  job: '全栈开发工程师',

  // 简介栏
  profiles: [
    '男 · 5年工作经验',
    '某知名大学 · 计算机科学与技术',
    '技术栈：React / Next.js / Node.js / TypeScript',
  ],

  // 信息栏
  contacts: [
    { address: '3262895854@qq.com', type: ContactType.MAIL },
    { address: 'blog.smob.cc', type: ContactType.BLOG },
    { address: '13800138000', type: ContactType.TELL, noLink: true },
  ],

  // 是否显示微信二维码
  weChatQrCode: true,

  // 是否在HTML文档页面显示二维码
  showWeChatQrCodeInHTML: true,
}
