'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SectionItem } from '@/config/types'
import styles from './Section.module.scss'

interface SectionProps {
  sections: SectionItem[]
}

/**
 * 内容段落组件
 */
const SectionParagraph = ({ paragraph }: { paragraph: SectionItem['content'][0] }) => {
  const { left, right, bold, showDot } = paragraph

  const classNames = [
    styles['si-p'],
    bold ? styles['need-bold'] : '',
    showDot ? styles['have-dot'] : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classNames}>
      {/* 右侧内容（时间/链接） */}
      {right && (
        <span className={styles['sip-right']}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {right}
          </ReactMarkdown>
        </span>
      )}

      {/* 左侧内容（正文） */}
      {left && (
        <span className={styles['sip-left']}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {left}
          </ReactMarkdown>
        </span>
      )}
    </div>
  )
}

/**
 * 内容区块组件
 */
export const Section = ({ sections }: SectionProps) => {
  return (
    <section id="main-in" className={styles['main-in']}>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={styles['s-item']}>
          <h3>{section.title}</h3>

          {section.content.map((paragraph, paragraphIndex) => (
            <SectionParagraph
              key={paragraphIndex}
              paragraph={paragraph}
            />
          ))}
        </div>
      ))}
    </section>
  )
}
