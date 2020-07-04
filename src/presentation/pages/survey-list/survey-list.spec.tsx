import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { Helper } from '@/presentation/test'

import SurveyList from './survey-list'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const sutFactory = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return {
    loadSurveyListSpy
  }
}

describe('SurveyList', () => {
  it('should present 4 empty items on start', async () => {
    sutFactory()
    Helper.testChildCount('survey-list', 4)
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
    expect(element).toHaveLength(3)
  })
})
