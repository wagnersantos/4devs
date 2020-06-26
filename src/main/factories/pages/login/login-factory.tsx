import React from 'react'

import { remoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { localSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { Login } from '@/presentation/pages'

import { loginValidation } from './login-validation-factory'

export const loginFactory: React.FC = () => {
  const authemtication = remoteAuthentication()
  const validation = loginValidation()

  return (
    <Login
      authentication={authemtication}
      validation={validation}
      saveAccessToken={localSaveAccessToken()}
    />
  )
}
