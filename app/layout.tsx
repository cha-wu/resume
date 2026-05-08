// ==================== 根布局组件 ====================

import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import './globals.scss'

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
