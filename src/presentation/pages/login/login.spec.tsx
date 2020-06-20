import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react'

import { Validation } from '@/presentation/protocols/validation'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
};

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const sutFactory = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)

  return {
    sut,
    validationSpy
  }
}

describe('Login', () => {
  afterEach(cleanup)

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

  it('should call validation with correct email', () => {
    const { sut, validationSpy } = sutFactory()
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })

    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
  })

  it('should call validation with correct password', () => {
    const { sut, validationSpy } = sutFactory()
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: 'any_password' } })

    expect(validationSpy.input).toEqual({
      password: 'any_password'
    })
  })
})
