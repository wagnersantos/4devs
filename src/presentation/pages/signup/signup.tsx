import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import Context from '@/presentation/contexts/form/form-context'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken

};

const signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })
  const history = useHistory()
  const {
    name,
    email,
    password,
    passwordConfirmation,
    isLoading,
    isFormInvalid
  } = state

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      if (isLoading || isFormInvalid) return

      setState({ ...state, isLoading: true })

      const account = await addAccount.add({ name, email, password, passwordConfirmation })

      await saveAccessToken.save(account.accessToken)

      history.replace('/')
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  useEffect(() => {
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      formData
    )
    const isFormInvalid =
      !!nameError ||
      !!emailError ||
      !!passwordError ||
      !!passwordConfirmationError

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  return (
    <div className={styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />

          <SubmitButton text="Cadatrar" />

          <Link data-testid="login-link" replace to="/login" className={styles.link}>Voltar para Login</Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default signup
