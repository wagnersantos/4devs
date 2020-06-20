import React from 'react'

import { render, RenderResult } from '@testing-library/react'

import Login from './login'

type SutTypes = {
  sut: RenderResult
};

const sutFactory = (): SutTypes => {
  const sut = render(<Login />)

  return {
    sut
  }
}

describe('Login', () => {
  it('should  start with initial state', () => {
    const { sut } = sutFactory()

    const errorWrap = sut.getByTestId('error-wrap')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
