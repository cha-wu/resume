'use client'

import styles from './GithubCorner.module.scss'

interface GithubCornerProps {
  href: string
}

/**
 * GitHub "Fork me" 角标组件
 */
export const GithubCorner = ({ href }: GithubCornerProps) => {
  return (
    <a
      id="github"
      className={styles.github}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>fork me on Github</span>
      <img src="/github.svg" alt="GitHub" width={50} height={50} />
    </a>
  )
}
