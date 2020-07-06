import faker from 'faker'

import * as FormHelpers from '../utils/form-helpers'
import * as Helpers from '../utils/helpers'

const populateFields = (): void => {
  const password = faker.random.alphaNumeric(5)

  cy.getByTestId('name').type(faker.name.findName())
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)
}

const simuldateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('signup')
  })

  it('should load with correct initial state', () => {
    FormHelpers.testInputStatus('email', 'Campo Obrigatório')
    FormHelpers.testInputStatus('name', 'Campo Obrigatório')
    FormHelpers.testInputStatus('password', 'Campo Obrigatório')
    FormHelpers.testInputStatus('passwordConfirmation', 'Campo Obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(3))
    FormHelpers.testInputStatus('name', 'Valor inválido')
    cy.getByTestId('email').type(faker.random.word())
    FormHelpers.testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelpers.testInputStatus('password', 'Valor inválido')
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(3))
    FormHelpers.testInputStatus('passwordConfirmation', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('name').type(faker.name.findName())
    FormHelpers.testInputStatus('name')

    cy.getByTestId('email').type(faker.internet.email())
    FormHelpers.testInputStatus('email')

    cy.getByTestId('password').type(password)
    FormHelpers.testInputStatus('password')

    cy.getByTestId('passwordConfirmation').type(password)
    FormHelpers.testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present invalidCredentialsError on 403', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 403,
      response: {
        error: faker.random.words()
      }
    }).as('request')

    simuldateValidSubmit()
    FormHelpers.testMainError('Esse e-mail já está em uso')
    Helpers.testUrl('/signup')
  })

  it('should present unexpectedError on default error cases', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: faker.helpers.randomize([400, 404, 500]),
      response: {
        error: faker.random.words()
      }
    }).as('request')

    simuldateValidSubmit()
    FormHelpers.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    Helpers.testUrl('/signup')
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
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
      url: /signup/,
      status: 200,
      response: {
        accessToken: faker.random.uuid(),
        name: faker.name.findName()
      }
    }).as('request')

    populateFields()

    cy.getByTestId('submit').dblclick()
    Helpers.testHttpCallsCount(1)
  })

  it('should not call submit if form is invalid', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    }).as('request')

    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')

    Helpers.testHttpCallsCount(0)
  })
})
