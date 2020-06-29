import React from 'react'
import faker from 'faker'
import {
  render,
  RenderResult,
  cleanup,
  fireEvent
} from '@testing-library/react'

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

const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void => {
  const fieldInput = sut.getByTestId(fieldName)
  fireEvent.input(fieldInput, { target: { value } })
}

describe('Signup', () => {
  afterEach(cleanup)

  it('should  start with initial state', () => {
    const validationError = faker.random.words()
    const error = 'Campo obrigatório'
    const { sut } = sutFactory({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', error)
    Helper.testStatusForField(sut, 'password', error)
    Helper.testStatusForField(sut, 'passwordConfirmation', error)
  })

  it('should show name error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = sutFactory({ validationError })

    populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })
})
