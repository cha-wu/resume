'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
  const originalTitleRef = useRef(docName)

  const checkPrintHeight = useCallback(() => {
    try {
      const contentElement = document.querySelector('#content')
      const sectionElement = document.querySelector('#main-in')
      const footerElement = document.querySelector('#padi')

      if (contentElement && sectionElement) {
        const contentWidth = contentElement.getBoundingClientRect().width
        const previousWidth = contentElement instanceof HTMLElement ? contentElement.style.width : ''
        const previousMinWidth =
          contentElement instanceof HTMLElement ? contentElement.style.minWidth : ''

        if (contentElement instanceof HTMLElement && contentWidth !== 1024) {
          contentElement.style.width = '1024px'
          contentElement.style.minWidth = '1024px'
        }

        const sectionRect = sectionElement.getBoundingClientRect()
        const footerRect = footerElement?.getBoundingClientRect()
        const height = footerRect
          ? footerRect.bottom - sectionRect.top
          : sectionRect.bottom - sectionRect.top

        if (contentElement instanceof HTMLElement && contentWidth !== 1024) {
          contentElement.style.width = previousWidth
          contentElement.style.minWidth = previousMinWidth
        }

        setIsPrintInOnePage(height <= 1430)
      }
    } catch (err) {
      console.error('高度检测失败:', err)
      setIsPrintInOnePage(true)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      checkPrintHeight()
    }, 500)

    const handleResize = () => {
      checkPrintHeight()
    }

    window.addEventListener('resize', handleResize)

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        checkPrintHeight()
      })
    }

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [checkPrintHeight])

  useEffect(() => {
    originalTitleRef.current = docName
  }, [docName])

  const handleBeforePrint = useCallback(() => {
    originalTitleRef.current = document.title
    const printFileName = printName || docName.replace(/\s*\|\s*/g, '-')
    document.title = printFileName
  }, [printName, docName])

  const handleAfterPrint = useCallback(() => {
    document.title = originalTitleRef.current || docName
  }, [docName])

  useEffect(() => {
    window.addEventListener('beforeprint', handleBeforePrint)
    window.addEventListener('afterprint', handleAfterPrint)

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint)
      window.removeEventListener('afterprint', handleAfterPrint)
    }
  }, [handleBeforePrint, handleAfterPrint])

  const handlePrint = useCallback(() => {
    if (!isPrintInOnePage) {
      return
    }
    handleBeforePrint()
    window.focus()
    window.print()
    window.setTimeout(() => {
      handleAfterPrint()
    }, 300)
  }, [isPrintInOnePage, handleBeforePrint, handleAfterPrint])

  return (
    <button
      type="button"
      id="print"
      className={`${styles.print} ${!isPrintInOnePage ? styles.disabled : ''}`}
      onClick={handlePrint}
      disabled={!isPrintInOnePage}
    >
      {isPrintInOnePage ? (
        <>
          <div id="tips" className={styles.tips}>
            <span>点击导出 PDF</span>
            <br />
            <span>建议使用 Chrome 并设置无边距</span>
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
    </button>
  )
}
