import React from 'react'

import { Header, Footer } from '@/presentation/components'

import styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={styles.surveyWrap} >
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={styles.surveContent}>
              <div className={[styles.iconWrap, styles.green].join(' ')}>
                <img className={styles.icon} src="" alt="" />
              </div>
              <time>
                <span className={styles.day}>22</span>
                <span className={styles.month}>03</span>
                <span> className={styles.year}2020</span>
              </time>

              <p>Qual é o seu frmawork web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
