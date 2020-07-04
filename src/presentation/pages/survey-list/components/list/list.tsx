import React, { useContext } from 'react'

import { SurveyItem, SurveyItemEmpty, SurveyContext } from '@/presentation/pages/survey-list/components'

import styles from './list-styles.scss'
import { LoadSurveyList } from '@/domain/usecases'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={styles.listWrap} data-testid="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: LoadSurveyList.Model) =>
          <SurveyItem key={survey.id} survey={survey} />
        )
        : <SurveyItemEmpty />
      }
    </ul>
  )
}

export default List
