import React, { useEffect, useState } from 'react'

import { Header, Footer, Error } from '@/presentation/components'

import { SurveyContext, SurveyListItem } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'

import styles from './survey-list-styles.scss'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })
  const { error, reload } = state

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })

  const handleClickReload = (): void => {
    setState(old => ({ surveys: [], error: '', reload: !old.reload }))
  }

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(old => ({ ...old, surveys })))
      .catch(handleError)
  }, [reload])

  return (
    <div className={styles.surveyListWrap} >
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {error ? <Error error={state.error} reload={handleClickReload} /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div >
      <Footer />
    </div >
  )
}

export default SurveyList
