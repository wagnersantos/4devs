import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'

import { loginFactory } from './factories/pages/login/login-factory'

import '@/presentation/styles/global.scss'

ReactDOM.render(
  <Router loginFactory={loginFactory} />,
  document.getElementById('main')
)
