'use client'

import { useState, useEffect, useCallback } from 'react'
import { OptionConfig } from '@/config/types'
import styles from './PrintButton.module.scss'

interface PrintButtonProps {
  config: Pick<OptionConfig, 'printName' | 'docName'>
}

/**
 * 打印按钮组件
 * 功能：一键导出 PDF，带高度检测
 */
export const PrintButton = ({ config }: PrintButtonProps) => {
  const { printName, docName } = config
  const [isPrintInOnePage, setIsPrintInOnePage] = useState(true)

  // 检测内容高度是否超过单页可打印高度
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const contentElement = document.querySelector('#content')
        if (contentElement) {
          const height = parseInt(
            window.getComputedStyle(contentElement).height,
            10
          )
          setIsPrintInOnePage(height <= 1430)
        }
      } catch (err) {
        console.error('高度检测失败:', err)
        setIsPrintInOnePage(true)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // 打印前处理
  const handleBeforePrint = useCallback(() => {
    const printFileName = printName || docName.replace(/\s*\|\s*/g, '-')
    document.title = printFileName
  }, [printName, docName])

  // 打印后处理
  const handleAfterPrint = useCallback(() => {
    document.title = docName
  }, [docName])

  // 监听打印事件
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeprint', handleBeforePrint)
      window.addEventListener('afterprint', handleAfterPrint)

      return () => {
        window.removeEventListener('beforeprint', handleBeforePrint)
        window.removeEventListener('afterprint', handleAfterPrint)
      }
    }
  }, [handleBeforePrint, handleAfterPrint])

  // 打印处理
  const handlePrint = useCallback(() => {
    if (!isPrintInOnePage) {
      return
    }
    handleBeforePrint()
    window.print()
  }, [isPrintInOnePage, handleBeforePrint])

  return (
    <a
      id="print"
      className={`${styles.print} ${!isPrintInOnePage ? styles.disabled : ''}`}
      onClick={handlePrint}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handlePrint()
        }
      }}
    >
      {isPrintInOnePage ? (
        <>
          <div id="tips" className={styles.tips}>
            <span>请使用 Chrome</span>
            <br />
            <span>并设置为无边距</span>
          </div>
          <span className="iconfont icon-pdf" />
          <span>转为PDF</span>
        </>
      ) : (
        <>
          <div id="tips" className={`${styles.tips} ${styles.disabled}`}>
            <span>当前内容高度大于可打印高度</span>
            <br />
            <span>请删除部分内容</span>
          </div>
          <span className="iconfont icon-pdf" />
          <span>转为PDF</span>
        </>
      )}
    </a>
  )
}
