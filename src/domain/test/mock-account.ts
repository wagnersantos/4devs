import faker from 'faker'

import { AccountModel } from '@/domain/models'
import { AuthenticationParams } from '@/domain/usecases'

export const mockAuthenticantion = (): AuthenticationParams => ({
  email: faker.internet.email(),
  passowrd: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accesToken: faker.random.uuid()
})
