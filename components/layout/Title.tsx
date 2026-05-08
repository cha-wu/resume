'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CornerConfig } from '@/config/types'
import styles from './Title.module.scss'

interface TitleProps {
  config: CornerConfig
}

/**
 * 顶部角标组件
 */
export const Title = ({ config }: TitleProps) => {
  const { left, right, setDefaultRightUrl } = config
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    if (setDefaultRightUrl && !right) {
      if (typeof window !== 'undefined') {
        setCurrentUrl(window.location.href)
      }
    }
  }, [setDefaultRightUrl, right])

  const displayRight = right || currentUrl

  return (
    <div className={styles.title}>
      <span className={styles['pi-left']}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{left}</ReactMarkdown>
      </span>
      {displayRight && (
        <span className={styles['pi-right']}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayRight}</ReactMarkdown>
        </span>
      )}
    </div>
  )
}
