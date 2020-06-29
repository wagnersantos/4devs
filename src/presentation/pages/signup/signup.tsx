import React from 'react'

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import { Link } from 'react-router-dom'

import Context from '@/presentation/contexts/form/form-context'
import styles from './signup-styles.scss'

const signup: React.FC = () => {
  return (
    <div className={styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state: {} }}>
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

          <button className={styles.submit} type="submit">
            Criar
          </button>

          <Link to="/login" className={styles.link}>
            Voltar para Login
          </Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default signup
