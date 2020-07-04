import React from 'react'

import styles from './survey-item-empty-styles.scss'

const SurveyItemEmpty: React.FC = () => {
  return (
    <>
      <li className={styles.surveyItemEmpty}></li>
      <li className={styles.surveyItemEmpty}></li>
      <li className={styles.surveyItemEmpty}></li>
      <li className={styles.surveyItemEmpty}></li>
    </>
  )
}

export default SurveyItemEmpty
