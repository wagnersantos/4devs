import React from 'react'

import { SignUp } from '@/presentation/pages'
import { remoteAddAccount } from '../../usecases/add-account/add-account-factory'
import { signupValidation } from './signup-validation-factory'

export const signupFactory: React.FC = () => {
  const addAccount = remoteAddAccount()
  const validation = signupValidation()

  return (
    <SignUp
      addAccount={addAccount}
      validation={validation}
    />
  )
}
