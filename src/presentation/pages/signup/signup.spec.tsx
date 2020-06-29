import React from 'react'
import faker from 'faker'
import { render, RenderResult, cleanup } from '@testing-library/react'

import { SignUp } from '@/presentation/pages'
import { Helper, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
};

type SutParams = {
  validationError: string
};

const sutFactory = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const sut = render(<SignUp validation={validationStub} />)

  return {
    sut
  }
}

describe('Signup', () => {
  afterEach(cleanup)

  it('should  start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = sutFactory({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  it('should show name error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = sutFactory({ validationError })

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  it('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = sutFactory({ validationError })

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  it('should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = sutFactory({ validationError })

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = sutFactory({ validationError })

    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
