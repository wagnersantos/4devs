import React, { memo } from 'react'

import styles from './footer-styles.scss'

const footer: React.FC = () => {
  return <footer className={styles.footer}></footer>
}

export default memo(footer)
