import React from 'react'
import {
  render,
  fireEvent,
  waitFor,
  screen
} from '@testing-library/react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import {
  ValidationStub,
  AuthenticationSpy,
  Helper
} from '@/presentation/test'

import { Login } from '@/presentation/pages'
import { InvalidCredentialsError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock(account: AccountModel)
};

type SutParams = {
  validationError: string
};

const history = createMemoryHistory({ initialEntries: ['/login'] })
const sutFactory = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()

  validationStub.errorMessage = params?.validationError

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  )

  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)

  const form = screen.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('Login', () => {
  it('should  start with initial state', () => {
    const validationError = faker.random.words()
    sutFactory({ validationError })

    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
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

  it('should enable submit buttton if form is valid', async () => {
    sutFactory()

    await simulateValidSubmit()

    Helper.testButtonIsDisabled('submit', false)
  })

  it('should show spinner on submit', async () => {
    sutFactory()

    await simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  it('should call authentication with correct value', async () => {
    const { authenticationSpy } = sutFactory()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('should call authentication only once', async () => {
    const { authenticationSpy } = sutFactory()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = sutFactory({ validationError })

    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should present error if authentication fails', async () => {
    const { authenticationSpy } = sutFactory()

    const error = new InvalidCredentialsError()

    jest
      .spyOn(authenticationSpy, 'auth')
      .mockRejectedValueOnce(error)

    await simulateValidSubmit()

    Helper.testChildCount('error-wrap', 1)
    Helper.testElementText('main-error', error.message)
  })

  it('should call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = sutFactory()

    await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    )

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to signup page', () => {
    sutFactory()
    const registerLink = screen.getByTestId('signup-link')

    fireEvent.click(registerLink)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
