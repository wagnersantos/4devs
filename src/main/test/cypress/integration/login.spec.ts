import faker from 'faker'
import * as FormHelper from '../support/form-helper'

const simuldateValidSubmit = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.random.alphaNumeric(5))

  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Campo Obrigatório')
    FormHelper.testInputStatus('password', 'Campo Obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')

    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present invalidCredentialsError on 401', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 401,
      response: {
        error: faker.random.words()
      }
    }).as('request')

    simuldateValidSubmit()
    FormHelper.testMainError('Credencias inválidas')
    FormHelper.testUrl('/login')
  })

  it('should present unexpectedError on default error cases', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: faker.helpers.randomize([400, 404, 500]),
      response: {
        error: faker.random.words()
      }
    }).as('request')

    simuldateValidSubmit()
    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    FormHelper.testUrl('/login')
  })

  it('should present unexpectedError if invalid data is returned', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        invalidProperty: faker.random.words()
      }
    }).as('request')

    simuldateValidSubmit()
    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    FormHelper.testUrl('/login')
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    }).as('request')

    simuldateValidSubmit()
    cy.getByTestId('error-wrap').should('not.have.descendants')

    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('should prevent multiple submits', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    }).as('request')

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').dblclick()
    FormHelper.testHttpCallsCount(1)
  })

  it('should not call submit if form is invalid', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    }).as('request')

    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')

    FormHelper.testHttpCallsCount(0)
  })
})
