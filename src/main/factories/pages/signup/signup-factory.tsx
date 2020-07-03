import React from 'react'

import { SignUp } from '@/presentation/pages'
import { remoteAddAccount } from '../../usecases/add-account/add-account-factory'
import { signupValidation } from './signup-validation-factory'
import { localUpdateCurrentAccount } from '../../usecases/update-current-account/local-update-current-account-factory'

export const signupFactory: React.FC = () => {
  const addAccount = remoteAddAccount()
  const validation = signupValidation()
  const localUpdateCurrent = localUpdateCurrentAccount()

  return (
    <SignUp
      addAccount={addAccount}
      validation={validation}
      updateCurrentAccount={localUpdateCurrent}
    />
  )
}
