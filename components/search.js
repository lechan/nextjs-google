import React from 'react'
import styles from '../styles/Search.module.css'

export default function search() {
  return (
    <div className={styles.inputWrapper}>
      <input
        id="input"
        type="search"
        autoComplete="off"
        spellCheck="false"
        role="combobox"
        placeholder="在 Google 上搜索，或者输入一个网址"
        aria-live="polite"
      />
      <button id="voiceSearchButton" title="语音搜索" />
    </div>

  )
}
