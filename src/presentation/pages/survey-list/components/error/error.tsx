import React, { useContext } from 'react'

import { SurveyContext } from '@/presentation/pages/survey-list/components'

import styles from './error-styles.scss'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <div className={styles.errorWrap} data-testid="error">
      <span>{state.error}</span>
      <button>Recarregar</button>
    </div>
  )
}

export default List
