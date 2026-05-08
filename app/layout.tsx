// ==================== 根布局组件 ====================

import type { ReactNode } from 'react'
import './globals.scss'

interface RootLayoutProps {
  children: ReactNode
}

export const metadata = {
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
