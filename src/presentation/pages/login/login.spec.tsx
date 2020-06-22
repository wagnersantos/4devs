import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup
} from '@testing-library/react'
import faker from 'faker'

import { ValidationStub } from '@/presentation/test'
import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
};

const sutFactory = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()

  const sut = render(<Login validation={validationStub} />)

  return {
    sut,
    validationStub
  }
}

describe('Login', () => {
  afterEach(cleanup)

  it('should  start with initial state', () => {
    const { sut, validationStub } = sutFactory()

    const errorWrap = sut.getByTestId('error-wrap')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show email error if validation fails', () => {
    const { sut, validationStub } = sutFactory()
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if validation fails', () => {
    const { sut, validationStub } = sutFactory()
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show valid email state if validation succeds', () => {
    const { sut, validationStub } = sutFactory()
    validationStub.errorMessage = null

    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe('tudo certo')
    expect(emailStatus.textContent).toBe('🉑')
  })

  it('should show valid password state if validation succeds', () => {
    const { sut, validationStub } = sutFactory()
    validationStub.errorMessage = null

    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe('tudo certo')
    expect(passwordStatus.textContent).toBe('🉑')
  })

  it('should enable submit buttton if form is valid', () => {
    const { sut, validationStub } = sutFactory()
    validationStub.errorMessage = null

    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })

    expect(submitButton.disabled).toBe(false)
  })
})
