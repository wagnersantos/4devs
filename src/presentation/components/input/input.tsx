import React, { useContext, useRef } from 'react'

import Context from '@/presentation/contexts/form/form-context'

import styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>;

const input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]
  const status = error ? '🔴' : '🉑'
  const title = error || 'tudo certo'

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={styles.inputWrap}>
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        onChange={handleChange}
      />
      <label onClick={() => { inputRef.current.focus() }}>
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={title}
        className={styles.status}
      >
        {status}
      </span>
    </div>
  )
}

export default input
