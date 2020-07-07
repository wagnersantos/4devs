import React from 'react'

import { Spinner } from '@/presentation/components'

import styles from './loading-styles.scss'

const loading: React.FC = () => {
  return (
    <div className={styles.loadingWrap}>
      <div className={styles.loading}>
        <span>Aguarde...</span>
        <Spinner isNegative />
      </div>
    </div>
  )
}

export default loading
