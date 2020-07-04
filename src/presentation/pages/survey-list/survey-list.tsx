import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Header, Footer } from '@/presentation/components'

import { SurveyContext, SurveyListItem, Error } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'

import { AccessDeniedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'

import styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const { error, reload } = state

  useEffect(() => {
    (async () => {
      try {
        const surveys = await loadSurveyList.loadAll()
        setState({ ...state, surveys })
      } catch (error) {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          history.replace('/login')
          return
        }

        setState({ ...state, error: error.message })
      }
    })()
  }, [reload])

  return (
    <div className={styles.surveyListWrap} >
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {error ? <Error /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div >
      <Footer />
    </div >
  )
}

export default SurveyList
