import React from 'react'

import { Header, Footer } from '@/presentation/components'

import styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={styles.surveyListWrap} >
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
        </ul>
      </div >
      <Footer />
    </div >
  )
}

export default SurveyList
