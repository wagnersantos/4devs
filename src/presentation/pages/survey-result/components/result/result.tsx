import React from 'react'
import { useHistory } from 'react-router-dom'

import { Calendar } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components'

import styles from './result-styles.scss'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory()

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <span data-testid="answers" className={styles.answerList}>
        {surveyResult.answers?.map(answer =>
          <SurveyResultAnswer key={`${answer.answer}-${answer.percent}`} answer={answer} />
        )}
      </span>
      <button data-testid="back-button" className={styles.button} onClick={() => goBack()}>voltar</button>
    </>
  )
}

export default Result
