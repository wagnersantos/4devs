import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react'

import { ValidationSpy } from '@/presentation/test'
import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
};

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

    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe('any_email')
  })

  it('should call validation with correct password', () => {
    const { sut, validationSpy } = sutFactory()
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: 'any_password' } })

    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe('any_password')
  })
})
