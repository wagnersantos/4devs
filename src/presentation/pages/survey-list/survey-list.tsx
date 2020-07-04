import React from 'react'

import { Header, Footer } from '@/presentation/components'

import { SurveyItemEmpty } from '@/presentation/pages/survey-list/components'

import styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
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
