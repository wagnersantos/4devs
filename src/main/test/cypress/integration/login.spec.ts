import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Campo Obrigatório')
    cy.getByTestId('email-label').should(
      'have.attr',
      'title',
      'Campo Obrigatório'
    )

    cy.getByTestId('password-wrap').should(
      'have.attr',
      'data-status',
      'invalid'
    )
    cy.getByTestId('password').should(
      'have.attr',
      'title',
      'Campo Obrigatório'
    )
    cy.getByTestId('password-label').should(
      'have.attr',
      'title',
      'Campo Obrigatório'
    )

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('email-label').should(
      'have.attr',
      'title',
      'Valor inválido'
    )

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-wrap').should(
      'have.attr',
      'data-status',
      'invalid'
    )
    cy.getByTestId('password').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('password-label').should(
      'have.attr',
      'title',
      'Valor inválido'
    )

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('email').should('not.have.attr', 'title')
    cy.getByTestId('email-label').should('not.have.attr', 'title')

    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password').should('not.have.attr', 'title')
    cy.getByTestId('password-label').should('not.have.attr', 'title')

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
    })

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Credencias inválidas')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present unexpectedError on 400', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 400,
      response: {
        error: faker.random.words()
      }
    })

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present unexpectedError if invalid data is returned', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        invalidProperty: faker.random.words()
      }
    })

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password')
      .type(faker.random.alphaNumeric(5))
      .type('{enter}')

    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    })

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()
    cy.getByTestId('spinner')
    cy.should('not.exist').getByTestId('main-error').should('not.exist')

    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window =>
      assert.isOk(window.localStorage.getItem('accessToken'))
    )
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
    cy.get('@request.all').should('have.length', 1)
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

    cy.get('@request.all').should('have.length', 0)
  })
})
