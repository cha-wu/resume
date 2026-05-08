'use client'

import Link from 'next/link'
import styles from './About.module.scss'

interface AboutProps {
  author?: string
  authorUrl?: string
}

/**
 * 作者信息组件
 */
export const About = ({
  author = 'lin0102',
  authorUrl = 'https://github.com/lin0102',
}: AboutProps) => {
  return (
    <Link
      id="about"
      className={styles.about}
      href={authorUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>@ {author}</span>
    </Link>
  )
}
