import React, { memo, useContext } from 'react'

import { Logo } from '@/presentation/components'

import { ApiContext } from '@/presentation/contexts'

import styles from './header-styles.scss'
import { useLogout } from '@/presentation/hooks'

const Header: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  const logout = useLogout()

  const handleClickLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={handleClickLogout}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
