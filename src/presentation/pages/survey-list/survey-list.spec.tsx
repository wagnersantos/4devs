import React from 'react'
import { render } from '@testing-library/react'

import { Helper } from '@/presentation/test'

import SurveyList from './survey-list'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return []
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
  it('should present 4 empty items on start', () => {
    sutFactory()
    Helper.testChildCount('survey-list', 4)
  })

  it('should call loadSurveyList', () => {
    const { loadSurveyListSpy } = sutFactory()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
