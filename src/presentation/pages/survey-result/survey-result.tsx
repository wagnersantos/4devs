import React, { useState, useEffect } from 'react'

import { Header, Footer, Loading, Error } from '@/presentation/components'

import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData, SurveyResultConxtext } from '@/presentation/pages/survey-result/components'

import styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult

}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useState({
    surveyResult: null as LoadSurveyResult.Model,
    error: '',
    isLoading: false,
    reload: false
  })
  const { surveyResult, error, isLoading, reload } = state

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, isLoading: false, surveyResult: null, error: error.message }))
  })

  const handleClickReload = (): void => {
    setState(old => ({ isLoading: false, surveyResult: null, error: '', reload: !old.reload }))
  }

  const onAnswer = (answer: string): void => {
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => setState(old => ({ ...old, isLoading: false, surveyResult })))
      .catch(handleError)
  }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [reload])

  return (
    <div className={styles.surveyResultWrap} >
      <Header />

      <SurveyResultConxtext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={styles.contentWrap}>
          {surveyResult && <SurveyResultData surveyResult={surveyResult} />}

          {isLoading && <Loading />}
          {error && <Error error={error} reload={handleClickReload} />}
        </div>
        <Footer />
      </SurveyResultConxtext.Provider>
    </div >
  )
}

export default SurveyResult
