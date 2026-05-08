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
    if (contact.type === ContactType.BLOG) return `http://${contact.address}`
    if (contact.type === ContactType.GITHUB) return `https://github.com/${contact.address}`
    if (contact.type === ContactType.TELL) return `tel:${contact.address}`
    return '##'
  }

  const isExternal = contact.type === ContactType.BLOG || contact.type === ContactType.GITHUB
  // 如果设置了 noLink，只展示文本不渲染链接         
  if (contact.noLink) {
    return (
      <div className={styles['tbr-item']}>
        <span
          dangerouslySetInnerHTML={{ __html: contact.showAddr || contact.address }}
        />
        <span className={`iconfont icon-${contact.type || 'link'}`} />
      </div>
    )
  }
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
  const normalizedContacts = contacts.map((contact) => {
    if (contact.showAddr) {
      return contact
    }

    if (contact.type === ContactType.TELL) {
      return {
        ...contact,
        showAddr: `${contact.address.slice(0, 3)} ${contact.address.slice(3, -4)}<span class="print-hide">****</span><span class="print-show">${contact.address.slice(-4)}</span>`,
      }
    }

    if (contact.type === ContactType.MAIL) {
      const [namePart = '', domainPart = ''] = contact.address.split('@')
      return {
        ...contact,
        showAddr: `${namePart}<span class="print-hide">#</span><span class="print-show">@</span>${domainPart}`,
      }
    }

    return {
      ...contact,
      showAddr: contact.address,
    }
  })

  return (
    <header className={styles.header}>
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

      <div className={styles['tit-top']}>
        <h1 className={styles.name}>{name}</h1>

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

      <div className={styles['tit-bottom']}>
        <div className={styles['tb-left']}>
          {profiles.map((profile, index) => (
            <h3 key={index} className={styles['tbl-item']}>
              {profile}
            </h3>
          ))}
        </div>

        <div className={styles['tb-right']}>
          {normalizedContacts.map((contact, index) => (
            <ContactLink key={index} contact={contact} />
          ))}
        </div>
      </div>

      {github && (
        <a
          className={`iconfont ${styles['tbr-item-mobile']} icon-github`}
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
        />
      )}

      {normalizedContacts.map((contact, index) => (
        <a
          key={index}
          className={`iconfont ${styles['tbr-item-mobile']} icon-${contact.type || 'link'}`}
          href={
            contact.type === ContactType.MAIL
              ? `mailto:${contact.address}`
              : contact.type === ContactType.TELL
              ? `tel:${contact.address}`
              : contact.type === ContactType.BLOG
              ? `http://${contact.address}`
              : contact.type === ContactType.GITHUB
              ? `https://github.com/${contact.address}`
              : contact.address
          }
          target={
            contact.type === ContactType.BLOG || contact.type === ContactType.GITHUB
              ? '_blank'
              : undefined
          }
          rel={
            contact.type === ContactType.BLOG || contact.type === ContactType.GITHUB
              ? 'noopener noreferrer'
              : undefined
          }
        />
      ))}
    </header>
  )
}
