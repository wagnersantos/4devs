import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { loginFactory, signupFactory, surveyListFactory } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapter/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'
import { } from '../factories/pages/survey-list/survey-list-factory'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={loginFactory} />
          <Route path="/signup" exact component={signupFactory} />
          <PrivateRoute path="/" exact component={surveyListFactory} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
