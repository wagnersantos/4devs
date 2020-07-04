import React from 'react'
import { render } from '@testing-library/react'

import { Helper } from '@/presentation/test'

import SurveyList from './survey-list'

describe('SurveyList', () => {
  it('should present 4 empty items on start', () => {
    render(<SurveyList />)
    Helper.testChildCount('survey-list', 4)
  })
})
