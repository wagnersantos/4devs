import React, { useState, useEffect } from 'react'
import FlipMove from 'react-flip-move'

import { Header, Footer, Loading, Calendar, Error } from '@/presentation/components'

import styles from './survey-result-styles.scss'
import { LoadSurveyList, LoadSurveyResult } from '@/domain/usecases'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    surveyResult: null as LoadSurveyList.Model,
    error: '',
    isLoading: false
  })
  const { surveyResult, error, isLoading } = state

  useEffect(() => {
    loadSurveyResult.load().then().catch()
  }, [])

  return (
    <div className={styles.surveyResultWrap} >
      <Header />

      <div data-testid="survey-result" className={styles.contentWrap}>
        {surveyResult &&
          <>
            <hgroup>
              <Calendar date={new Date()} className={styles.calendarWrap} />
              <h2>Qual é o seu frameWork Web favorito?</h2>
            </hgroup>
            <FlipMove className={styles.answerList}>
              <li>
                <img src="" alt="" />
                <span className={styles.answer}>ReactJS</span>
                <span className={styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>voltar</button>
          </>
        }

        {isLoading && <Loading />}
        {error && <Error error={error} reload={() => console.log(error)} />}
      </div>
      <Footer />
    </div >
  )
}

export default SurveyResult
