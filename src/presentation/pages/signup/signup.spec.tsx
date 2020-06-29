import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import { SignUp } from '@/presentation/pages'

type SutTypes = {
  sut: RenderResult
};

const sutFactory = (): SutTypes => {
  const sut = render(<SignUp />)

  return {
    sut
  }
}

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDIsabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDIsabled)
}

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)

  const status = validationError || 'tudo certo'
  const contentStatus = validationError ? '🔴' : '🉑'

  expect(fieldStatus.title).toBe(status)
  expect(fieldStatus.textContent).toBe(contentStatus)
}

describe('Signup', () => {
  it('should  start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = sutFactory()

    testChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
