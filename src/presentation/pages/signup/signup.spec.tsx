import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import { SignUp } from '@/presentation/pages'
import { Helper } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
};

const sutFactory = (): SutTypes => {
  const sut = render(<SignUp />)

  return {
    sut
  }
}

describe('Signup', () => {
  it('should  start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = sutFactory()

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
