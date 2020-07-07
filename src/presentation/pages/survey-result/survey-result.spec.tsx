import React from 'react'
import { render, screen } from '@testing-library/react'

import { mockAccountModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { Helper } from '@/presentation/test'
import { SurveyResult } from '@/presentation/pages'

const sutFactory = (): void => {
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccountModel()
    }}>
      <SurveyResult />)

    </ApiContext.Provider>
  )
}
describe('SurveyResult', () => {
  it('should present correct initial state', async () => {
    sutFactory()
    const error = screen.queryByTestId('error')
    const loading = screen.queryByTestId('loading')
    Helper.testChildCount('survey-result', 0)
    expect(error).not.toBeInTheDocument()
    expect(loading).not.toBeInTheDocument()
  })
})
