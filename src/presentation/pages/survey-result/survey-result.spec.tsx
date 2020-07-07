import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { mockAccountModel, LoadSurveyResultSpy } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { Helper } from '@/presentation/test'
import { SurveyResult } from '@/presentation/pages'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyResultSpy
}

const sutFactory = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyResultSpy()

  render(
    <ApiContext.Provider value={{
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccountModel()
    }}>
      <SurveyResult loadSurveyResult={loadSurveyListSpy} />)

    </ApiContext.Provider>
  )
  return {
    loadSurveyListSpy
  }
}
describe('SurveyResult', () => {
  it('should present correct initial state', async () => {
    sutFactory()
    const error = screen.queryByTestId('error')
    const loading = screen.queryByTestId('loading')
    Helper.testChildCount('survey-result', 0)
    expect(error).not.toBeInTheDocument()
    expect(loading).not.toBeInTheDocument()
    await waitFor(() => screen.getByTestId('survey-result'))
  })

  it('should call loadSurveyResult', async () => {
    const { loadSurveyListSpy } = sutFactory()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
