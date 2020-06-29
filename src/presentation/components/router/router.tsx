import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { SignUp } from '@/presentation/pages'

type Props = {
  loginFactory: React.FC
};

const Router: React.FC<Props> = ({ loginFactory }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={loginFactory} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
