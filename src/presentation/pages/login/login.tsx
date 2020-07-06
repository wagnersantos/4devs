import React, { useState, useEffect, useContext } from 'react'

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'
import { Link, useHistory } from 'react-router-dom'

import { FormContext, ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

import styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
};

const login: React.FC<Props> = ({
  validation,
  authentication
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
  const { setCurrentAccount } = useContext(ApiContext)
  const { email, password, isLoading, isFormInvalid } = state

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      if (isLoading || isFormInvalid) return

      setState({ ...state, isLoading: true })

      const account = await authentication.auth({ email, password })

      setCurrentAccount(account)

      history.replace('/')
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  return (
    <div className={styles.loginWrap}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
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
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default login
