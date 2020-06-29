import React from 'react'
import faker from 'faker'
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
  waitFor
} from '@testing-library/react'

import { SignUp } from '@/presentation/pages'
import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
};

type SutParams = {
  validationError: string
};

const sutFactory = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <SignUp validation={validationStub} addAccount={addAccountSpy} />
  )

  return {
    sut,
    addAccountSpy
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', password)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
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

  it('should show valid name state if validation succeds', () => {
    const { sut } = sutFactory()

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  it('should show valid email state if validation succeds', () => {
    const { sut } = sutFactory()

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  it('should show valid password state if validation succeds', () => {
    const { sut } = sutFactory()

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  it('should show valid passwordConfirmation state if validation succeds', () => {
    const { sut } = sutFactory()

    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  it('should enable submit buttton if form is valid', async () => {
    const { sut } = sutFactory()

    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')

    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  it('should show spinner on submit', async () => {
    const { sut } = sutFactory()

    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  it('should call addAccount with correct value', async () => {
    const { sut, addAccountSpy } = sutFactory()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(sut, name, email, password)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })
})
