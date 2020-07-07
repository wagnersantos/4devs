import React from 'react'
import styles from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
};

const spinner: React.FC<Props> = (props: Props) => {
  const negativeClass = props.isNegative ? styles.negative : ''
  return (
    <div
      {...props}
      data-testid="spinner"
      className={[styles.spinner, props.className, negativeClass].join(' ')}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default spinner
