import React, { memo } from 'react'

import Logo from '@/presentation/components/logo/logo'
import styles from './login-header-styles.scss'

const loginHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>Enquetes para programadores</h1>
    </header>
  )
}

export default memo(loginHeader)
