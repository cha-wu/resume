'use client'

import Image from 'next/image'
import { HeaderConfig, Contact, ContactType } from '@/config/types'
import styles from './Header.module.scss'

interface HeaderProps {
  config: HeaderConfig
}

/**
 * 联系方式链接组件
 */
const ContactLink = ({ contact }: { contact: Contact }) => {
  const getLinkHref = (contact: Contact) => {
    if (contact.type === ContactType.MAIL) return `mailto:${contact.address}`
    if (contact.type === ContactType.BLOG) return `https://${contact.address}`
    if (contact.type === ContactType.GITHUB) return `https://github.com/${contact.address}`
    if (contact.type === ContactType.TELL) return `tel:${contact.address}`
    return contact.address
  }

  const isExternal = contact.type === ContactType.BLOG || contact.type === ContactType.GITHUB

  return (
    <a
      className={styles['tbr-item']}
      href={getLinkHref(contact)}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <span
        dangerouslySetInnerHTML={{ __html: contact.showAddr || contact.address }}
      />
      <span className={`iconfont icon-${contact.type || 'link'}`} />
    </a>
  )
}

/**
 * 头部组件
 */
export const Header = ({ config }: HeaderProps) => {
  const { name, github, job, profiles, contacts, weChatQrCode, showWeChatQrCodeInHTML } = config

  return (
    <header className={styles.header}>
      {/* 微信二维码 */}
      {weChatQrCode && (
        <div
          className={`${styles.qrcode} ${!showWeChatQrCodeInHTML ? styles['print-show'] : ''}`}
        >
          <Image
            src="/wechat.png"
            alt="微信二维码"
            width={100}
            height={100}
          />
        </div>
      )}

      {/* 顶部信息 */}
      <div className={styles['tit-top']}>
        <h1 className={styles.name}>{name}</h1>

        {/* GitHub 链接 */}
        {github && (
          <a
            className={styles.nick}
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <small>
              <span className="iconfont icon-github">
                <span>{github}</span>
              </span>
            </small>
          </a>
        )}

        <h2 className={styles.job}>{job}</h2>
      </div>

      {/* 底部信息 */}
      <div className={styles['tit-bottom']}>
        <div className={styles['tb-left']}>
          {profiles.map((profile, index) => (
            <h3 key={index} className={styles['tbl-item']}>
              {profile}
            </h3>
          ))}
        </div>

        <div className={styles['tb-right']}>
          {contacts.map((contact, index) => (
            <ContactLink key={index} contact={contact} />
          ))}
        </div>
      </div>

      {/* 移动端 GitHub 图标 */}
      {github && (
        <a
          className={`iconfont ${styles['tbr-item-mobile']} icon-github`}
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
        />
      )}

      {/* 移动端联系方式图标 */}
      {contacts.map((contact, index) => (
        <a
          key={index}
          className={`iconfont ${styles['tbr-item-mobile']} icon-${contact.type || 'link'}`}
          href={
            contact.type === ContactType.MAIL
              ? `mailto:${contact.address}`
              : contact.type === ContactType.TELL
              ? `tel:${contact.address}`
              : contact.address
          }
        />
      ))}
    </header>
  )
}
