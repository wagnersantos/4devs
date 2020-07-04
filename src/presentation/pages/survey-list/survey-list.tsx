import React, { useEffect } from 'react'

import { Header, Footer } from '@/presentation/components'

import { SurveyItemEmpty } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'

import styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}
const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async () => await loadSurveyList.loadAll())()
  }, [])

  return (
    <div className={styles.surveyListWrap} >
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div >
      <Footer />
    </div >
  )
}

export default SurveyList
