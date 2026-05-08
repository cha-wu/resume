'use client'

import { useEffect, useRef } from 'react'
import { GitalkConfig } from '@/config/types'
import styles from './Discuss.module.scss'

interface DiscussProps {
  config: GitalkConfig
}

/**
 * 评论组件
 */
export const Discuss = ({ config }: DiscussProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return

    const loadGitalk = async () => {
      try {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css'
        document.head.appendChild(link)

        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js'
        script.async = true
        script.onload = () => {
          if (typeof window !== 'undefined' && (window as any).Gitalk) {
            const Gitalk = (window as any).Gitalk
            const gitalk = new Gitalk({
              ...config,
              id: config.id || 'resume-comments',
              createIssueManually: false,
              distractionFreeMode: config.distractionFreeMode || false,
              labels: ['comment'],
            })

            if (containerRef.current) {
              gitalk.render('gitalk-container')
              isInitialized.current = true
            }
          }
        }
        document.body.appendChild(script)
      } catch (error) {
        console.error('Gitalk 加载失败:', error)
      }
    }

    loadGitalk()
  }, [config])

  return (
    <div
      ref={containerRef}
      id="gitalk-container"
      className={styles['gitalk-container']}
    />
  )
}
