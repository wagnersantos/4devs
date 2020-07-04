import React, { useContext } from 'react'

import { SurveyContext } from '@/presentation/pages/survey-list/components'

import styles from './error-styles.scss'

const List: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)

  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }

  return (
    <div className={styles.errorWrap} data-testid="error">
      <span>{state.error}</span>
      <button data-testid="reload" onClick={reload}>Tentar novamente</button>
    </div>
  )
}

export default List
