import React from 'react'
import { render, screen } from '@testing-library/react'

import { mockAccountModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { Helper } from '@/presentation/test'
import { SurveyResult } from '@/presentation/pages'

describe('SurveyResult', () => {
  it('should present correct initial state', async () => {
    render(
      <ApiContext.Provider value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel()
      }}>
        <SurveyResult />)

      </ApiContext.Provider>
    )
    const error = screen.queryByTestId('error')
    const loading = screen.queryByTestId('loading')
    Helper.testChildCount('survey-result', 0)
    expect(error).not.toBeInTheDocument()
    expect(loading).not.toBeInTheDocument()
  })
})
