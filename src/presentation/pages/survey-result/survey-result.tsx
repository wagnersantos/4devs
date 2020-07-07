import React from 'react'
import FlipMove from 'react-flip-move'

import { Header, Footer, Loading } from '@/presentation/components'

import styles from './survey-result-styles.scss'

const SurveyResult: React.FC = () => {
  return (
    <div className={styles.surveyResultWrap} >
      <Header />

      <div className={styles.contentWrap}>
        <h2>Qual é o seu frame Work Web favorito?</h2>
        <FlipMove className={styles.answerList}>
          <li>
            <img src="" alt="" />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>voltar</button>
        {false && <Loading />}
      </div >
      <Footer />
    </div >
  )
}

export default SurveyResult
