import React, { useEffect, useState } from 'react'

import { Header, Footer } from '@/presentation/components'

import { SurveyItemEmpty, SurveyItem } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'

import styles from './survey-list-styles.scss'
import { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}
const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[]
  })

  useEffect(() => {
    (async () => {
      const surveys = await loadSurveyList.loadAll()
      setState({ surveys })
    })()
  }, [])

  return (
    <div className={styles.surveyListWrap} >
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {state.surveys.length
            ? state.surveys.map((survey: SurveyModel) =>
              <SurveyItem key={survey.id} survey={survey} />
            )
            : <SurveyItemEmpty />
          }
        </ul>
      </div >
      <Footer />
    </div >
  )
}

export default SurveyList
