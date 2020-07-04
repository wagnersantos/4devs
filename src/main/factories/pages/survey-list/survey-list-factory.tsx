import React from 'react'

import { SurveyList } from '@/presentation/pages'
import { remoteLoadSurveyList } from '@/main/factories/usecases'

export const surveyListFactory: React.FC = () => {
  const loadSurveyList = remoteLoadSurveyList()

  return (
    <SurveyList loadSurveyList={loadSurveyList} />
  )
}
