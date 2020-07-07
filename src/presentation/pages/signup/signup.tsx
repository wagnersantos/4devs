import React, { useState, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { AddAccount } from '@/domain/usecases'
import styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount

};

const signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
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
  const { setCurrentAccount } = useContext(ApiContext)

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

      setState(old => ({ ...old, isLoading: true }))

      const account = await addAccount.add({ name, email, password, passwordConfirmation })

      setCurrentAccount(account)

      history.replace('/')
    } catch (error) {
      setState(old => ({ ...old, isLoading: false, mainError: error.message }))
    }
  }

  useEffect(() => { validate('name') }, [state.name])
  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])
  useEffect(() => { validate('passwordConfirmation') }, [state.passwordConfirmation])

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmationError }))
  }

  return (
    <div className={styles.signupWrap}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
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
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default signup
