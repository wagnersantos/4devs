import React from 'react'
import { render } from '@testing-library/react'

import { Helper } from '@/presentation/test'

import SurveyList from './survey-list'

const sutFactory = (): void => {
  render(<SurveyList />)
}

describe('SurveyList', () => {
  it('should present 4 empty items on start', () => {
    sutFactory()
    Helper.testChildCount('survey-list', 4)
  })
})
