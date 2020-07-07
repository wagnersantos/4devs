import React, { useState, useEffect } from 'react'
import FlipMove from 'react-flip-move'

import { Header, Footer, Loading, Calendar, Error } from '@/presentation/components'

import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

import styles from './survey-result-styles.scss'
import { useHistory } from 'react-router-dom'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    surveyResult: null as LoadSurveyResult.Model,
    error: '',
    isLoading: false,
    reload: false
  })
  const { surveyResult, error, isLoading, reload } = state
  const { goBack } = useHistory()

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message }))
  })

  const handleClickReload = (): void => {
    setState(old => ({ isLoading: false, surveyResult: null, error: '', reload: !old.reload }))
  }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [reload])

  return (
    <div className={styles.surveyResultWrap} >
      <Header />

      <div data-testid="survey-result" className={styles.contentWrap}>
        {surveyResult &&
          <>
            <hgroup>
              <Calendar date={surveyResult.date} className={styles.calendarWrap} />
              <h2 data-testid="question">{surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={styles.answerList}>
              {surveyResult.answers?.map(answer => {
                const isCurrentAccountAnswer = answer.isCurrentAccountAnswer ? styles.active : ''

                return (
                  <li
                    data-testid="answer-wrap"
                    key={`${answer.answer}-${answer.percent}`}
                    className={isCurrentAccountAnswer}
                  >
                    {
                      answer.image &&
                      <img
                        data-testid="image"
                        src={answer.image}
                        alt={answer.answer}
                      />
                    }
                    <span
                      data-testid="answer"
                      className={styles.answer}>
                      {answer.answer}
                    </span>
                    <span
                      data-testid="percent"
                      className={styles.percent}>
                      {answer.percent}%
                    </span>
                  </li>

                )
              })}
            </FlipMove>
            <button data-testid="back-button" onClick={() => goBack()}>voltar</button>
          </>
        }

        {isLoading && <Loading />}
        {error && <Error error={error} reload={handleClickReload} />}
      </div>
      <Footer />
    </div >
  )
}

export default SurveyResult
