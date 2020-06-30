import React from 'react'

import { localSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { SignUp } from '@/presentation/pages'
import { remoteAddAccount } from '../../usecases/add-account/add-account-factory'
import { signupValidation } from './signup-validation-factory'

export const signupFactory: React.FC = () => {
  const addAccount = remoteAddAccount()
  const validation = signupValidation()
  const saveAccessToken = localSaveAccessToken()

  return (
    <SignUp
      addAccount={addAccount}
      validation={validation}
      saveAccessToken={saveAccessToken}
    />
  )
}
