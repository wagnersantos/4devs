import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'

import { ApiContext } from '@/presentation/contexts'
import { Header } from '@/presentation/components'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  history: MemoryHistory
  setCurreentAccountMock(account: AccountModel): void
};

const sutFactory = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurreentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurreentAccountMock }}>
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>
  )

  return {
    history,
    setCurreentAccountMock
  }
}

describe('Header', () => {
  it('should call setCurrentAccount with null', () => {
    const { history, setCurreentAccountMock } = sutFactory()
    fireEvent.click(screen.getByTestId('logout'))

    expect(setCurreentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
