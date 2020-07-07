import React from 'react'

import styles from './error-styles.scss'

type Props = {
  error: string
  reload: () => void
}

const Error: React.FC<Props> = ({ error, reload }: Props) => (
  <div className={styles.errorWrap} data-testid="error">
    <span>{error}</span>
    <button data-testid="reload" onClick={reload}>Tentar novamente</button>
  </div>
)

export default Error
