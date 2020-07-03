import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor
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
  sut: RenderResult
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

  const sut = render(
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
    sut,
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('Login', () => {
  afterEach(cleanup)

  it('should  start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = sutFactory({ validationError })

    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
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

  it('should enable submit buttton if form is valid', async () => {
    const { sut } = sutFactory()

    await simulateValidSubmit(sut)

    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  it('should show spinner on submit', async () => {
    const { sut } = sutFactory()

    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  it('should call authentication with correct value', async () => {
    const { sut, authenticationSpy } = sutFactory()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('should call authentication only once', async () => {
    const { sut, authenticationSpy } = sutFactory()

    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = sutFactory({ validationError })

    await simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should present error if authentication fails', async () => {
    const { sut, authenticationSpy } = sutFactory()

    const error = new InvalidCredentialsError()

    jest
      .spyOn(authenticationSpy, 'auth')
      .mockRejectedValueOnce(error)

    await simulateValidSubmit(sut)

    Helper.testChildCount(sut, 'error-wrap', 1)
    Helper.testElementText(sut, 'main-error', error.message)
  })

  it('should call UpdateCurrentAccount on success', async () => {
    const { sut, authenticationSpy, setCurrentAccountMock } = sutFactory()

    await simulateValidSubmit(sut)

    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    )

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to signup page', () => {
    const { sut } = sutFactory()
    const registerLink = sut.getByTestId('signup-link')

    fireEvent.click(registerLink)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
