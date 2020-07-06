import faker from 'faker'

import * as FormHelpers from '../utils/form-helpers'
import * as Helpers from '../utils/helpers'

const populateFields = (): void => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.random.alphaNumeric(5))
}

const simuldateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    FormHelpers.testInputStatus('email', 'Campo Obrigatório')
    FormHelpers.testInputStatus('password', 'Campo Obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    FormHelpers.testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelpers.testInputStatus('password', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelpers.testInputStatus('email')

    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    FormHelpers.testInputStatus('password')

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
    FormHelpers.testMainError('Credencias inválidas')
    Helpers.testUrl('/login')
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
    FormHelpers.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    Helpers.testUrl('/login')
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid(),
        name: faker.name.findName()
      }
    }).as('request')

    simuldateValidSubmit()
    cy.getByTestId('error-wrap').should('not.have.descendants')

    Helpers.testUrl('/')
    Helpers.testLocalStorageItem('account')
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

    populateFields()
    cy.getByTestId('submit').dblclick()
    cy.wait('@request')
    Helpers.testHttpCallsCount(1)
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

    Helpers.testHttpCallsCount(0)
  })
})
