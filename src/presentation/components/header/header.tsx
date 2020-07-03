import React, { memo } from 'react'

import { Logo } from '@/presentation/components'

import styles from './header-styles.scss'

const Header: React.FC = () => {
  return (
    <header className={styles.stylesheaderWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrap}>
          <span>Wagner</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
