'use client'

// ==================== 简历预览组件 ====================

import { ResumeData } from '@/lib/defaultResumeData'
import { Header } from '@/components/layout/Header'
import { Section } from '@/components/content/Section'
import styles from './ResumePreview.module.scss'

interface ResumePreviewProps {
  data: ResumeData
}

export const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { header, sections, option } = data

  return (
    <div className={styles.resumePreview}>
      <div className={styles.resumeContainer}>
        <Header config={header} />
        <Section sections={sections} />
      </div>
    </div>
  )
}
