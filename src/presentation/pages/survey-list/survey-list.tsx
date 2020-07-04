import React, { useEffect, useState } from 'react'

import { Header, Footer } from '@/presentation/components'

import { SurveyContext, SurveyListItem, Error } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

import styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}
const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    (async () => {
      try {
        const surveys = await loadSurveyList.loadAll()
        setState({ ...state, surveys })
      } catch (error) {
        setState({ ...state, error: error.message })
      }
    })()
  }, [])

  return (
    <div className={styles.surveyListWrap} >
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div >
      <Footer />
    </div >
  )
}

export default SurveyList
