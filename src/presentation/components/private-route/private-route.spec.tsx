import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'

import PrivateRoute from './private-route'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  history: MemoryHistory
}

const sutFactory = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>

      <Router history={history}>
        <PrivateRoute />
      </Router>
    </ApiContext.Provider>
  )
  return {
    history
  }
}
describe('PrivateRoute', () => {
  it('should redirect to /login if token is empty', () => {
    const { history } = sutFactory(null)
    expect(history.location.pathname).toBe('/login')
  })

  it('should render current component if tojen is not empty', () => {
    const { history } = sutFactory()
    expect(history.location.pathname).toBe('/')
  })
})
