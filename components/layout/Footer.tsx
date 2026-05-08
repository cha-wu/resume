'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CornerConfig } from '@/config/types'
import styles from './Footer.module.scss'

interface FooterProps {
  config: CornerConfig
}

/**
 * 底部角标组件
 */
export const Footer = ({ config }: FooterProps) => {
  const { left, right, setDefaultRightUrl } = config
  const [currentUrl, setCurrentUrl] = useState('')

  // 自动生成当前页面 URL
  useEffect(() => {
    if (setDefaultRightUrl && !right) {
      if (typeof window !== 'undefined') {
        const url = window.location.href
        const hostname = window.location.hostname
        const pathname = window.location.pathname
        const displayUrl = hostname + (pathname === '/' ? '' : pathname)
        setCurrentUrl(`[网页版简历：${displayUrl}](${url})`)
      }
    }
  }, [setDefaultRightUrl, right])

  const displayRight = right || currentUrl

  return (
    <div id="padi" className={styles.footer}>
      {left && (
        <span className={styles['pi-left']}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{left}</ReactMarkdown>
        </span>
      )}
      {displayRight && (
        <span className={styles['pi-right']}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {displayRight}
          </ReactMarkdown>
        </span>
      )}
    </div>
  )
}
