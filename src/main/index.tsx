import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'

import { loginFactory } from './factories/pages/login/login-factory'
import { signupFactory } from './factories/pages/signup/signup-factory'

import '@/presentation/styles/global.scss'

ReactDOM.render(
  <Router loginFactory={loginFactory} signupFactory={signupFactory} />,
  document.getElementById('main')
)
