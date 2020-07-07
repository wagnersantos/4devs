import React from 'react'

import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'

import styles from './list-styles.scss'
import { LoadSurveyList } from '@/domain/usecases'

type Props = {
  surveys: LoadSurveyList.Model[]
}

const List: React.FC<Props> = ({ surveys }: Props) =>
  (
    <ul className={styles.listWrap} data-testid="survey-list">
      {surveys.length
        ? surveys.map((survey: LoadSurveyList.Model) =>
          <SurveyItem key={survey.id} survey={survey} />
        )
        : <SurveyItemEmpty />
      }
    </ul>
  )

export default List
