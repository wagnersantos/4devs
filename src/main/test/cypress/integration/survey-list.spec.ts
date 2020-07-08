import faker from 'faker'

import * as Helpers from '../utils/helpers'

describe('SurveyList', () => {
  beforeEach(() => {
    Helpers.setLocalStorageItem('account', {
      accessToken: faker.random.uuid(),
      name: faker.name.findName()
    })
    cy.server()
  })

  it('should present error on unexpectedError', () => {
    cy.route({
      method: 'GET',
      url: /surveys/,
      status: faker.helpers.randomize([400, 404, 500]),
      response: {
        error: faker.random.words()
      }
    }).as('request')
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })

  it('should reload on button click', () => {
    cy.route({
      method: 'GET',
      url: /surveys/,
      status: faker.helpers.randomize([400, 404, 500]),
      response: {
        error: faker.random.words()
      }
    }).as('request')
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')

    cy.route({
      method: 'GET',
      url: /surveys/,
      status: 200,
      response: 'fx:survey-list'
    }).as('request')

    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 2)
  })

  it('should logout accesDeniedError', () => {
    cy.route({
      method: 'GET',
      url: /surveys/,
      status: 403,
      response: {
        error: faker.random.words()
      }
    }).as('request')
    cy.visit('')

    Helpers.testUrl('/login')
  })

  it('should present correct username', () => {
    cy.route({
      method: 'GET',
      url: /surveys/,
      status: faker.helpers.randomize([400, 404, 500]),
      response: {
        error: faker.random.words()
      }
    }).as('request')
    cy.visit('')

    const { name } = Helpers.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('should logout on link click', () => {
    cy.route({
      method: 'GET',
      url: /surveys/,
      status: faker.helpers.randomize([400, 404, 500]),
      response: {
        error: faker.random.words()
      }
    }).as('request')
    cy.visit('')

    cy.getByTestId('logout').click()
    Helpers.testUrl('/login')
  })

  it('should prevent items', () => {
    cy.route({
      method: 'GET',
      url: /surveys/,
      status: 200,
      response: 'fx:survey-list'
    }).as('request')
    cy.visit('')

    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '03')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2018')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
      })
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '20')
      assert.equal(li.find('[data-testid="month"]').text(), 'out')
      assert.equal(li.find('[data-testid="year"]').text(), '2020')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)
      })
    })
  })
})
