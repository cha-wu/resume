// ==================== 编辑器类型定义 ====================

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
  address: string
  type?: ContactType
  showAddr?: string
  noLink?: boolean
}

/**
 * 内容段落接口
 */
export interface ContentParagraph {
  left?: string
  right?: string
  bold?: boolean
  showDot?: boolean
}

/**
 * 内容区块接口
 */
export interface SectionItem {
  title: string
  content: ContentParagraph[]
}

/**
 * 头部配置接口
 */
export interface HeaderConfig {
  name: string
  github?: string
  job: string
  profiles: string[]
  contacts: Contact[]
}

/**
 * 全局配置接口
 */
export interface OptionConfig {
  docName: string
  printName?: string
  description?: string
}

/**
 * 简历数据接口
 */
export interface ResumeData {
  header: HeaderConfig
  sections: SectionItem[]
  option: OptionConfig
}
