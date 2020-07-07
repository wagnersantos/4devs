import React from 'react'

import { SurveyResult } from '@/presentation/pages'
import { remoteLoadSurveyResult } from '@/main/factories/usecases'
import { useParams } from 'react-router-dom'

export const surveyResultFactory: React.FC = () => {
  const { id } = useParams()
  const loadSurveyResult = remoteLoadSurveyResult(id)

  return (
    <SurveyResult loadSurveyResult={loadSurveyResult} />
  )
}
