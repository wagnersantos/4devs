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
  const status = error ? 'invalid' : 'valid'

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={styles.inputWrap}
      data-status={status}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={props.name}
        onChange={handleChange}
      />
      <label
        data-testid={`${props.name}-label`}
        title={error}
        onClick={() => { inputRef.current.focus() }}>
        {props.placeholder}
      </label>
    </div>
  )
}

export default input
