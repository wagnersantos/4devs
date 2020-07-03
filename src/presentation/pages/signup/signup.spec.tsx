import React from 'react'
import faker from 'faker'
import {
  render,
  fireEvent,
  waitFor,
  screen
} from '@testing-library/react'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { SignUp } from '@/presentation/pages'
import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/test'
import { EmailInUseError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock(account: AccountModel)
};

type SutParams = {
  validationError: string
};

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const sutFactory = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()

  validationStub.errorMessage = params?.validationError

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <SignUp
          validation={validationStub}
          addAccount={addAccountSpy}
        />
      </Router>
    </ApiContext.Provider>
  )

  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)

  const form = screen.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('Signup', () => {
  it('should  start with initial state', () => {
    const validationError = faker.random.words()
    sutFactory({ validationError })

    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  it('should show name error if validation fails', () => {
    const validationError = faker.random.words()
    sutFactory({ validationError })

    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  it('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    sutFactory({ validationError })

    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  it('should show password error if validation fails', () => {
    const validationError = faker.random.words()
    sutFactory({ validationError })

    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  it('should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.words()
    sutFactory({ validationError })

    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  it('should show valid name state if validation succeds', () => {
    sutFactory()

    Helper.populateField('name')
    Helper.testStatusForField('name')
  })

  it('should show valid email state if validation succeds', () => {
    sutFactory()

    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  it('should show valid password state if validation succeds', () => {
    sutFactory()

    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  it('should show valid passwordConfirmation state if validation succeds', () => {
    sutFactory()

    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  it('should enable submit buttton if form is valid', async () => {
    sutFactory()

    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')

    Helper.testButtonIsDisabled('submit', false)
  })

  it('should show spinner on submit', async () => {
    sutFactory()

    await simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  it('should call addAccount with correct value', async () => {
    const { addAccountSpy } = sutFactory()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(name, email, password)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  it('should call addAccount only once', async () => {
    const { addAccountSpy } = sutFactory()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(1)
  })

  it('should not call addAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = sutFactory({ validationError })

    await simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(0)
  })

  it('should present error if addAccount fails', async () => {
    const { addAccountSpy } = sutFactory()

    const error = new EmailInUseError()

    jest
      .spyOn(addAccountSpy, 'add')
      .mockRejectedValueOnce(error)

    await simulateValidSubmit()

    Helper.testChildCount('error-wrap', 1)
    Helper.testElementText('main-error', error.message)
  })
  it('should call SaveAccessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = sutFactory()

    await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      addAccountSpy.account
    )

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to login page', () => {
    sutFactory()
    const loginLink = screen.getByTestId('login-link')

    fireEvent.click(loginLink)

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
