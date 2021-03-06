import faker from 'faker'

import * as Helpers from '../utils/helpers'

describe('SurveyResult', () => {
  describe('load', () => {
    beforeEach(() => {
      Helpers.setLocalStorageItem('account', {
        accessToken: faker.random.uuid()
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
      cy.visit('/surveys/any_id')
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
      cy.visit('/surveys/any_id')
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')

      cy.route({
        method: 'GET',
        url: /surveys/,
        status: 200,
        response: 'fx:load-survey-result'
      }).as('request')

      cy.getByTestId('reload').click()
      cy.getByTestId('question').should('exist')
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
      cy.visit('/surveys/any_id')
      Helpers.testUrl('/login')
    })

    it('Should present survey result', () => {
      cy.route({
        method: 'GET',
        url: /surveys/,
        status: 200,
        response: 'fx:load-survey-result'
      }).as('request')

      cy.visit('/surveys/any_id')
      cy.getByTestId('question').should('have.text', 'Question')
      cy.getByTestId('day').should('have.text', '23')
      cy.getByTestId('month').should('have.text', 'mar')
      cy.getByTestId('year').should('have.text', '2020')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '50%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'other_image')
      })
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer_2')
        assert.equal(li.find('[data-testid="percent"]').text(), '30%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })

    it('Should goto surveyList on back button click', () => {
      cy.route({
        method: 'GET',
        url: /surveys/,
        status: 200,
        response: 'fx:load-survey-result'
      }).as('request')
      cy.visit('')
      cy.visit('/surveys/any_id')
      cy.getByTestId('back-button').click()
      Helpers.testUrl('/')
    })
  })

  describe('save', () => {
    beforeEach(() => {
      Helpers.setLocalStorageItem('account', {
        accessToken: faker.random.uuid()
      })
      cy.server()
      cy.route({
        method: 'GET',
        url: /surveys/,
        status: 200,
        response: 'fx:save-survey-result'
      }).as('request')
      cy.visit('/surveys/any_id')
    })

    it('should present error on unexpectedError', () => {
      cy.route({
        method: 'PUT',
        url: /surveys/,
        status: faker.helpers.randomize([400, 404, 500]),
        response: {
          error: faker.random.words()
        }
      }).as('request')
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    })

    it('Should logout on AccessDeniedError', () => {
      cy.route({
        method: 'PUT',
        url: /surveys/,
        status: 403,
        response: {
          error: faker.random.words()
        }
      }).as('request')
      cy.get('li:nth-child(2)').click()
      Helpers.testUrl('/login')
    })
    it('Should present survey result', () => {
      cy.route({
        method: 'PUT',
        url: /surveys/,
        status: 200,
        response: 'fx:save-survey-result'
      }).as('request')
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('question').should('have.text', 'Other Question')
      cy.getByTestId('day').should('have.text', '23')
      cy.getByTestId('month').should('have.text', 'mar')
      cy.getByTestId('year').should('have.text', '2020')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '50%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'other_image')
      })
      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'other_answer_2')
        assert.equal(li.find('[data-testid="percent"]').text(), '50%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })
  })
})
