// ==================== 基础类型定义 ====================

/**
 * 联系方式类型枚举
 */
export enum ContactType {
  MAIL = 'mail',
  BLOG = 'blog',
  GITHUB = 'github',
  QQ = 'qq',
  WECHAT = 'wechat',
  TELL = 'tell',
}

/**
 * 联系方式接口
 */
export interface Contact {
  /** 联系地址/内容 */
  address: string
  /** 联系类型图标 */
  type?: ContactType
  /** 显示地址（可包含HTML） */
  showAddr?: string
  /** 禁用链接，仅展示不跳转 */
  noLink?: boolean
}

/**
 * 内容段落接口
 */
export interface ContentParagraph {
  /** 左侧内容（支持 Markdown） */
  left?: string
  /** 右侧内容（支持 Markdown） */
  right?: string
  /** 是否加粗 */
  bold?: boolean
  /** 是否显示前缀点 */
  showDot?: boolean
}

/**
 * 内容区块接口
 */
export interface SectionItem {
  /** 区块标题 */
  title: string
  /** 内容段落数组 */
  content: ContentParagraph[]
}

/**
 * 头部配置接口
 */
export interface HeaderConfig {
  /** 姓名 */
  name: string
  /** GitHub 用户名 */
  github?: string
  /** 意向职位 */
  job: string
  /** 个人简介数组 */
  profiles: string[]
  /** 联系方式数组 */
  contacts: Contact[]
  /** 是否显示微信二维码 */
  weChatQrCode?: boolean
  /** 是否在 HTML 页面显示二维码 */
  showWeChatQrCodeInHTML?: boolean
}

/**
 * 全局配置接口
 */
export interface OptionConfig {
  /** 屏蔽消息（为字符串时屏蔽简历） */
  blockMsg?: string | boolean
  /** 页面标题 */
  docName: string
  /** SEO 描述 */
  description?: string
  /** 打印文件名 */
  printName?: string
  /** GitHub 角标链接 */
  githubLogoLocation?: string
  /** 是否显示作者信息 */
  showAboutInfo?: boolean
}

/**
 * 角标配置接口
 */
export interface CornerConfig {
  /** 左侧内容 */
  left: string
  /** 右侧内容 */
  right: string
  /** 是否自动设置右侧为当前 URL */
  setDefaultRightUrl?: boolean
}

/**
 * Gitalk 配置接口
 */
export interface GitalkConfig {
  /** 元素 ID */
  id: string
  /** GitHub 用户名 */
  owner: string
  /** GitHub 仓库名 */
  repo: string
  /** GitHub OAuth Client ID */
  clientID: string
  /** GitHub OAuth Client Secret */
  clientSecret: string
  /** 管理员数组 */
  admin: string[]
  /** 分隔符 */
  distractionFreeMode?: boolean
}

/**
 * 全量配置接口
 */
export interface ResumeConfig {
  option: OptionConfig
  header: HeaderConfig
  sections: SectionItem[]
  title: CornerConfig
  footer: CornerConfig
  gitalk?: GitalkConfig | false
}
