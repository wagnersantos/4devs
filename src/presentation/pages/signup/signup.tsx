import React, { useState, useEffect } from 'react'

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import Context from '@/presentation/contexts/form/form-context'
import { AddAccount } from '@/domain/usecases'

import styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
};

const signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
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

  const isButtonDisabled =
    !!state.nameError ||
    !!state.emailError ||
    !!state.passwordError ||
    !!state.passwordConfirmationError

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      const {
        name,
        email,
        password,
        passwordConfirmation,
        isLoading,
        nameError,
        emailError,
        passwordError,
        passwordConfirmationError
      } = state

      if (isLoading ||
        nameError ||
        emailError ||
        passwordError ||
        passwordConfirmationError ||
        emailError ||
        passwordError ||
        passwordConfirmationError) return

      setState({ ...state, isLoading: true })

      await addAccount.add({ name, email, password, passwordConfirmation })
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      )
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

          <button
            disabled={isButtonDisabled}
            data-testid="submit"
            className={styles.submit}
            type="submit"
          >
            Criar
          </button>

          <span className={styles.link}>Voltar para Login</span>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default signup
