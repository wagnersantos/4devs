import faker from 'faker'

import * as Helpers from '../support/helpers'

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
})
