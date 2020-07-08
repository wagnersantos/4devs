import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import { mockAccountModel, LoadSurveyResultSpy, mockSurveyResultModel, SaveSurveyResultSpy } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { Helper } from '@/presentation/test'
import { SurveyResult } from '@/presentation/pages'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { Router } from 'react-router-dom'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  history: MemoryHistory
  setCurrentAccountMock(account: AccountModel): void
  saveSurveyResultSpy: SaveSurveyResultSpy
}

type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy
  saveSurveyResultSpy?: SaveSurveyResultSpy
}

const sutFactory = ({
  loadSurveyResultSpy = new LoadSurveyResultSpy(),
  saveSurveyResultSpy = new SaveSurveyResultSpy()
}: SutParams = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/', 'surveys/any_id'], initialIndex: 1 })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => mockAccountModel()
    }}>
      <Router history={history}>
        <SurveyResult
          loadSurveyResult={loadSurveyResultSpy}
          saveSurveyResult={saveSurveyResultSpy}
        />)
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy,
    history,
    setCurrentAccountMock,
    saveSurveyResultSpy
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
    const { loadSurveyResultSpy } = sutFactory()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })

  it('should present surveyResult data on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-10T00:00:00')
    })
    loadSurveyResultSpy.surveyResult = surveyResult
    sutFactory({ loadSurveyResultSpy })
    await waitFor(() => screen.getByTestId('survey-result'))

    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
    Helper.testChildCount('answers', 2)

    const answerWrap = screen.queryAllByTestId('answer-wrap')
    expect(answerWrap[0]).toHaveClass('active')
    expect(answerWrap[1]).not.toHaveClass('active')

    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()

    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)

    const percents = screen.queryAllByTestId('percent')
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  })

  it('should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    sutFactory({ loadSurveyResultSpy })
    await waitFor(() => screen.getByTestId('survey-result'))

    const surveyList = screen.queryByTestId('question')
    const errorElement = screen.getByTestId('error')
    const loading = screen.queryByTestId('loading')
    expect(surveyList).not.toBeInTheDocument()
    expect(errorElement).toHaveTextContent(error.message)
    expect(loading).not.toBeInTheDocument()
  })

  it('should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())

    const { setCurrentAccountMock, history } = sutFactory({ loadSurveyResultSpy })
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  it('should call loadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new UnexpectedError())
    sutFactory({ loadSurveyResultSpy })

    await waitFor(() => screen.getByTestId('survey-result'))
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByTestId('survey-result'))
  })

  it('should goto surveyList on back button click', async () => {
    const { history } = sutFactory()
    await waitFor(() => screen.getByTestId('survey-result'))
    fireEvent.click(screen.getByTestId('back-button'))
    expect(history.location.pathname).toBe('/')
  })

  it('should not present loading on active answer click', async () => {
    sutFactory()
    await waitFor(() => screen.getByTestId('survey-result'))
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[0])
    const loading = screen.queryByTestId('loading')
    expect(loading).not.toBeInTheDocument()
  })

  it('should call saveSurveyResult on non active answer click', async () => {
    const { saveSurveyResultSpy, loadSurveyResultSpy } = sutFactory()
    await waitFor(() => screen.getByTestId('survey-result'))
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[1])
    const loading = screen.queryByTestId('loading')
    expect(loading).toBeInTheDocument()
    expect(saveSurveyResultSpy.params).toEqual({
      answer: loadSurveyResultSpy.surveyResult.answers[1].answer
    })
    await waitFor(() => screen.getByTestId('survey-result'))
  })

  it('should render error on UnexpectedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error)
    sutFactory({ saveSurveyResultSpy })
    await waitFor(() => screen.getByTestId('survey-result'))

    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[1])
    await waitFor(() => screen.getByTestId('survey-result'))

    const surveyList = screen.queryByTestId('question')
    const errorElement = screen.getByTestId('error')
    const loading = screen.queryByTestId('loading')
    expect(surveyList).not.toBeInTheDocument()
    expect(errorElement).toHaveTextContent(error.message)
    expect(loading).not.toBeInTheDocument()
  })
})
