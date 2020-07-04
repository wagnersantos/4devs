import React, { memo, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Logo } from '@/presentation/components'

import { ApiContext } from '@/presentation/contexts'

import styles from './header-styles.scss'

const Header: React.FC = () => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrap}>
          <span>Wagner</span>
          <a data-testid="logout" href="#" onClick={logout}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
