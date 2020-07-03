import React from 'react'

import { Header, Footer, Icon, IconName } from '@/presentation/components'

import styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={styles.surveyListWrap} >
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={styles.surveyContent}>
              <Icon className={styles.iconWrap} iconName={IconName.thumbUp} />
              <time>
                <span className={styles.day}>22</span>
                <span className={styles.month}>03</span>
                <span className={styles.year}>2020</span>
              </time>

              <p>Qual é o seu frmawork web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >
      <Footer />
    </div >
  )
}

export default SurveyList
