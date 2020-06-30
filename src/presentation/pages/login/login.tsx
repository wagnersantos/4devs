import React, { useState, useEffect } from 'react'

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'
import { Link, useHistory } from 'react-router-dom'

import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication, SaveAccessToken } from '@/domain/usecases'

import styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
};

const login: React.FC<Props> = ({
  validation,
  authentication,
  saveAccessToken
}: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  const history = useHistory()
  const { email, password, isLoading, isFormInvalid } = state

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (isLoading || isFormInvalid) return

      setState({ ...state, isLoading: true })

      const account = await authentication.auth({ email, password })

      await saveAccessToken.save(account.accessToken)

      history.replace('/')
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  useEffect(() => {
    const emailError = validation.validate('email', state.email)
    const passwordError = validation.validate('password', state.password)
    const isFormInvalid = !!emailError || !!passwordError

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid
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

          <SubmitButton text="Entrar" />

          <Link data-testid="signup-link" to="signup" className={styles.link}>
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
