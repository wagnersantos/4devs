import React from 'react'
import { render, screen } from '@testing-library/react'

import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'

import { SurveyItem } from '@/presentation/pages/survey-list/components'

const sutFactory = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem', () => {
  it('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true
    })

    sutFactory(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  it('should render with correct rest values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false
    })

    sutFactory(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
