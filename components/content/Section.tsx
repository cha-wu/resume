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
const SectionParagraph = ({ paragraph, showTime = true }: { paragraph: SectionItem['content'][0]; showTime?: boolean }) => {
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
      {/* 时间标记 - 放在右侧（可选显示） */}
      {showTime && left && (
        <span className={styles['sip-time']}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {left}
          </ReactMarkdown>
        </span>
      )}

      {/* 内容详情 */}
      {right && (
        <span className={styles['sip-content']}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {right}
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
      {sections.map((section, sectionIndex) => {
        // 获取第一个段落的时间作为标题右侧时间
        const firstParagraphTime = section.content[0]?.left

        return (
          <div key={sectionIndex} className={styles['s-item']}>
            <h3>
              <span className={styles['section-title-text']}>{section.title}</span>
              {firstParagraphTime && (
                <span className={styles['section-title-time']}>
                  {firstParagraphTime}
                </span>
              )}
            </h3>

            {section.content.map((paragraph, paragraphIndex) => (
              <SectionParagraph
                key={paragraphIndex}
                paragraph={paragraph}
                showTime={paragraphIndex !== 0} // 第一个段落不显示时间（已显示在标题旁）
              />
            ))}
          </div>
        )
      })}
    </section>
  )
}
