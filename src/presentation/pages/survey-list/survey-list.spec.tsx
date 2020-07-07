import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'

import { Helper } from '@/presentation/test'

import SurveyList from './survey-list'
import { mockAccountModel, LoadSurveyListSpy } from '@/domain/test'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  setCurrentAccountMock(account: AccountModel): void
}

const sutFactory = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => mockAccountModel()
    }}>
      <Router history={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />)
      </Router>
    </ApiContext.Provider>
  )

  return {
    loadSurveyListSpy,
    history,
    setCurrentAccountMock
  }
}

describe('SurveyList', () => {
  it('should present 4 empty items on start', async () => {
    sutFactory()
    Helper.testChildCount('survey-list', 4)

    const errorElement = screen.queryByTestId('error')
    expect(errorElement).not.toBeInTheDocument()
    await waitFor(() => screen.getByTestId('survey-list'))
  })

  it('should call loadSurveyList', async () => {
    const { loadSurveyListSpy } = sutFactory()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  it('should render SurveyItems on success', async () => {
    sutFactory()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    const element = surveyList.querySelectorAll('li.surveyItemWrap')
    const errorElement = screen.queryByTestId('error')
    expect(errorElement).not.toBeInTheDocument()
    expect(element).toHaveLength(3)
  })

  it('should render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    sutFactory(loadSurveyListSpy)

    await waitFor(() => screen.getByRole('heading'))

    const surveyList = screen.queryByTestId('survey-list')
    const errorElement = screen.getByTestId('error')
    expect(surveyList).not.toBeInTheDocument()
    expect(errorElement).toHaveTextContent(error.message)
  })

  it('should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { setCurrentAccountMock, history } = sutFactory(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  it('should call loadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    sutFactory(loadSurveyListSpy)

    await waitFor(() => screen.getByRole('heading'))

    fireEvent.click(screen.getByTestId('reload'))
    expect(loadSurveyListSpy.callsCount).toBe(1)

    await waitFor(() => screen.getByRole('heading'))
  })
})
