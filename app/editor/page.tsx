'use client'

// ==================== 编辑器页面（表单模式） ====================

import { useState, useCallback } from 'react'
import { defaultResumeData } from '@/lib/defaultResumeData'
import type { ResumeData } from '@/lib/types'
import { ResumePreview } from '@/components/editor/ResumePreview'
import styles from './editor.module.scss'

type SectionKey = 'editor' | 'option'

export default function EditorPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData)
  const [activeTab, setActiveTab] = useState<SectionKey>('editor')
  const [expandedSection, setExpandedSection] = useState<number>(0)

  // 更新基础信息
  const updateHeader = useCallback((field: keyof ResumeData['header'], value: any) => {
    setResumeData(prev => ({
      ...prev,
      header: { ...prev.header, [field]: value },
    }))
  }, [])

  // 更新简介
  const updateProfile = useCallback((index: number, value: string) => {
    setResumeData(prev => {
      const profiles = [...prev.header.profiles]
      profiles[index] = value
      return { ...prev, header: { ...prev.header, profiles } }
    })
  }, [])

  // 添加简介
  const addProfile = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      header: { ...prev.header, profiles: [...prev.header.profiles, ''] },
    }))
  }, [])

  // 删除简介
  const removeProfile = useCallback((index: number) => {
    setResumeData(prev => {
      const profiles = prev.header.profiles.filter((_, i) => i !== index)
      return { ...prev, header: { ...prev.header, profiles } }
    })
  }, [])

  // 更新联系方式
  const updateContact = useCallback((index: number, field: keyof ResumeData['header']['contacts'][0], value: any) => {
    setResumeData(prev => {
      const contacts = [...prev.header.contacts]
      contacts[index] = { ...contacts[index], [field]: value }
      return { ...prev, header: { ...prev.header, contacts } }
    })
  }, [])

  // 添加联系方式
  const addContact = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      header: { ...prev.header, contacts: [...prev.header.contacts, { address: '', type: 'mail' as const }] },
    }))
  }, [])

  // 删除联系方式
  const removeContact = useCallback((index: number) => {
    setResumeData(prev => {
      const contacts = prev.header.contacts.filter((_, i) => i !== index)
      return { ...prev, header: { ...prev.header, contacts } }
    })
  }, [])

  // 更新区块
  const updateSection = useCallback((index: number, field: keyof ResumeData['sections'][0], value: any) => {
    setResumeData(prev => {
      const sections = [...prev.sections]
      sections[index] = { ...sections[index], [field]: value }
      return { ...prev, sections }
    })
  }, [])

  // 添加区块
  const addSection = useCallback(() => {
    setResumeData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '新板块', content: [] }],
    }))
  }, [])

  // 删除区块
  const removeSection = useCallback((index: number) => {
    setResumeData(prev => {
      const sections = prev.sections.filter((_, i) => i !== index)
      return { ...prev, sections }
    })
    setExpandedSection(0)
  }, [])

  // 更新内容段落
  const updateParagraph = useCallback((sectionIndex: number, paragraphIndex: number, field: keyof ResumeData['sections'][0]['content'][0], value: any) => {
    setResumeData(prev => {
      const sections = [...prev.sections]
      const content = [...sections[sectionIndex].content]
      content[paragraphIndex] = { ...content[paragraphIndex], [field]: value }
      sections[sectionIndex] = { ...sections[sectionIndex], content }
      return { ...prev, sections }
    })
  }, [])

  // 添加内容段落
  const addParagraph = useCallback((sectionIndex: number) => {
    setResumeData(prev => {
      const sections = [...prev.sections]
      const content = [...sections[sectionIndex].content, { left: '', right: '', bold: false, showDot: false }]
      sections[sectionIndex] = { ...sections[sectionIndex], content }
      return { ...prev, sections }
    })
  }, [])

  // 删除内容段落
  const removeParagraph = useCallback((sectionIndex: number, paragraphIndex: number) => {
    setResumeData(prev => {
      const sections = [...prev.sections]
      const content = sections[sectionIndex].content.filter((_, i) => i !== paragraphIndex)
      sections[sectionIndex] = { ...sections[sectionIndex], content }
      return { ...prev, sections }
    })
  }, [])

  // 更新设置
  const updateOption = useCallback((field: keyof ResumeData['option'], value: any) => {
    setResumeData(prev => ({
      ...prev,
      option: { ...prev.option, [field]: value },
    }))
  }, [])

  // 重置数据
  const handleReset = useCallback(() => {
    if (confirm('确定要重置所有内容吗？这将恢复为默认简历数据。')) {
      setResumeData(defaultResumeData)
      setActiveTab('editor')
      setExpandedSection(0)
    }
  }, [])

  return (
    <div className={styles.editorContainer + ' print-editor-mode'}>
      {/* 顶部工具栏 */}
      <div className={styles.toolbar + ' print-hide'}>
        <h1 className={styles.title}>简历编辑器</h1>
        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={handleReset}>
            重置
          </button>
          <button className={styles.btnPrimary} onClick={() => window.print()}>
            导出PDF
          </button>
        </div>
      </div>

      {/* 主内容区 */}
      <div className={styles.mainContent}>
        {/* 左侧编辑区 */}
        <div className={styles.editorPane + ' print-hide'}>
          {/* 标签切换 */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'editor' ? styles.active : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              简历编辑
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'option' ? styles.active : ''}`}
              onClick={() => setActiveTab('option')}
            >
              设置
            </button>
          </div>

          {/* 表单内容 */}
          <div className={styles.formContent}>
            {activeTab === 'editor' && (
              <>
                {/* 基本信息 */}
                <div className={styles.formSection}>
                  <h3 className={styles.sectionTitle}>基本信息</h3>
                  <div className={styles.formGroup}>
                    <label>姓名</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={resumeData.header.name}
                      onChange={(e) => updateHeader('name', e.target.value)}
                      placeholder="请输入姓名"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>意向职位</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={resumeData.header.job}
                      onChange={(e) => updateHeader('job', e.target.value)}
                      placeholder="如：前端工程师"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>GitHub 用户名（可选）</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={resumeData.header.github || ''}
                      onChange={(e) => updateHeader('github', e.target.value)}
                      placeholder="如：zhangsan"
                    />
                  </div>
                </div>

                {/* 个人简介 */}
                <div className={styles.formSection}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>个人简介</h3>
                    <button className={styles.btnAdd} onClick={addProfile}>+ 添加</button>
                  </div>
                  {resumeData.header.profiles.map((profile, index) => (
                    <div key={index} className={styles.formItem}>
                      <input
                        type="text"
                        className={styles.input}
                        value={profile}
                        onChange={(e) => updateProfile(index, e.target.value)}
                        placeholder="简介内容"
                      />
                      {resumeData.header.profiles.length > 1 && (
                        <button
                          className={styles.deleteIcon}
                          onClick={() => removeProfile(index)}
                          aria-label="删除"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* 联系方式 */}
                <div className={styles.formSection}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>联系方式</h3>
                    <button className={styles.btnAdd} onClick={addContact}>+ 添加</button>
                  </div>
                  {resumeData.header.contacts.map((contact, index) => (
                    <div key={index} className={styles.contactItem}>
                      {resumeData.header.contacts.length > 1 && (
                        <button
                          className={styles.deleteIconTop}
                          onClick={() => removeContact(index)}
                          aria-label="删除"
                        >
                          ✕
                        </button>
                      )}
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label>类型</label>
                          <select
                            className={styles.select}
                            value={contact.type}
                            onChange={(e) => updateContact(index, 'type', e.target.value)}
                          >
                            <option value="mail">邮箱</option>
                            <option value="github">GitHub</option>
                            <option value="qq">QQ</option>
                            <option value="wechat">微信</option>
                            <option value="tell">电话</option>
                            <option value="blog">博客</option>
                          </select>
                        </div>
                        <div className={styles.formGroup}>
                          <label>内容</label>
                          <input
                            type="text"
                            className={styles.input}
                            value={contact.address}
                            onChange={(e) => updateContact(index, 'address', e.target.value)}
                            placeholder="根据类型填写对应内容"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 简历板块 */}
                <div className={styles.sectionsList}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>简历板块</h3>
                    <button className={styles.btnAdd} onClick={addSection}>+ 新增板块</button>
                  </div>
                  {resumeData.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className={styles.sectionCard}>
                    <div
                      className={styles.sectionCardHeader}
                      onClick={() => setExpandedSection(expandedSection === sectionIndex ? -1 : sectionIndex)}
                    >
                      <span className={styles.sectionCardTitle}>
                        {section.title || '未命名板块'}
                      </span>
                      <button
                        className={styles.deleteIconInline}
                        onClick={(e) => { e.stopPropagation(); removeSection(sectionIndex); }}
                        aria-label="删除"
                      >
                        ✕
                      </button>
                    </div>

                    {expandedSection === sectionIndex && (
                      <div className={styles.sectionCardContent}>
                        <div className={styles.formGroup}>
                          <label>板块标题</label>
                          <input
                            type="text"
                            className={styles.input}
                            value={section.title}
                            onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                            placeholder="如：教育经历、技能特长、项目经验"
                          />
                        </div>

                        <div className={styles.sectionHeader}>
                          <h4 className={styles.subTitle}>内容列表</h4>
                          <button
                            className={styles.btnAddSmall}
                            onClick={() => addParagraph(sectionIndex)}
                          >
                            + 添加内容
                          </button>
                        </div>

                        {section.content.map((paragraph, paragraphIndex) => (
                          <div key={paragraphIndex} className={styles.paragraphItem}>
                            {section.content.length > 1 && (
                              <button
                                className={styles.deleteIconTop}
                                onClick={() => removeParagraph(sectionIndex, paragraphIndex)}
                                aria-label="删除"
                              >
                                ✕
                              </button>
                            )}
                            <div className={styles.formGroup}>
                              <label>左侧内容（时间/标签）</label>
                              <input
                                type="text"
                                className={styles.input}
                                value={paragraph.left || ''}
                                onChange={(e) => updateParagraph(sectionIndex, paragraphIndex, 'left', e.target.value)}
                                placeholder="如：2020 - 2024"
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label>右侧内容（详情描述，支持 Markdown）</label>
                              <input
                                type="text"
                                className={styles.input}
                                value={paragraph.right || ''}
                                onChange={(e) => updateParagraph(sectionIndex, paragraphIndex, 'right', e.target.value)}
                                placeholder="如：**某某大学** | 计算机科学与技术"
                              />
                            </div>
                            <div className={styles.checkboxGroup}>
                              <label className={styles.checkboxLabel}>
                                <input
                                  type="checkbox"
                                  checked={paragraph.bold || false}
                                  onChange={(e) => updateParagraph(sectionIndex, paragraphIndex, 'bold', e.target.checked)}
                                />
                                加粗显示
                              </label>
                              <label className={styles.checkboxLabel}>
                                <input
                                  type="checkbox"
                                  checked={paragraph.showDot || false}
                                  onChange={(e) => updateParagraph(sectionIndex, paragraphIndex, 'showDot', e.target.checked)}
                                />
                                显示圆点
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                </div>
              </>
            )}

            {activeTab === 'option' && (
              <div className={styles.formSection}>
                <h3 className={styles.sectionTitle}>导出设置</h3>
                <div className={styles.formGroup}>
                  <label>文档名称</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={resumeData.option.docName}
                    onChange={(e) => updateOption('docName', e.target.value)}
                    placeholder="如：个人简历"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>导出文件名</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={resumeData.option.printName || ''}
                    onChange={(e) => updateOption('printName', e.target.value)}
                    placeholder="如：张三-前端工程师-简历"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>描述（SEO用）</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={resumeData.option.description || ''}
                    onChange={(e) => updateOption('description', e.target.value)}
                    placeholder="简历描述"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 右侧预览区 */}
        <div className={styles.previewPane + ' print-show'}>
          <div className={styles.paneHeader + ' print-hide'}>
            <span className={styles.paneTitle}>实时预览</span>
          </div>
          <div className={styles.previewWrapper}>
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  )
}
