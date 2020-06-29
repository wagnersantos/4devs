import React, { useState, useEffect } from 'react'

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import Context from '@/presentation/contexts/form/form-context'

import styles from './signup-styles.scss'

type Props = {
  validation: Validation
};

const signup: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    nameError: '',
    emailError: '',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email)
    })
  }, [state.name, state.email])

  return (
    <div className={styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form className={styles.form}>
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
            disabled
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
