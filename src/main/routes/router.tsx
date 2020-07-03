import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { SurveyList } from '@/presentation/pages'
import { loginFactory, signupFactory } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapter/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'

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
          <PrivateRoute path="/" exact component={SurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
