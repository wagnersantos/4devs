import faker from 'faker'
import * as FormHelper from '../support/form-helper'

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
    FormHelper.testInputStatus('email', 'Campo Obrigatório')
    FormHelper.testInputStatus('name', 'Campo Obrigatório')
    FormHelper.testInputStatus('password', 'Campo Obrigatório')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo Obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('name', 'Valor inválido')
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Valor inválido')
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('passwordConfirmation', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('name').type(faker.name.findName())
    FormHelper.testInputStatus('name')

    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')

    cy.getByTestId('password').type(password)
    FormHelper.testInputStatus('password')

    cy.getByTestId('passwordConfirmation').type(password)
    FormHelper.testInputStatus('passwordConfirmation')

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
    FormHelper.testMainError('Esse e-mail já está em uso')
    FormHelper.testUrl('/signup')
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
    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    FormHelper.testUrl('/signup')
  })

  it('should present unexpectedError if invalid data is returned', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 200,
      response: {
        invalidProperty: faker.random.words()
      }
    }).as('request')

    simuldateValidSubmit()
    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    FormHelper.testUrl('/signup')
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
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
      url: /signup/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    }).as('request')

    populateFields()

    cy.getByTestId('submit').dblclick()
    FormHelper.testHttpCallsCount(1)
  })
})
