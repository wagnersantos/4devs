import React from 'react'

import { Icon, IconName } from '@/presentation/components'
import { SurveyModel } from '@/domain/models'

import styles from './survey-item-styles.scss'

type Props = {
  survey: SurveyModel
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon className={styles.iconWrap} iconName={IconName.thumbUp} />
        <time>
          <span data-testid="day" className={styles.day}>
            {survey.date.getDate()}
          </span>
          <span data-testid="month" className={styles.month}>
            {survey.date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span data-testid="year" className={styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>

        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
