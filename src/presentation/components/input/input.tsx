import React from 'react'

import styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>;

const input: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.inputWrap}>
      <input {...props} />
      <span className={styles.status}>🔴</span>
    </div>
  )
}

export default input
