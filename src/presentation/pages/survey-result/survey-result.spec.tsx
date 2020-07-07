import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { mockAccountModel, LoadSurveyResultSpy, mockSurveyResultModel } from '@/domain/test'
import { ApiContext } from '@/presentation/contexts'
import { Helper } from '@/presentation/test'
import { SurveyResult } from '@/presentation/pages'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const sutFactory = (surveyResult = mockSurveyResultModel()): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  loadSurveyResultSpy.surveyResult = surveyResult

  render(
    <ApiContext.Provider value={{
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccountModel()
    }}>
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />)

    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy
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
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-10T00:00:00')
    })
    sutFactory(surveyResult)
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
})
