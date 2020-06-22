import React, { useState, useEffect } from 'react'

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'

import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

import styles from './login-styles.scss'
import { Link } from 'react-router-dom'

type Props = {
  validation: Validation
  authentication
};
const login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  const isButtonDisabled = !!state.emailError || !!state.passwordError

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      const { email, password, isLoading, emailError, passwordError } = state

      if (isLoading || emailError || passwordError) return

      setState({ ...state, isLoading: true })

      const account = await authentication.auth({ email, password })
      localStorage.setItem('accessToken', account.accessToken)
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  return (
    <div className={styles.login}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button
            data-testid="submit"
            disabled={isButtonDisabled}
            className={styles.submit}
            type="submit"
          >
            Entrar
          </button>

          <Link data-testid="signup" to="signup" className={styles.link}>
            Criar conta
          </Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default login
