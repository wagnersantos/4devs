import React, { useEffect, useState } from 'react'

import { Header, Footer } from '@/presentation/components'

import { SurveyItemEmpty, SurveyItem } from '@/presentation/pages/survey-list/components'
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
  const { error, surveys } = state

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
        {error
          ? <div data-testid="error">
            <span>{error}</span>
            ,<button>Recarregar</button>
          </div>
          : <ul data-testid="survey-list">
            {surveys.length
              ? surveys.map((survey: SurveyModel) =>
                <SurveyItem key={survey.id} survey={survey} />
              )
              : <SurveyItemEmpty />
            }
          </ul>
        }
      </div >
      <Footer />
    </div >
  )
}

export default SurveyList
