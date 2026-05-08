// ==================== 主页面组件 ====================

import { Metadata } from 'next'
import { resumeConfig } from '@/config'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Title } from '@/components/layout/Title'
import { Section } from '@/components/content/Section'
import { PrintButton } from '@/components/feature/PrintButton'
import { GithubCorner } from '@/components/layout/GithubCorner'
import { About } from '@/components/feature/About'
import { Discuss } from '@/components/feature/Discuss'

// 生成页面元数据
export async function generateMetadata(): Promise<Metadata> {
  const { option, header } = resumeConfig

  const description =
    option.description ||
    `${header.name}${header.github ? `（${header.github}）` : ''}的个人简历 - ${header.job}`

  return {
    title: option.docName,
    description: description,
    keywords: ['简历', 'resume', header.job, header.name],
    openGraph: {
      title: option.docName,
      description: description,
      type: 'website',
    },
  }
}

/**
 * 简历屏蔽组件
 */
const BlockedMessage = ({ message }: { message: string }) => {
  return (
    <div id="body-blocked">
      <p>该简历被设置为不可见</p>
      <p>{message}</p>
    </div>
  )
}

/**
 * 主页面组件
 */
export default function HomePage() {
  const { option, header, sections, title, footer, gitalk } = resumeConfig

  // 如果简历被屏蔽
  if (typeof option.blockMsg === 'string') {
    return <BlockedMessage message={option.blockMsg} />
  }

  return (
    <>
      <Title config={title} />

      {option.githubLogoLocation && (
        <GithubCorner href={option.githubLogoLocation} />
      )}

      <div id="body-container">
        <div id="content">
          <Header config={header} />
          <Section sections={sections} />
          <PrintButton config={option} />
          <Footer config={footer} />
        </div>
      </div>

      {gitalk && <Discuss config={gitalk} />}
      {option.showAboutInfo && <About />}
    </>
  )
}
