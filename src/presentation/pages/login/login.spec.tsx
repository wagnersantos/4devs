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
  SaveAccessTokenMock
} from '@/presentation/test'

import { Login } from '@/presentation/pages'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
};

type SutParams = {
  validationError: string
};

const history = createMemoryHistory({ initialEntries: ['/login'] })
const sutFactory = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
      ,
    </Router>
  )

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)

  const status = validationError || 'tudo certo'
  const contentStatus = validationError ? '🔴' : '🉑'

  expect(emailStatus.title).toBe(status)
  expect(emailStatus.textContent).toBe(contentStatus)
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDIsabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDIsabled)
}

describe('Login', () => {
  afterEach(cleanup)

  it('should  start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = sutFactory({ validationError })

    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testErrorWrapChildCount(sut, 0)
    testButtonIsDisabled(sut, 'submit', true)
  })

  it('should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = sutFactory({ validationError })

    populateEmailField(sut)
    testStatusForField(sut, 'email', validationError)
  })

  it('should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = sutFactory({ validationError })

    populatePasswordField(sut)
    testStatusForField(sut, 'password', validationError)
  })

  it('should show valid email state if validation succeds', () => {
    const { sut } = sutFactory()

    populateEmailField(sut)
    testStatusForField(sut, 'email')
  })

  it('should show valid password state if validation succeds', () => {
    const { sut } = sutFactory()

    populatePasswordField(sut)
    testStatusForField(sut, 'password')
  })

  it('should enable submit buttton if form is valid', async () => {
    const { sut } = sutFactory()

    await simulateValidSubmit(sut)

    testButtonIsDisabled(sut, 'submit', false)
  })

  it('should show spinner on submit', async () => {
    const { sut } = sutFactory()

    await simulateValidSubmit(sut)
    testElementExists(sut, 'spinner')
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
      .mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit(sut)

    testErrorWrapChildCount(sut, 1)
    testElementText(sut, 'main-error', error.message)
  })

  it('should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = sutFactory()

    await simulateValidSubmit(sut)

    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    )

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should present error if saveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = sutFactory()

    const error = new InvalidCredentialsError()

    jest
      .spyOn(saveAccessTokenMock, 'save')
      .mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit(sut)

    testErrorWrapChildCount(sut, 1)
    testElementText(sut, 'main-error', error.message)
  })

  it('should go to signup page', () => {
    const { sut } = sutFactory()
    const register = sut.getByTestId('signup')

    fireEvent.click(register)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
