import faker from 'faker'

import { AuthenticationParams } from '../../domain/usercases'
import { AccountModel } from '../models'

export const mockAuthenticantion = (): AuthenticationParams => ({
  email: faker.internet.email(),
  passowrd: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accesToken: faker.random.uuid()
})
